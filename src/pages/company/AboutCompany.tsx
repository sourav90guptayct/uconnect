import { CompanyDetail, type CompanyPageData } from "@/components/company/CompanyDetail";
const data: CompanyPageData = {
  path: "/company/about", label: "About uConnect", title: "Products, engineering and network operations together",
  intro: "Founded in 2017, uConnect Technologies combines ConnectLH™ telecom products with network deployment, managed services, infrastructure solutions and skilled engineering resources.",
  image: "/products/telecom-tower.webp",
  sections: [
    { label: "Our story", title: "Built around work in the field", intro: "The company has grown from telecom infrastructure delivery into an integrated product-and-services offering. Documented scale: 200+ Tier-1 engineers, 18 telecom circles, 10,000+ links deployed, 30+ projects and 15+ active customers.", items: [
      { title: "2017 · Founded", text: "uConnect Technologies begins its telecom and networking journey." },
      { title: "Field delivery", text: "Network rollout experience informs our approach to design, equipment selection and support.", to: "/networks" },
      { title: "Today · Products + services", text: "ConnectLH™ product families complement network deployment, managed services, resource management and infrastructure installation.", to: "/company/connectlh" },
    ] },
    { label: "What we do", title: "One view of the network lifecycle", items: [
      { title: "ConnectLH™ products", text: "A uConnect Technologies brand covering antennas, industrial Ethernet, PoE, 4G/5G routers, fiber, RF and infrastructure hardware.", image: "/products/dish-antenna-32dbi.jpg", to: "/company/connectlh" },
      { title: "Design & deployment", text: "Plan, install and integrate network infrastructure for demanding environments.", image: "/products/category-bts.jpg", to: "/networks" },
      { title: "Managed operations", text: "Support networks after commissioning through ongoing service and field resources.", to: "/managed-services" },
    ] },
    { label: "Applications", title: "Networks across sectors", items: [
      { title: "Telecom & digital infrastructure", text: "Wireless access, backhaul, towers and fiber-connected networks." },
      { title: "Government & transportation", text: "Connectivity and surveillance for public infrastructure, rail and transport settings." },
      { title: "Energy & enterprise", text: "Industrial and enterprise connectivity where reliable operations matter." },
    ] },
  ], links: [{ label: "Explore ConnectLH™", to: "/company/connectlh" }, { label: "Our services", to: "/company/services" }], closing: "Explore how our products and engineers work together."
};
export default function AboutCompany() { return <CompanyDetail data={data} />; }
