import { defineMcp } from "@lovable.dev/mcp-js";
import getCompanyOverview from "./tools/get-company-overview";
import listProductCategories from "./tools/list-product-categories";
import submitContactInquiry from "./tools/submit-contact-inquiry";

export default defineMcp({
  name: "uconnect-tech-mcp",
  title: "UConnect Tech",
  version: "0.1.0",
  instructions:
    "Tools for UConnect Tech (uconnecttech.com). Use `get_company_overview` for company facts and contact emails, `list_product_categories` to browse the ConnectLH™ catalog, and `submit_contact_inquiry` to send a business inquiry to the team.",
  tools: [getCompanyOverview, listProductCategories, submitContactInquiry],
});
