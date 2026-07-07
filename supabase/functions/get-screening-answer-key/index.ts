// Admin-only: returns the ANSWER_KEY so admins can render per-question
// correctness on the Screenings detail page. Never expose to non-admins.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const ANSWER_KEY: Record<number, number> = {
  1: 1, 2: 2, 3: 1, 4: 2, 5: 2, 6: 1, 7: 2, 8: 1, 9: 1, 10: 2,
  11: 1, 12: 2, 13: 2, 14: 2, 15: 1, 16: 1, 17: 2, 18: 0, 19: 1, 20: 2,
  21: 1, 22: 2, 23: 1, 24: 1, 25: 3, 26: 1, 27: 2, 28: 1, 29: 2, 30: 0,
  31: 2, 32: 2, 33: 1, 34: 1, 35: 0, 36: 1, 37: 3, 38: 1, 39: 1, 40: 1,
  41: 1, 42: 1, 43: 1, 44: 1, 45: 0, 46: 1, 47: 1, 48: 1, 49: 1, 50: 2,
  51: 1, 52: 1, 53: 1, 54: 1, 55: 1, 56: 1, 57: 2, 58: 1, 59: 2, 60: 2,
  61: 1, 62: 0, 63: 2, 64: 2, 65: 1, 66: 1, 67: 1, 68: 1, 69: 1, 70: 1,
  71: 2, 72: 2, 73: 0, 74: 1, 75: 2, 76: 1, 77: 2, 78: 1, 79: 2, 80: 0,
  81: 0, 82: 3, 83: 0, 84: 0, 85: 2, 86: 2, 87: 1, 88: 0, 89: 1, 90: 2,
  91: 2, 92: 1, 93: 2, 94: 1, 95: 0, 96: 2, 97: 0, 98: 2, 99: 1, 100: 1,
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: roleData } = await admin.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ answer_key: ANSWER_KEY }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
