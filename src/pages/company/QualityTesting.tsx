import { CompanyDetail, type CompanyPageData } from "@/components/company/CompanyDetail";
const data: CompanyPageData = {
  path: "/company/quality-testing", label: "Quality & Testing", title: "Engineered. Tested. Verified.",
  intro: "Technical evaluation should start with the exact model and its published specification. The checks below are evaluation areas to discuss with our product team, not claims of completed certification or available test reports for every product.",
  image: "/products/clhs-2710gh-switch.webp",
  process: ["Design review", "Component selection", "Prototype validation", "Production testing", "Final inspection", "Traceability", "Field feedback"],
  sections: [
    { label: "RF evaluation", title: "Antennas & RF hardware", items: [
      { title: "Electrical performance", text: "Frequency response, VSWR, return loss, gain, radiation pattern, beamwidth, cross-polarization, port isolation and front-to-back ratio are relevant to antenna evaluation. Request evidence for the chosen model.", image: "/products/sector-antenna-19dbi.jpg", to: "/products?category=sectorAntennas" },
      { title: "Mechanical & environmental", text: "Mounting, construction and intended exposure conditions should be reviewed against model documentation before a site deployment." },
    ] },
    { label: "Power evaluation", title: "PoE & power", items: [
      { title: "Electrical & load", text: "Input/output voltage, load behavior, efficiency, isolation and protection functions are relevant to product qualification.", image: "/products/dc-poe-clh.png", to: "/products?category=poe" },
      { title: "Thermal & protection", text: "Thermal performance, surge, ESD and burn-in requirements can be discussed for a specific application. Ask for model-specific evidence." },
    ] },
    { label: "Network evaluation", title: "Switches & routers", items: [
      { title: "Traffic & ports", text: "Review throughput, packet loss, latency, port behavior, protocol interoperability and failover against network requirements.", image: "/products/clh304-switch.jpg", to: "/products?category=switches" },
      { title: "Operation & firmware", text: "Power consumption, operating temperature and firmware version matter when specifying industrial network equipment." },
    ] },
    { label: "Evidence", title: "Reports & compliance", intro: "Test reports and certification documents should be associated with the exact model and revision. No unverified FCC, CE, RED, ISED or RoHS approval is implied here.", items: [
      { title: "Model-specific reports", text: "No verified test-report library is published yet. Request the applicable reports or confirmation of availability by model number." },
      { title: "Compliance & certifications", text: "Ask the product team to confirm which declarations or approvals apply to your target market and exact configuration.", to: "/quality-hse" },
      { title: "Laboratory imagery", text: "Verified laboratory photographs have not been supplied for this page. They can be added once provided and approved." },
    ] },
  ],
  links: [{ label: "Browse products", to: "/products" }, { label: "Quality & HSE", to: "/quality-hse" }], closing: "Need technical evidence for a particular model?"
};
export default function QualityTesting() { return <CompanyDetail data={data} />; }
