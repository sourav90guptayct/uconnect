import { Globe2 } from "lucide-react";
import PolicyPage from "@/components/PolicyPage";

const GlobalPresence = () => (
  <PolicyPage
    eyebrow="Global Presence"
    title="Where uConnect delivers"
    intro="Since 2017 we have built delivery capability across 18 telecom circles, backed by five regional warehouses and a growing network of distribution partners for ConnectLH™ products."
    seoTitle="Global Presence | uConnect Technologies"
    seoDescription="uConnect Technologies delivery footprint: 18 telecom circles, 5 regional warehouses, 200+ Tier-1 engineers and ConnectLH™ distribution partners."
    path="/company/global-presence"
    icon={Globe2}
    related={[
      { label: "About uConnect", to: "/about" },
      { label: "Manufacturing", to: "/company/manufacturing" },
      { label: "Clients", to: "/clients" },
    ]}
    sections={[
      {
        title: "Delivery footprint",
        body: "Our engineering teams operate across 18 telecom circles, supporting operators, enterprises and public-sector programmes with deployment, managed services and skilled resources.",
        points: [
          "200+ Tier-1 engineers deployed across active programmes.",
          "10,000+ links deployed and 30+ projects delivered.",
          "15+ active customers served under long-term engagements.",
        ],
      },
      {
        title: "Regional logistics",
        body: "Five regional warehouses keep ConnectLH™ stock and project materials close to the site, shortening lead times and reducing deployment risk.",
      },
      {
        title: "International partners",
        body: "ConnectLH™ products are available to system integrators and distributors outside India. We are actively onboarding partners in the Americas, Europe and the Middle East.",
        points: [
          "Distributor and reseller programmes for ConnectLH™.",
          "Remote pre-sales and engineering support by email.",
          "Datasheets and technical documentation available on request.",
        ],
      },
    ]}
  />
);

export default GlobalPresence;
