import { CompanyDetail, type CompanyPageData } from "@/components/company/CompanyDetail";
const data: CompanyPageData = {
  path: "/company/manufacturing", label: "Manufacturing & Supply", title: "Engineered in India. Built for global networks.",
  intro: "Explore how ConnectLH™ product requirements, engineering and supply decisions come together. Production arrangements, custom specifications and documentation are confirmed by product and project.",
  image: "/products/data-centre-rack.jpg",
  process: ["Requirements", "Engineering", "Prototype", "Validation", "Production", "Quality control", "Packaging", "Delivery"],
  sections: [
    { label: "Portfolio", title: "Products that support network buildouts", intro: "These are product categories in our current catalogue, not a claim that every item is manufactured in-house.", items: [
      { title: "Antennas & RF assemblies", text: "Dish antennas, sector antennas, RF jumpers and coaxial assemblies.", image: "/products/dish-antenna-32dbi.jpg", to: "/products?category=antennas" },
      { title: "Power & industrial networking", text: "AC/DC PoE equipment, industrial switches and routers.", image: "/products/dcclh-35-56.jpg", to: "/products?category=poe" },
      { title: "Fiber & site infrastructure", text: "FTTH equipment, cable assemblies, racks and mounting hardware.", image: "/products/fms-96-port.webp", to: "/products?category=ftth" },
    ] },
    { label: "Delivery considerations", title: "From a requirement to a supplied product", items: [
      { title: "Product engineering", text: "Discuss form factor, interfaces, application and environmental requirements against existing products." },
      { title: "Component sourcing & assembly", text: "Component choice, production route and assembly scope depend on the model and agreed specification; request details for the product you are evaluating." },
      { title: "Quality control & traceability", text: "Ask for model-specific inspection, identification and traceability information before procurement; documentation availability varies by product." },
      { title: "Supply chain & packaging", text: "For project orders, discuss volumes, packing format and destination requirements with the team." },
      { title: "OEM & private label", text: "Share drawings, target specification and expected quantity to assess customization and private-label feasibility." },
      { title: "Custom engineering", text: "Proposed changes are reviewed against performance, compatibility and deployment needs before a scope is agreed." },
    ] },
    { label: "Production visibility", title: "Request evidence for the model you need", intro: "Verified facility, assembly, laboratory, warehouse and packaging photographs have not been supplied for publication. We will not present unrelated imagery as a production facility.", items: [
      { title: "Technical documentation", text: "Request the applicable product datasheet, inspection information or production documentation by model number." },
      { title: "Factory & process imagery", text: "Facility photographs can be added when verified images are supplied by uConnect." },
    ] },
  ],
  links: [{ label: "View product portfolio", to: "/products" }, { label: "Quality & testing", to: "/company/quality-testing" }], closing: "OEM & custom manufacturing starts with your specification."
};
export default function Manufacturing() { return <CompanyDetail data={data} />; }
