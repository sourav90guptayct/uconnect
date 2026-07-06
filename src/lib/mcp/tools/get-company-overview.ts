import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_company_overview",
  title: "Get company overview",
  description:
    "Returns a high-level overview of UConnect Tech: what the company does, key stats, and primary contact emails.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const overview = {
      name: "UConnect Tech",
      website: "https://uconnecttech.com",
      founded: 2017,
      focus:
        "Enterprise B2B telecom & network infrastructure — design, deployment, managed services, and the ConnectLH™ product line.",
      stats: {
        tier1_engineers: "200+",
        circles_covered: 18,
        links_deployed: "10,000+",
        projects_delivered: "30+",
        active_customers: "15+",
        regional_warehouses: 5,
      },
      contacts: {
        support_email: "support@uconnecttech.com",
        general_email: "reachus@uconnecttech.com",
      },
    };
    return {
      content: [{ type: "text", text: JSON.stringify(overview, null, 2) }],
      structuredContent: overview,
    };
  },
});
