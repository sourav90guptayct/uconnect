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
