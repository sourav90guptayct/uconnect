import { CompanyDetail, type CompanyPageData } from "@/components/company/CompanyDetail";
const data: CompanyPageData = {
  path: "/company/global-presence", label: "Global Presence", title: "Connecting networks across markets",
  intro: "uConnect's documented delivery scale is rooted in India: 18 telecom circles, 200+ Tier-1 engineers and five regional warehouses. For customers outside India, we welcome product and partnership enquiries without implying a local office or distributor.",
  image: "/products/telecom-tower.webp",
  sections: [
    { label: "Established scale", title: "Network delivery in India", items: [
      { title: "18 telecom circles", text: "Field-delivery footprint for network projects across India.", to: "/networks" },
      { title: "200+ Tier-1 engineers", text: "Engineering resources supporting deployment and operational programmes.", to: "/resource-management" },
      { title: "Five regional warehouses", text: "Regional logistics supporting project materials and product fulfilment in India." },
      { title: "10,000+ links deployed", text: "Documented network deployment experience across customer projects.", to: "/clients" },
    ] },
    { label: "Market opportunities", title: "ConnectLH™ for international projects", intro: "The following are markets of interest and application areas, not claims of current office, customer or partner presence.", items: [
      { title: "USA & Canada", text: "WISP networks, wireless backhaul, industrial connectivity and surveillance projects.", to: "/products?category=antennas" },
      { title: "Europe", text: "Industrial networking, transportation, utilities and wireless infrastructure applications.", to: "/products?category=switches" },
      { title: "Latin America", text: "Rural broadband, wireless backhaul and telecom infrastructure projects.", to: "/products?category=sectorAntennas" },
      { title: "Middle East & Africa", text: "Infrastructure and enterprise connectivity opportunities; ask us about availability for your project.", to: "/products" },
      { title: "Asia Pacific", text: "Fiber, industrial networking and site-connectivity requirements.", to: "/products?category=fiberCables" },
    ] },
    { label: "Partner programme", title: "Bring ConnectLH™ to your market", intro: "If you are a distributor, VAR, system integrator, WISP or OEM, share your territory and portfolio interests. Representation is discussed individually; no overseas distributor network is claimed here.", items: [
      { title: "Distribution & VAR", text: "Discuss product range, market coverage and commercial fit." },
      { title: "System integrators & WISPs", text: "Explore equipment for backhaul, access and deployment projects." },
      { title: "OEM partners", text: "Discuss project specifications and customization feasibility." },
    ] },
  ], links: [{ label: "Explore ConnectLH™", to: "/company/connectlh" }, { label: "View products", to: "/products" }], closing: "Bring ConnectLH™ to your market."
};
export default function GlobalPresence() { return <CompanyDetail data={data} />; }
