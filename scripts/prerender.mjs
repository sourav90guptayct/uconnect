/**
 * Build-time prerender: stamps per-route <title>, <meta description>,
 * <link rel=canonical>, and og / twitter tags into a per-route index.html
 * under dist/<route>/index.html.
 *
 * This gives crawlers correct, unique head metadata for every public
 * marketing route without requiring full SSR. The SPA still hydrates on
 * the client and react-helmet-async continues to run for JS-executing
 * bots.
 *
 * Runs as a `postbuild` step; safe to re-run.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const SITE = "https://uconnecttech.com";
const DEFAULT_IMAGE = `${SITE}/lovable-uploads/e7a37138-e424-4fe7-aba5-f6c5ad0a8cc4.webp`;

/** Public marketing routes. Keep in sync with src/pages/*.tsx SEO tags. */
const routes = [
  {
    path: "/",
    title: "uConnect Technologies | Telecom & IT Infrastructure India",
    description:
      "End-to-end telecom infrastructure, ConnectLH™ antennas, FTTH products, managed services and skilled manpower. Serving India's top carriers since 2017.",
    image: `${SITE}/og/home.jpg`,
  },
  {
    path: "/about",
    title: "About uConnect Technologies | Telecom Partner Since 2017",
    description:
      "Founded in 2017, uConnect Technologies delivers carrier-grade network deployment across 18 telecom circles with 200+ Tier-1 field engineers.",
    image: `${SITE}/og/about.jpg`,
  },
  {
    path: "/services",
    title: "Telecom & IT Services in India | uConnect Technologies",
    description:
      "Network deployment, managed services, infrastructure installation and skilled telecom manpower — delivered pan-India by uConnect Technologies.",
  },
  {
    path: "/products",
    title: "ConnectLH™ Antennas & Telecom Products | uConnect",
    description:
      "Carrier-grade ConnectLH™ dish and sector antennas, FTTH gear, PoE, RF & fiber cables. Datasheets available on request.",
  },
  {
    path: "/networks",
    title: "Network Deployment Services India | uConnect",
    description:
      "End-to-end network deployment across 18 telecom circles — 10,000+ Links installed by certified Tier-1 field engineers.",
  },
  {
    path: "/managed-services",
    title: "IT Managed Services & 24/7 NOC Support | uConnect",
    description:
      "24/7 NOC, field support and IT managed services backed by 5 regional warehouses and flexible SLAs across India.",
  },
  {
    path: "/infra-installation",
    title: "Telecom Infrastructure Installation | uConnect",
    description:
      "End-to-end telecom infra installation — BTS, towers, CCTV surveillance and enterprise networks — delivered by certified Tier-1 engineers.",
  },
  {
    path: "/resource-management",
    title: "Telecom Manpower & Resource Management | uConnect",
    description:
      "Skilled telecom manpower solutions: certified field engineers, riggers and NOC staff deployed pan-India with fast turnaround.",
  },
  {
    path: "/clients",
    title: "Our Clients — Carriers & Enterprises | uConnect",
    description:
      "Trusted by India's top telecom carriers and enterprises for network deployment, managed services and infrastructure projects.",
  },
  {
    path: "/careers",
    title: "Careers at uConnect Technologies | Telecom & IT Jobs India",
    description:
      "Join uConnect Technologies. Explore field engineering, NOC, RF and IT roles across 18 telecom circles in India.",
  },
  {
    path: "/support",
    title: "Support & Contact | uConnect Technologies",
    description:
      "Get help, FAQs and contact details. Enterprise inquiries answered within 4 business hours by a dedicated account manager.",
  },
  {
    path: "/business-practices",
    title: "Business Practices & Policies | uConnect Technologies",
    description:
      "uConnect Technologies' commitments on ethical conduct, fair dealing, supplier standards, delivery discipline and workplace policies for enterprise telecom projects.",
  },
  {
    path: "/governance",
    title: "Corporate Governance | uConnect Technologies",
    description:
      "Leadership structure, decision rights, project governance, risk management and financial discipline at uConnect Technologies, a product and services integrator.",
  },
  {
    path: "/quality-hse",
    title: "Quality, Health, Safety & Environment | uConnect Technologies",
    description:
      "uConnect Technologies' approach to installation quality, site safety, field engineer training, waste handling and environmental responsibility on telecom deployments.",
  },
  {
    path: "/solutions/5g",
    title: "5G Deployment & Infrastructure Solutions India | uConnect",
    description:
      "5G network deployment, installation, integration and infrastructure solutions for enterprise and telecom networks across India.",
  },
  {
    path: "/solutions/private-5g",
    title: "Private 5G Network Solutions India | uConnect",
    description:
      "Private 5G network solutions for industrial, enterprise, campus and mission-critical connectivity applications.",
  },
  {
    path: "/solutions/4g-lte",
    title: "4G LTE Network Deployment Services India | uConnect",
    description:
      "4G LTE deployment, installation, integration and support services for enterprise, telecom and remote connectivity.",
  },
  {
    path: "/solutions/microwave",
    title: "Microwave Link Deployment & Wireless Backhaul India | uConnect",
    description:
      "Microwave link planning, installation, commissioning and support for reliable wireless backhaul networks.",
  },
  {
    path: "/solutions/ubr",
    title: "UBR Wireless Network Solutions & Deployment India | uConnect",
    description:
      "UBR and unlicensed wireless network solutions for broadband, backhaul, enterprise and remote connectivity.",
  },
  {
    path: "/solutions/e-band",
    title: "e-Band Wireless Backhaul Solutions India | uConnect",
    description:
      "High-capacity e-Band wireless backhaul solutions for enterprise and telecom connectivity.",
  },
  {
    path: "/solutions/fiber",
    title: "Fiber Optic Network Deployment Services India | uConnect",
    description:
      "Fiber optic network deployment, installation, testing, splicing and last-mile connectivity services.",
  },
  {
    path: "/solutions/ftth",
    title: "FTTH & Broadband Deployment Services India | uConnect",
    description:
      "FTTH and broadband network deployment services for ISPs and connectivity providers.",
  },
  {
    path: "/solutions/enterprise-connectivity",
    title: "Enterprise Connectivity & Network Solutions India | uConnect",
    description:
      "Enterprise connectivity, wireless, SD-WAN and branch network deployment solutions across India.",
  },
  {
    path: "/solutions/sd-wan",
    title: "SD-WAN Deployment & Managed Network Services India | uConnect",
    description:
      "SD-WAN deployment and managed network solutions for distributed enterprise locations.",
  },
  {
    path: "/solutions/industrial-connectivity",
    title: "Industrial Wireless & 5G Connectivity Solutions India | uConnect",
    description:
      "Industrial wireless, 4G/5G, networking and IoT connectivity for factories and critical infrastructure.",
  },
  {
    path: "/solutions/power-poe",
    title: "Telecom PoE & Power Solutions India | uConnect",
    description:
      "Telecom and wireless PoE solutions including AC/DC PoE injectors, adapters and power infrastructure.",
  },
  {
    path: "/services/network-deployment",
    title: "Network Deployment & Installation Services India | uConnect",
    description:
      "End-to-end network deployment, installation, integration and commissioning services across India.",
  },
  {
    path: "/services/rf-planning",
    title: "RF Planning & Wireless Network Engineering India | uConnect",
    description:
      "RF planning, link budget, path profile, coverage analysis and wireless network optimization services.",
  },
  {
    path: "/services/site-survey",
    title: "Telecom Site Survey & Feasibility Services India | uConnect",
    description:
      "Telecom site surveys, feasibility studies, RF assessments and infrastructure audits for network projects.",
  },
  {
    path: "/services/installation",
    title: "Telecom Equipment Installation Services India | uConnect",
    description:
      "Professional telecom equipment, antenna, radio, rack, cabling and power installation services.",
  },
  {
    path: "/services/integration",
    title: "Network Integration & Commissioning Services India | uConnect",
    description:
      "Multi-vendor network integration, configuration, testing and commissioning services.",
  },
  {
    path: "/services/testing-commissioning",
    title: "Network Testing & Commissioning Services India | uConnect",
    description:
      "Network testing, acceptance, commissioning and performance validation for telecom and enterprise deployments.",
  },
  {
    path: "/services/managed-services",
    title: "Telecom O&M & Network Maintenance Services India | uConnect",
    description:
      "Preventive and corrective telecom network maintenance, field support and operational services.",
  },
  {
    path: "/services/noc",
    title: "NOC & Network Monitoring Services India | uConnect",
    description:
      "NOC and network monitoring services with remote support, incident management and operational visibility.",
  },
  {
    path: "/services/field-engineering",
    title: "Telecom Field Engineering & Support Services India | uConnect",
    description:
      "Pan-India field engineering, deployment, maintenance and technical support services.",
  },
  {
    path: "/services/project-management",
    title: "Telecom Project Management & Rollout Services India | uConnect",
    description:
      "Telecom project management, rollout coordination, quality control and multi-site delivery support.",
  },
  {
    path: "/products/antennas",
    title: "Telecom & Wireless Antennas India | uConnect",
    description:
      "ConnectLH wireless dish and sector antennas for P2P, P2MP, WISP and backhaul deployments.",
  },
  {
    path: "/products/5g-routers",
    title: "Industrial 4G/5G Routers & CPE India | uConnect",
    description:
      "Industrial-grade outdoor 4G/5G routers for enterprise, CCTV, traffic, smart-city and remote connectivity.",
  },
  {
    path: "/products/managed-switches",
    title: "Industrial Managed Ethernet & PoE Switches India | uConnect",
    description:
      "Managed and industrial Ethernet switches for telecom, enterprise and mission-critical networks.",
  },
  {
    path: "/products/ftth-products",
    title: "FTTH & Fiber Optic Products India | uConnect",
    description:
      "FTTH and fiber optic products, cable assemblies and connectivity accessories for broadband deployments.",
  },
  {
    path: "/products/rf-cables",
    title: "RF Cables & Cable Assemblies India | uConnect",
    description:
      "RF and coaxial cable assemblies designed for wireless and telecom network applications.",
  },
  {
    path: "/products/racks-cabinets",
    title: "Telecom Racks & Outdoor Cabinets India | uConnect",
    description:
      "Indoor, outdoor and data-center racks and cabinets for telecom and enterprise network equipment.",
  },
  {
    path: "/industries/smart-city",
    title: "Smart City Connectivity & Network Solutions India | uConnect",
    description:
      "Connectivity infrastructure for CCTV, traffic systems, smart streetlights and IoT deployments.",
  },
  {
    path: "/industries/energy-utilities",
    title: "Energy & Utility Connectivity Solutions India | uConnect",
    description:
      "Reliable wireless, cellular and network infrastructure for substations, solar farms and utility assets.",
  },
  {
    path: "/industries/transportation",
    title: "Transportation & Fleet Connectivity Solutions India | uConnect",
    description:
      "Connectivity and network infrastructure for transportation, fleet, logistics and public transit applications.",
  },
  {
    path: "/industries/railways",
    title: "Railway Communication & Network Solutions India | uConnect",
    description:
      "Telecom, wireless and network infrastructure solutions for railway and transportation environments.",
  },
  {
    path: "/industries/retail",
    title: "Retail & POS Connectivity Solutions India | uConnect",
    description:
      "Always-on connectivity and network deployment for retail stores, POS, digital signage and branch locations.",
  },
  {
    path: "/industries/data-centers",
    title: "Data Center Network Infrastructure & Connectivity India | uConnect",
    description:
      "Network infrastructure, connectivity, racks, switching and deployment services for data centers.",
  },
  {
    path: "/industries/government",
    title: "Government Network & Connectivity Solutions India | uConnect",
    description:
      "Technology infrastructure, connectivity and deployment services for government and public-sector networks.",
  },
  {
    path: "/industries/rural-connectivity",
    title: "Rural Broadband & Last-Mile Connectivity India | uConnect",
    description:
      "Wireless and fiber solutions for rural broadband, remote sites and last-mile connectivity.",
  },
];


