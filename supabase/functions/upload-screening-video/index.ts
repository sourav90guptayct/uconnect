// Upload a recorded screening video (webm) to a Google Drive Shared Drive folder
// using a Google service account (JWT -> access token -> resumable upload).
//
// Secrets required:
//   GOOGLE_SERVICE_ACCOUNT_JSON  - full JSON key of the service account
//   DRIVE_FOLDER_ID              - target Shared Drive folder ID (folder shared with SA as Editor)
//
// Body (multipart/form-data):
//   submission_id: uuid of the screening_submissions row
//   filename:      desired filename (e.g. Name_Phone_YYYY-MM-DD.webm)
//   file:          the video blob (webm)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function base64UrlEncode(input: string | Uint8Array): string {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let b64 = btoa(String.fromCharCode(...bytes));
  return b64.replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function pemToDer(pem: string): Uint8Array {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function getAccessToken(serviceAccount: { client_email: string; private_key: string; token_uri?: string }) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/drive",
    aud: serviceAccount.token_uri || "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  const signingInput = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claim))}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToDer(serviceAccount.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = new Uint8Array(await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signingInput),
  ));
  const jwt = `${signingInput}.${base64UrlEncode(sig)}`;

  const res = await fetch(claim.aud, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`Token exchange failed [${res.status}]: ${await res.text()}`);
  const json = await res.json();
  return json.access_token as string;
}

async function resolveDriveFolderId(accessToken: string, configuredFolderId: string) {
  const configured = configuredFolderId.trim();
  const metadataRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(configured)}?supportsAllDrives=true&fields=id,name,mimeType,trashed`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );

  if (metadataRes.ok) {
    const folder = await metadataRes.json();
    if (folder.mimeType === "application/vnd.google-apps.folder" && !folder.trashed) return folder.id as string;
  } else {
    console.error(`Configured Drive folder lookup failed [${metadataRes.status}]: ${await metadataRes.text()}`);
  }

  const folderName = configured.toLowerCase() === "uconnect technologies" ? configured : "uconnect technologies";
  const searchParams = new URLSearchParams({
    q: `mimeType='application/vnd.google-apps.folder' and trashed=false and name='${folderName.replace(/'/g, "\\'")}'`,
    fields: "files(id,name)",
    pageSize: "10",
    includeItemsFromAllDrives: "true",
    supportsAllDrives: "true",
    corpora: "allDrives",
  });
  const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?${searchParams.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!searchRes.ok) throw new Error(`Drive folder search failed [${searchRes.status}]: ${await searchRes.text()}`);
  const search = await searchRes.json();
  const match = search.files?.find((file: { name?: string }) => file.name?.toLowerCase() === folderName.toLowerCase()) || search.files?.[0];
  if (!match?.id) {
    throw new Error(`Google Drive folder not found. Share the "uconnect technologies" folder with the service account as Editor, or update DRIVE_FOLDER_ID to the folder ID.`);
  }
  console.log(`Using Drive folder resolved by name: ${match.name}`);
  return match.id as string;
}

async function uploadResumable(accessToken: string, folderId: string, filename: string, fileBytes: Uint8Array, mimeType: string) {
  // Step 1: initiate
  const initRes = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
        "X-Upload-Content-Type": mimeType,
        "X-Upload-Content-Length": String(fileBytes.byteLength),
      },
      body: JSON.stringify({ name: filename, parents: [folderId] }),
    },
  );
  if (!initRes.ok) throw new Error(`Resumable init failed [${initRes.status}]: ${await initRes.text()}`);
  const uploadUrl = initRes.headers.get("Location");
  if (!uploadUrl) throw new Error("No upload URL returned");

  // Step 2: single PUT (Deno edge functions handle up to ~256MB comfortably for typical webm)
  const putRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": mimeType,
      "Content-Length": String(fileBytes.byteLength),
    },
    body: fileBytes,
  });
  if (!putRes.ok) throw new Error(`Resumable upload failed [${putRes.status}]: ${await putRes.text()}`);
  return await putRes.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const saJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
    const folderId = Deno.env.get("DRIVE_FOLDER_ID");
    if (!saJson || !folderId) {
      return new Response(
        JSON.stringify({ ok: false, error: "Google Drive is not configured yet. Contact admin." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const form = await req.formData();
    const submissionId = String(form.get("submission_id") || "");
    const filename = String(form.get("filename") || `screening_${Date.now()}.webm`);
    const file = form.get("file");
    if (!submissionId || !(file instanceof File)) {
      return new Response(
        JSON.stringify({ ok: false, error: "submission_id and file are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const serviceAccount = JSON.parse(saJson);
    const accessToken = await getAccessToken(serviceAccount);
    const resolvedFolderId = await resolveDriveFolderId(accessToken, folderId);
    const bytes = new Uint8Array(await file.arrayBuffer());
    const uploaded = await uploadResumable(accessToken, resolvedFolderId, filename, bytes, file.type || "video/webm");

    const driveUrl = `https://drive.google.com/file/d/${uploaded.id}/view`;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { error } = await supabase
      .from("screening_submissions")
      .update({ video_url: driveUrl, video_uploaded: true })
      .eq("id", submissionId);
    if (error) console.error("DB update error:", error);

    return new Response(
      JSON.stringify({ ok: true, video_url: driveUrl }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("upload-screening-video error:", err);
    return new Response(
      JSON.stringify({ ok: false, error: (err as Error).message || "Upload failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
