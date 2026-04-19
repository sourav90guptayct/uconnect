// Server-side proxy for the Careers Google Form submission.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FORM_ID = "1FAIpQLScrgWawTWNWiC9n3uLRAh8KpZPM8w_kCcOY_Ye53Lb8VomDRg";
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
    const {
      fullName,
      mobile,
      email,
      state,
      city,
      qualification,
      specialization,
      experienceLevel,
      currentCompany,
      jobPosition,
      experienceYears,
    } = await req.json();

    const fbzx = await getFbzx();
    console.log("Fetched fbzx:", fbzx);

    const formBody = new URLSearchParams({
      "entry.501059011": fullName ?? "",
      "entry.96946081": mobile ?? "",
      "entry.2103685097": email ?? "",
      "entry.182552751": state ?? "",
      "entry.1044807937": city ?? "",
      "entry.13989485": qualification ?? "",
      "entry.1243893873": specialization ?? "",
      "entry.1515116795": experienceLevel ?? "",
      "entry.1515116795_sentinel": "",
      "entry.801044223": currentCompany ?? "",
      "entry.1560570624": jobPosition ?? "",
      "entry.1560570624_sentinel": "",
      "entry.264762602": experienceYears ?? "",
      "entry.264762602_sentinel": "",
      fvv: "1",
      pageHistory: "0",
      submissionTimestamp: "-1",
      ...(fbzx
        ? { fbzx, partialResponse: `[null,null,"${fbzx}"]` }
        : {}),
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

    const html = await res.text();
    const success =
      res.status === 200 &&
      (html.includes("freebirdFormviewerViewResponseConfirm") ||
        html.includes("Your response has been recorded"));
    console.log("Careers Form submit status:", res.status, "success:", success, "len:", html.length);

    return new Response(
      JSON.stringify({ ok: success, status: res.status }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: success ? 200 : 502,
      },
    );
  } catch (err) {
    console.error("submit-careers-form error:", err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
