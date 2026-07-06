import { Construction, HardHat, Cable, Wrench } from "lucide-react";
import ServiceDetailLayout, { type ServiceDetailData } from "@/components/ServiceDetailLayout";
import heroImg from "@/assets/infra-hero.jpg";

const data: ServiceDetailData = {
  seoTitle: "Telecom Infrastructure Installation | uConnect",
  seoDescription: "End-to-end telecom infra installation — BTS, towers, CCTV surveillance and enterprise networks — delivered by certified Tier-1 engineers.",
  path: "/infra-installation",
  eyebrow: "Infra Installation",
  heroImage: heroImg,
  heroAlt: "Telecom riggers in safety harnesses installing antennas on a steel lattice tower at sunrise",
  headlineLead: "Build the",
  headlineAccent: "infrastructure.",
  headlineTail: "Power the network.",
  intro:
    "From greenfield tower erection and pole installation to civil works, structured cabling and antenna mounting, uConnect Technologies executes end-to-end site builds with carrier-grade safety, quality, and turnaround discipline.",

  capabilitiesEyebrow: "Our Capabilities",
  capabilitiesHeading: { lead: "Full-stack site build", tail: "and installation services." },
  capabilities: [
    {
      icon: Construction,
      title: "Tower & Pole Erection",
      items: [
        "GBT, RTT and monopole installation",
        "Smart pole & street furniture",
        "Foundation & civil works",
        "Earthing & lightning protection",
        "Tower strengthening & retrofits",
      ],
    },
    {
      icon: HardHat,
      title: "Site Acquisition & Civil Works",
      items: [
        "Site survey & feasibility",
        "Civil foundation",
        "Shelter installation",
        "Cable trays & ducting",
        "Site fencing & boundary works",
      ],
    },
    {
      icon: Cable,
      title: "Structured Cabling & Power",
      items: [
        "Indoor & outdoor structured cabling",
        "Fiber & copper trunking",
        "Power and DG integration",
        "Battery bank installation",
        "ACDB/DCDB & rectifier work",
      ],
    },
    {
      icon: Wrench,
      title: "Antenna & Equipment Mounting",
      items: [
        "Antenna installation & alignment",
        "ODU/IDU mounting",
        "RF cabling and connectorization",
        "Equipment rack integration",
        "Commissioning & acceptance testing",
      ],
    },
  ],

  pillarsEyebrow: "Execution",
  pillarsHeading: { lead: "End-to-end deployment", tail: "execution." },
  pillars: [
    "Site survey & TSSR",
    "Civil & foundation works",
    "Tower & pole erection",
    "Antenna installation & alignment",
    "Structured cabling",
    "Power & earthing",
    "RF and microwave commissioning",
    "Integration with NMS",
    "ATP & UAT support",
    "Site documentation & handover",
    "Preventive & corrective maintenance",
    "HSE compliance",
  ],

  industriesEyebrow: "Industries",
  industriesHeading: { lead: "Sectors we", tail: "support." },
  industries: [
    "Telecom operators",
    "Tower companies",
    "ISPs & broadband providers",
    "Smart city projects",
    "Railways & metros",
    "Oil & gas",
    "Defence & strategic networks",
    "Government infrastructure",
    "Industrial campuses",
  ],

  whyEyebrow: "Why uConnect",
  whyHeading: { lead: "Why partner", tail: "with us?" },
  whyUs: [
    "Proven greenfield rollout experience",
    "PAN India deployment teams",
    "Trained climbers & riggers",
    "Strict HSE & quality compliance",
    "Faster site turnaround",
    "Multi-OEM equipment expertise",
    "Scalable execution capacity",
    "Single point of accountability",
  ],

  ctaHeading: { lead: "Build your sites", accent: "with uConnect." },
  ctaBody:
    "Whether you are rolling out new telecom sites, upgrading existing infrastructure, or building enterprise and smart city deployments, uConnect Technologies delivers reliable, safe, and on-time installation services at scale.",
};

const InfraInstallationPage = () => <ServiceDetailLayout data={data} />;
export default InfraInstallationPage;
