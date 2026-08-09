import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getCompanyOverview from "./tools/get-company-overview";
import listProductCategories from "./tools/list-product-categories";
import submitContactInquiry from "./tools/submit-contact-inquiry";
import whoAmI from "./tools/who-am-i";

// The OAuth issuer must be the direct Supabase host, built from the project ref
// (inlined at build time, so this stays import-safe).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "uconnect-tech-mcp",
  title: "UConnect Tech",
  version: "0.2.0",
  instructions:
    "Tools for UConnect Tech (uconnecttech.com). Callers must sign in as a uConnect user; every tool acts as that user. Use `who_am_i` to confirm the signed-in identity, `get_company_overview` for company facts and contact emails, `list_product_categories` to browse the ConnectLH™ catalog, and `submit_contact_inquiry` to send a business inquiry to the team.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [whoAmI, getCompanyOverview, listProductCategories, submitContactInquiry],
});
