import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "who_am_i",
  title: "Who am I",
  description:
    "Returns the signed-in uConnect user's identity and their roles in the app. Use this to confirm which account the connection is acting as.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return {
        content: [{ type: "text", text: "Not authenticated. Sign in to use this tool." }],
        isError: true,
      };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", ctx.getUserId());
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    const identity = {
      userId: ctx.getUserId(),
      email: ctx.getUserEmail(),
      roles: (data ?? []).map((r) => r.role),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(identity, null, 2) }],
      structuredContent: identity,
    };
  },
});
