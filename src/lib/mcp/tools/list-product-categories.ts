import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const CATEGORIES = [
  "FTTH Products",
  "Optic Fiber Cable Assemblies",
  "RF Cables & Assemblies",
  "Network & Data Cable Assemblies",
  "Specialized Cable Assemblies",
  "ConnectLH™ Racks & Cabinets",
  "BTS Installation Products",
  "ConnectLH™ Dish Antennas",
];

export default defineTool({
  name: "list_product_categories",
  title: "List product categories",
  description:
    "Lists the top-level product categories in the UConnect Tech / ConnectLH™ catalog.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: CATEGORIES.join("\n") }],
    structuredContent: { categories: CATEGORIES },
  }),
});