const escapeAttr = (v) =>
  String(v)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeText = (v) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function stampHead(html, { path, title, description, image = DEFAULT_IMAGE }) {
  const url = `${SITE}${path === "/" ? "/" : path}`;
  const canonical = url;
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  const tText = escapeText(title);

  let out = html;

  // Replace <title>
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${tText}</title>`);

  // Replace or insert <meta name="description">
  if (/<meta\s+name="description"[^>]*>/i.test(out)) {
    out = out.replace(
      /<meta\s+name="description"[^>]*>/i,
      `<meta name="description" content="${d}" />`
    );
  }

  // Replace og:title
  if (/<meta\s+property="og:title"[^>]*>/i.test(out)) {
    out = out.replace(
      /<meta\s+property="og:title"[^>]*>/i,
      `<meta property="og:title" content="${t}" />`
    );
  }

  // Replace og:description
  if (/<meta\s+property="og:description"[^>]*>/i.test(out)) {
    out = out.replace(
      /<meta\s+property="og:description"[^>]*>/i,
      `<meta property="og:description" content="${d}" />`
    );
  }

  // Replace og:url
  if (/<meta\s+property="og:url"[^>]*>/i.test(out)) {
    out = out.replace(
      /<meta\s+property="og:url"[^>]*>/i,
      `<meta property="og:url" content="${escapeAttr(url)}" />`
    );
  }

  // Replace og:image
  if (/<meta\s+property="og:image"[^>]*>/i.test(out)) {
    out = out.replace(
      /<meta\s+property="og:image"[^>]*>/i,
      `<meta property="og:image" content="${escapeAttr(image)}" />`
    );
  }

  // Replace twitter:title / description / image
  out = out.replace(
    /<meta\s+name="twitter:title"[^>]*>/i,
    `<meta name="twitter:title" content="${t}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:description"[^>]*>/i,
    `<meta name="twitter:description" content="${d}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:image"[^>]*>/i,
    `<meta name="twitter:image" content="${escapeAttr(image)}" />`
  );

  // Insert / replace canonical
  const canonicalTag = `<link rel="canonical" href="${escapeAttr(canonical)}" />`;
  if (/<link\s+rel="canonical"[^>]*>/i.test(out)) {
    out = out.replace(/<link\s+rel="canonical"[^>]*>/i, canonicalTag);
  } else {
    // Insert right after <meta name="description">
    out = out.replace(
      /(<meta\s+name="description"[^>]*>)/i,
      `$1\n    ${canonicalTag}`
    );
  }

  return out;
}

function main() {
  const templatePath = join(DIST, "index.html");
  if (!existsSync(templatePath)) {
    console.error(`[prerender] dist/index.html not found — did vite build run?`);
    process.exit(1);
  }
  const template = readFileSync(templatePath, "utf8");

  let written = 0;
  for (const route of routes) {
    const html = stampHead(template, route);
    const outPath =
      route.path === "/"
        ? join(DIST, "index.html")
        : join(DIST, route.path.replace(/^\//, ""), "index.html");
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf8");
    written += 1;
    console.log(`[prerender] ${route.path.padEnd(24)} -> ${outPath.replace(DIST, "dist")}`);
  }
  console.log(`[prerender] wrote ${written} route(s).`);
}

main();
