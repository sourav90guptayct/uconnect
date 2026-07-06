import { Activity, Headphones, ShieldCheck, Gauge } from "lucide-react";
import ServiceDetailLayout, { type ServiceDetailData } from "@/components/ServiceDetailLayout";
import heroImg from "@/assets/managed-hero.jpg";

const data: ServiceDetailData = {
  seoTitle: "IT Managed Services & 24/7 NOC Support | uConnect",
  seoDescription: "24/7 NOC, field support and proactive network monitoring for enterprises across India, backed by 5 regional warehouses and flexible SLAs.",
  path: "/managed-services",
  eyebrow: "Managed Services",
  heroImage: heroImg,
  heroAlt: "Enterprise network operations center with engineers monitoring live telemetry on a large video wall",
  headlineLead: "Operate. Optimize.",
  headlineAccent: "Always-on.",
  headlineTail: "End-to-end managed services.",
  intro:
    "uConnect Technologies delivers fully managed operations for telecom networks, enterprise IT, and field infrastructure — combining a 24/7 NOC, proactive monitoring, and SLA-driven service delivery so your business stays online and performant.",

  capabilitiesEyebrow: "Our Capabilities",
  capabilitiesHeading: { lead: "Comprehensive managed", tail: "service capabilities." },
  capabilities: [
    {
      icon: Activity,
      title: "24/7 Network Operations Center",
      items: [
        "Round-the-clock monitoring",
        "Fault detection & alerting",
        "Performance dashboards",
        "Capacity & utilization tracking",
        "Multi-vendor visibility",
      ],
    },
    {
      icon: Headphones,
      title: "Incident & Service Management",
      items: [
        "L1/L2/L3 incident handling",
        "ITIL-aligned ticketing workflows",
        "Root-cause analysis",
        "Change & problem management",
        "Escalation and recovery",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Preventive & Field Maintenance",
      items: [
        "Scheduled preventive maintenance",
        "On-site break-fix support",
        "Spare management",
        "Site audits & health checks",
        "Compliance reporting",
      ],
    },
    {
      icon: Gauge,
      title: "Performance & SLA Governance",
      items: [
        "Service level monitoring",
        "Monthly performance reviews",
        "KPI dashboards",
        "Continuous improvement programs",
        "Vendor SLA management",
      ],
    },
  ],

  pillarsEyebrow: "Service Scope",
  pillarsHeading: { lead: "End-to-end operational", tail: "scope of work." },
  pillars: [
    "Network monitoring & alerting",
    "Configuration & change management",
    "Patch & firmware management",
    "Backup & recovery operations",
    "Asset lifecycle management",
    "Spare logistics",
    "Field engineering dispatch",
    "Vendor coordination",
    "Reporting & analytics",
    "Audit & compliance support",
    "Capacity planning",
    "Service desk operations",
  ],

  industriesEyebrow: "Industries",
  industriesHeading: { lead: "Sectors we", tail: "support." },
  industries: [
    "Telecom operators",
    "ISPs & broadband providers",
    "Enterprises & corporates",
    "Banking & financial services",
    "Government & PSU networks",
    "Manufacturing & industrial",
    "Retail & distributed sites",
    "Healthcare networks",
    "Smart city projects",
  ],

  whyEyebrow: "Why uConnect",
  whyHeading: { lead: "Why partner", tail: "with us?" },
  whyUs: [
    "Mature 24/7 NOC operations",
    "ITIL-aligned service delivery",
    "PAN India field support",
    "Multi-vendor expertise",
    "Transparent SLA governance",
    "Experienced engineering bench",
    "Carrier-grade processes",
    "Scalable delivery model",
  ],

  ctaHeading: { lead: "Run your network", accent: "with confidence." },
  ctaBody:
    "Whether you need a full 24/7 NOC, on-site field engineering, or SLA-driven operations across a national footprint, uConnect Technologies delivers managed services tailored to your business outcomes.",
};

const ManagedServicesPage = () => <ServiceDetailLayout data={data} />;
export default ManagedServicesPage;
