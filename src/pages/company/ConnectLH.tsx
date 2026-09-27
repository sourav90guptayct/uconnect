import { CompanyDetail, type CompanyPageData } from "@/components/company/CompanyDetail";
const data: CompanyPageData = {
  path: "/company/connectlh", label: "ConnectLH™ · A uConnect Technologies Brand", title: "Connectivity built for demanding networks",
  intro: "ConnectLH™ is the telecom and industrial networking product portfolio from uConnect Technologies. Explore hardware for wireless, Ethernet, power, fiber and physical network infrastructure.",
  image: "/products/category-sectorAntennas.jpg",
  process: ["Field experience", "Customer requirements", "Engineering", "Validation", "Product", "Deployment", "Feedback"],
  sections: [
    { label: "Product portfolio", title: "Hardware for every layer of the network", intro: "Browse the live product catalogue for models, specifications and available datasheets.", items: [
      { title: "Wireless antennas", text: "Dish and sector antennas for backhaul and access networks.", image: "/products/dish-antenna-32dbi.jpg", to: "/products?category=antennas" },
      { title: "Industrial Ethernet", text: "Managed and unmanaged switching for industrial and telecom networks.", image: "/products/clhs-2710gh-switch.webp", to: "/products?category=switches" },
      { title: "PoE & power", text: "AC and DC power-over-Ethernet devices for site installations.", image: "/products/ac-poe-clh.png", to: "/products?category=poe" },
      { title: "4G/5G connectivity", text: "Industrial routers for connected equipment and remote sites.", image: "/products/clh500-router.jpg", to: "/products?category=routers" },
      { title: "Fiber connectivity", text: "Fiber cable assemblies, splitters and termination hardware.", image: "/products/fiber-patch-cord-1.webp", to: "/products?category=fiberCables" },
      { title: "RF connectivity", text: "RF jumpers and coaxial cable assemblies.", image: "/products/rf-jumpers.webp", to: "/products?category=rfCables" },
      { title: "Racks & enclosures", text: "Wall, outdoor and data-centre rack options.", image: "/products/wall-mount-rack-clh.jpg", to: "/products?category=racks" },
      { title: "Telecom infrastructure", text: "Mounts, poles and site hardware for deployment teams.", image: "/products/antenna-mounts.webp", to: "/products?category=bts" },
    ] },
    { label: "Engineering approach", title: "Designed with deployment in mind", items: [
      { title: "Performance & reliability", text: "Compare published model specifications and select products for the required operating conditions." },
      { title: "Interoperability & manageability", text: "Match equipment to the architecture of your existing network, including power, interfaces and service requirements." },
      { title: "Environmental resilience & serviceability", text: "Consider installation, access and maintenance requirements early in the product selection process." },
      { title: "OEM & custom engineering", text: "Share target specifications, volumes and application requirements with our product team to discuss available options; scope and feasibility are confirmed individually." },
    ] },
    { label: "Documentation", title: "Available product datasheets", intro: "Model-specific files currently available on the site; request documentation for other models by email.", items: [
      { title: "29CLH4959 dish antenna", text: "Download the model datasheet from the Products page.", to: "/products?category=antennas" },
      { title: "AC & DC PoE", text: "Published AC and DC PoE datasheets are available with their product listings.", to: "/products?category=poe" },
      { title: "Industrial switching", text: "Explore switching models and ask the team for the CLHS-2710GH datasheet.", to: "/products?category=switches" },
    ] },
  ],
  links: [{ label: "Explore products", to: "/products" }, { label: "Manufacturing", to: "/company/manufacturing" }], closing: "Select products for your next network project."
};
export default function ConnectLH() { return <CompanyDetail data={data} />; }
