import { CompanyDetail, type CompanyPageData } from "@/components/company/CompanyDetail";
import networks from "@/assets/networks-deployment.jpg";
import managed from "@/assets/managed-hero.jpg";
const data: CompanyPageData = {
  path: "/company/services", label: "Company Services", title: "Beyond hardware. Across the network lifecycle.",
  intro: "Product engineering, field deployment and network operations under one umbrella: uConnect combines ConnectLH™ equipment with network rollout, managed services, skilled resources and infrastructure solutions.",
  image: networks,
  process: ["Plan", "Design", "Deploy", "Integrate", "Optimize", "Operate", "Support"],
  sections: [
    { label: "Our practices", title: "Services that connect product to outcome", items: [
      { title: "Network design & deployment", text: "Network planning, site requirements, installation and commissioning for telecom and enterprise projects.", image: networks, to: "/networks" },
      { title: "Managed services", text: "Monitoring, incident coordination, field support and performance management where agreed in the service scope.", image: managed, to: "/managed-services" },
      { title: "Resource management", text: "Skilled technical people for project delivery and ongoing operations.", to: "/resource-management" },
      { title: "Infrastructure solutions", text: "Site installation and integration across network and physical infrastructure.", to: "/infra-installation" },
    ] },
    { label: "How we work", title: "Product + field experience + operations", intro: "10,000+ links deployed and 200+ Tier-1 engineers across 18 circles underpin our practical approach to network delivery.", items: [
      { title: "Select the right hardware", text: "Start with the application and relevant ConnectLH™ equipment, from antennas to switching and power.", to: "/company/connectlh" },
      { title: "Deploy with context", text: "Installation, commissioning and integration take account of the real site and operational handover.", to: "/networks" },
      { title: "Support ongoing performance", text: "Discuss managed operations and service levels for your specific environment.", to: "/managed-services" },
    ] },
  ], links: [{ label: "Explore all services", to: "/services" }, { label: "Explore products", to: "/products" }], closing: "Discuss your network requirement with our team."
};
export default function CompanyServices() { return <CompanyDetail data={data} />; }
