// Server-side proxy to submit contact form data to Google Forms.
// Bypasses browser CSP/CORS restrictions that block client-side POSTs to docs.google.com.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSf2xt_DyU4tBAwcbxio49zuUtMsUSU9taac-5HN5MkLNKFZyw/formResponse";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { fullName, email, phone, company, message } = await req.json();

    const formBody = new URLSearchParams({
      "entry.1858826821": fullName ?? "",
      "entry.915319340": email ?? "",
      "entry.602424569": phone || "Not provided",
      "entry.1474328581": company || "Not provided",
      "entry.99606719": message ?? "",
    });

    const res = await fetch(GOOGLE_FORM_ACTION, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody.toString(),
    });

    // Google returns 200 with HTML on success. Anything else = failure.
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
