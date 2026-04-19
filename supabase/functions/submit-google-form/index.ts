// Server-side proxy: submits to Google Forms by first scraping the live form
// to obtain a valid fbzx session token (Google rejects POSTs without it).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FORM_ID = "1FAIpQLSf2xt_DyU4tBAwcbxio49zuUtMsUSU9taac-5HN5MkLNKFZyw";
const VIEW_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`;
const POST_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

async function getFbzx(): Promise<string | null> {
  const res = await fetch(VIEW_URL, { headers: { "User-Agent": UA } });
  const html = await res.text();
  const match = html.match(/name="fbzx"\s+value="([^"]+)"/);
  return match ? match[1] : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { fullName, email, phone, company, message } = await req.json();

    const fbzx = await getFbzx();
    console.log("Fetched fbzx:", fbzx);

    const formBody = new URLSearchParams({
      "entry.1858826821": fullName ?? "",
      "entry.915319340": email ?? "",
      "entry.602424569": phone || "Not provided",
      "entry.1474328581": company || "Not provided",
      "entry.99606719": message ?? "",
      fvv: "1",
      pageHistory: "0",
      ...(fbzx ? { fbzx, draftResponse: `[null,null,"${fbzx}"]` } : {}),
    });

    const res = await fetch(POST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": UA,
        Referer: VIEW_URL,
        Origin: "https://docs.google.com",
      },
      body: formBody.toString(),
    });

    const ok = res.status === 200;
    console.log("Google Form submit status:", res.status, "ok:", ok);

    return new Response(JSON.stringify({ ok, status: res.status }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: ok ? 200 : 502,
    });
  } catch (err) {
    console.error("submit-google-form error:", err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
