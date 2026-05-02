import { z } from 'npm:zod@3.23.8'

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

const CareersFormSchema = z.object({
  fullName: z.string().min(1).max(100),
  mobile: z.string().min(1).max(20),
  email: z.string().email().max(254),
  state: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  qualification: z.string().min(1).max(100),
  specialization: z.string().min(1).max(200),
  experienceLevel: z.string().min(1).max(50),
  currentCompany: z.string().min(1).max(200),
  jobPosition: z.string().min(1).max(100),
  experienceYears: z.string().min(1).max(50),
  hasBike: z.string().min(1).max(50),
  hasLaptop: z.string().min(1).max(50),
});

async function getFbzx(): Promise<string | null> {
  const res = await fetch(VIEW_URL, { headers: { "User-Agent": UA } });
  const html = await res.text();
  const match = html.match(/name="fbzx"\s+value="([^"]+)"/);
  return match ? match[1] : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();

    const parsed = CareersFormSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ ok: false, error: "Invalid input. Please check all fields and try again." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const {
      fullName, mobile, email, state, city, qualification,
      specialization, experienceLevel, currentCompany, jobPosition,
      experienceYears, hasBike, hasLaptop,
    } = parsed.data;

    const fbzx = await getFbzx();
    console.log("Fetched fbzx:", fbzx);

    const formBody = new URLSearchParams({
      "entry.501059011": fullName,
      "entry.96946081": mobile,
      "entry.2103685097": email,
      "entry.182552751": state,
      "entry.1044807937": city,
      "entry.13989485": qualification,
      "entry.1243893873": specialization,
      "entry.1515116795": experienceLevel,
      "entry.1515116795_sentinel": "",
      "entry.801044223": currentCompany,
      "entry.1560570624": jobPosition,
      "entry.1560570624_sentinel": "",
      "entry.264762602": experienceYears,
      "entry.264762602_sentinel": "",
      "entry.2099693160": hasBike,
      "entry.2099693160_sentinel": "",
      "entry.195042154": hasLaptop,
      "entry.195042154_sentinel": "",
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

    const success = res.status === 200;
    console.log("Careers Form submit status:", res.status, "success:", success);

    return new Response(
      JSON.stringify({ ok: success, status: res.status }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: success ? 200 : 502,
      },
    );
  } catch (err) {
    console.error("submit-careers-form error:", err);
    return new Response(JSON.stringify({ ok: false, error: "Submission failed. Please try again." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
