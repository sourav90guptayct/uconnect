import { BadgeCheck } from "lucide-react";
import PolicyPage from "@/components/PolicyPage";

const ConnectLH = () => (
  <PolicyPage
    eyebrow="ConnectLH™"
    title="Our product brand"
    intro="ConnectLH™ is uConnect Technologies' line of telecom and industrial networking products — built from what our engineers learned deploying 10,000+ links in the field."
    seoTitle="ConnectLH™ Brand | uConnect Technologies"
    seoDescription="ConnectLH™ telecom and industrial networking products: antennas, PoE, industrial Ethernet, 4G/5G connectivity and fiber infrastructure by uConnect Technologies."
    path="/company/connectlh"
    icon={BadgeCheck}
    related={[
      { label: "Browse products", to: "/products" },
      { label: "Manufacturing", to: "/company/manufacturing" },
      { label: "Quality & Testing", to: "/company/quality-testing" },
    ]}
    sections={[
      {
        title: "What ConnectLH™ covers",
        body: "A focused portfolio for carrier, enterprise and industrial networks.",
        points: [
          "Wireless, sector antennas and RF connectivity.",
          "PoE, power and industrial Ethernet.",
          "4G/5G routers, fiber and network cabling.",
        ],
      },
      {
        title: "Built by integrators",
        body: "Because we also deploy and operate networks, ConnectLH™ products are designed for fast installation, reliable operation and simple maintenance.",
      },
      {
        title: "Work with us",
        body: "Distributors, system integrators and project buyers can request datasheets, pricing and samples by writing to reachus@youconnecttech.com.",
      },
    ]}
  />
);

export default ConnectLH;
