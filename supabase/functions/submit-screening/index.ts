// Submit L2 Network Engineer screening test.
// Scores answers server-side (correct answers never leave this file) and stores submission.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// question_id -> correct option index (0-based against the ORIGINAL options list in
// src/data/l2ScreeningQuestions.ts). Never send to client.
const ANSWER_KEY: Record<number, number> = {
  // Easy (1-40)
  1: 1, 2: 2, 3: 1, 4: 2, 5: 2, 6: 1, 7: 2, 8: 1, 9: 1, 10: 2,
  11: 1, 12: 2, 13: 2, 14: 2, 15: 1, 16: 1, 17: 2, 18: 0, 19: 1, 20: 2,
  21: 1, 22: 2, 23: 1, 24: 1, 25: 3, 26: 1, 27: 2, 28: 1, 29: 2, 30: 0,
  31: 2, 32: 2, 33: 1, 34: 1, 35: 0, 36: 1, 37: 3, 38: 1, 39: 1, 40: 1,
  // Moderate (41-80)
  41: 1, 42: 1, 43: 1, 44: 1, 45: 0, 46: 1, 47: 1, 48: 1, 49: 1, 50: 2,
  51: 1, 52: 1, 53: 1, 54: 1, 55: 1, 56: 1, 57: 2, 58: 1, 59: 2, 60: 2,
  61: 1, 62: 0, 63: 2, 64: 2, 65: 1, 66: 1, 67: 1, 68: 1, 69: 1, 70: 1,
  71: 2, 72: 2, 73: 0, 74: 1, 75: 2, 76: 1, 77: 2, 78: 1, 79: 2, 80: 0,
  // Hard (81-100)
  81: 0, 82: 3, 83: 0, 84: 0, 85: 2, 86: 2, 87: 1, 88: 0, 89: 1, 90: 2,
  91: 2, 92: 1, 93: 2, 94: 1, 95: 0, 96: 2, 97: 0, 98: 2, 99: 1, 100: 1,
};

const SubmissionSchema = z.object({
  candidate_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(6).max(20),
  current_location: z.string().trim().min(1).max(120),
  qualification: z.string().trim().min(1).max(120),
  total_experience: z.string().trim().min(1).max(60),
  relevant_experience: z.string().trim().min(1).max(60),
  current_company: z.string().trim().min(1).max(160),
  current_designation: z.string().trim().min(1).max(120),
  owns_laptop: z.enum(["Yes", "No"]),
  comfortable_manesar: z.enum(["Yes", "No"]),
  comfortable_shifts: z.enum(["Yes", "No"]),
  joining_availability: z.enum(["Immediate", "Within 15 Days", "30 Days", "More than 30 Days"]),
  current_ctc: z.string().trim().min(1).max(60),
  expected_ctc: z.string().trim().min(1).max(60),
  comfortable_25k: z.enum(["Yes", "No"]),
  answers: z.record(z.string(), z.number().int().min(0).max(3)),
  tab_switches: z.number().int().min(0).default(0),
  fullscreen_exits: z.number().int().min(0).default(0),
  window_blurs: z.number().int().min(0).default(0),
  resume_url: z.string().trim().min(1).max(1000).optional().nullable(),
});

function recommendation(scorePct: number, laptop: string, manesar: string, shifts: string, ctc: string) {
  if (laptop !== "Yes" || manesar !== "Yes" || shifts !== "Yes" || ctc !== "Yes") {
    return "Rejected - Mandatory criteria not met";
  }
  if (scorePct >= 80) return "Recommended for Technical Interview";
  if (scorePct >= 60) return "Hold / Needs Review";
  return "Not Recommended";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const parsed = SubmissionSchema.safeParse(body);
    if (!parsed.success) {
      console.error("Validation failed:", JSON.stringify(parsed.error.flatten().fieldErrors));
      return new Response(
        JSON.stringify({ ok: false, error: "Please fill all fields correctly.", details: parsed.error.flatten().fieldErrors }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const d = parsed.data;

    // Score server-side — score is out of the questions the candidate was shown,
    // normalized to a percentage so mixes of 20/23/25 questions stay comparable.
    let score = 0;
    const totalShown = Object.keys(d.answers).length || 1;
    for (const [qidStr, selected] of Object.entries(d.answers)) {
      const qid = Number(qidStr);
      if (ANSWER_KEY[qid] === selected) score += 1;
    }
    const scorePct = Math.round((score / totalShown) * 100);

    const rec = recommendation(scorePct, d.owns_laptop, d.comfortable_manesar, d.comfortable_shifts, d.comfortable_25k);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Duplicate check
    const { data: dupe } = await supabase
      .from("screening_submissions")
      .select("id, email, phone")
      .or(`email.eq.${d.email},phone.eq.${d.phone}`)
      .maybeSingle();

    if (dupe) {
      return new Response(
        JSON.stringify({ ok: false, error: "A submission with this email or phone already exists. Only one attempt is allowed." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }


    const { data: inserted, error } = await supabase
      .from("screening_submissions")
      .insert({
        role: "l2-network-engineer",
        candidate_name: d.candidate_name,
        email: d.email,
        phone: d.phone,
        current_location: d.current_location,
        qualification: d.qualification,
        total_experience: d.total_experience,
        relevant_experience: d.relevant_experience,
        current_company: d.current_company,
        current_designation: d.current_designation,
        owns_laptop: d.owns_laptop,
        comfortable_manesar: d.comfortable_manesar,
        comfortable_shifts: d.comfortable_shifts,
        joining_availability: d.joining_availability,
        current_ctc: d.current_ctc,
        expected_ctc: d.expected_ctc,
        comfortable_25k: d.comfortable_25k,
        answers: d.answers,
        score,
        recommendation: rec,
        tab_switches: d.tab_switches,
        fullscreen_exits: d.fullscreen_exits,
        window_blurs: d.window_blurs,
        resume_url: d.resume_url ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Insert error:", error);
      if ((error as any).code === "23505") {
        return new Response(
          JSON.stringify({ ok: false, error: "A submission with this email or phone already exists." }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ ok: false, error: "Failed to save submission." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Never return score/recommendation to the client
    return new Response(
      JSON.stringify({ ok: true, submission_id: inserted.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("submit-screening error:", err);
    return new Response(
      JSON.stringify({ ok: false, error: "Submission failed. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
