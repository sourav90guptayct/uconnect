import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseProjectUrl, supabasePublishableKey } from "../supabase";

export default defineTool({
  name: "submit_contact_inquiry",
  title: "Submit contact inquiry",
  description:
    "Submits a contact inquiry to UConnect Tech on behalf of the signed-in user. The team will follow up by email. Use for genuine business inquiries only.",
  inputSchema: {
    fullName: z.string().trim().min(1).max(100).describe("Full name of the person."),
    email: z.string().trim().email().max(254).describe("Contact email address."),
    company: z.string().trim().max(100).optional().describe("Company name (optional)."),
    phone: z.string().trim().max(20).optional().describe("Contact phone (optional)."),
    message: z.string().trim().min(1).max(2000).describe("Message / inquiry details."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async ({ fullName, email, company, phone, message }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return {
        content: [{ type: "text", text: "Not authenticated. Sign in to use this tool." }],
        isError: true,
      };
    }
    let supabaseUrl: string;
    let anonKey: string;
    try {
      supabaseUrl = supabaseProjectUrl();
      anonKey = supabasePublishableKey();
    } catch {
      return {
        content: [{ type: "text", text: "Contact endpoint is not configured." }],
        isError: true,
      };
    }
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: anonKey,
          Authorization: `Bearer ${ctx.getToken()}`,
        },
        body: JSON.stringify({ fullName, email, phone, company, message }),
      });
      const text = await res.text();
      if (!res.ok) {
        return {
          content: [{ type: "text", text: `Submission failed (${res.status}): ${text}` }],
          isError: true,
        };
      }
      return {
        content: [
          {
            type: "text",
            text: "Inquiry submitted successfully. The UConnect Tech team will reply by email.",
          },
        ],
        structuredContent: { ok: true },
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Submission error: ${(err as Error).message}` }],
        isError: true,
      };
    }
  },
});
