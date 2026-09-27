import { Factory } from "lucide-react";
import PolicyPage from "@/components/PolicyPage";

const Manufacturing = () => (
  <PolicyPage
    eyebrow="Manufacturing"
    title="How ConnectLH™ products are built"
    intro="ConnectLH™ products are designed and engineered by uConnect Technologies and produced with qualified manufacturing partners under our specifications, inspection and release control."
    seoTitle="Manufacturing | ConnectLH™ by uConnect Technologies"
    seoDescription="Design, sourcing, production partners and release control behind ConnectLH™ antennas, PoE, industrial Ethernet, 4G/5G and fiber products."
    path="/company/manufacturing"
    icon={Factory}
    related={[
      { label: "Quality & Testing", to: "/company/quality-testing" },
      { label: "ConnectLH™ brand", to: "/company/connectlh" },
      { label: "Products", to: "/products" },
    ]}
    sections={[
      {
        title: "Design and engineering",
        body: "Product requirements come directly from our field deployments. Our engineers define RF, mechanical and environmental specifications so products perform on real sites, not just on paper.",
      },
      {
        title: "Qualified production partners",
        body: "Production is carried out by vetted partners selected for process capability, consistency and compliance. Each partner works to documented uConnect specifications.",
        points: [
          "Supplier qualification before first production run.",
          "Golden-sample approval for every product variant.",
          "Periodic supplier performance reviews.",
        ],
      },
      {
        title: "Release and traceability",
        body: "Batches are inspected before release into our regional warehouses, and serial or batch records allow issues to be traced back to production.",
      },
    ]}
  />
);

export default Manufacturing;
