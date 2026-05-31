import { Users, UserCheck, Briefcase, GraduationCap } from "lucide-react";
import ServiceDetailLayout, { type ServiceDetailData } from "@/components/ServiceDetailLayout";
import heroImg from "@/assets/resource-hero.jpg";

const data: ServiceDetailData = {
  seoTitle: "Resource Management — Tech Staffing | uConnect",
  seoDescription: "Technology-enabled staffing and workforce solutions: RF, FTTH, networking and field engineers on contract, permanent, and managed-team models.",
  path: "/resource-management",
  eyebrow: "Resource Management",
  heroImage: heroImg,
  heroAlt: "Diverse team of telecom and IT engineers collaborating around network blueprints and laptops",
  headlineLead: "Right people.",
  headlineAccent: "Right skills.",
  headlineTail: "Right on time.",
  intro:
    "uConnect Technologies provides technology-enabled workforce solutions — sourcing, deploying, and managing engineering talent across RF, FTTH, switching, IT, and field operations for telecom operators, ISPs, and enterprises.",

  capabilitiesEyebrow: "Our Capabilities",
  capabilitiesHeading: { lead: "Workforce solutions built", tail: "for technology delivery." },
  capabilities: [
    {
      icon: Users,
      title: "Technology Staffing",
      items: [
        "Contract staffing",
        "Permanent placement",
        "Contract-to-hire",
        "Bench resourcing",
        "Volume hiring drives",
      ],
    },
    {
      icon: UserCheck,
      title: "Managed Engineering Teams",
      items: [
        "Dedicated project teams",
        "NOC & SOC teams",
        "Field engineering pods",
        "Project management office",
        "Outcome-based delivery",
      ],
    },
    {
      icon: Briefcase,
      title: "Domain Specializations",
      items: [
        "RF & wireless engineers",
        "FTTH & GPON technicians",
        "Switching & routing experts",
        "Microwave & transmission",
        "Enterprise IT & cloud",
      ],
    },
    {
      icon: GraduationCap,
      title: "Training & Onboarding",
      items: [
        "Pre-deployment training",
        "Vendor-specific certifications",
        "Safety & HSE onboarding",
        "Skill upgrade programs",
        "Continuous performance review",
      ],
    },
  ],

  pillarsEyebrow: "Engagement Models",
  pillarsHeading: { lead: "Flexible engagement", tail: "to match your project." },
  pillars: [
    "Time & material",
    "Fixed price",
    "Dedicated managed teams",
    "Outcome-based delivery",
    "Resource augmentation",
    "Onsite + offsite hybrid",
    "Project-based deployments",
    "Build-operate-transfer",
    "Bulk hiring programs",
  ],

  industriesEyebrow: "Industries",
  industriesHeading: { lead: "Sectors we", tail: "staff for." },
  industries: [
    "Telecom operators",
    "ISPs & broadband providers",
    "Tower companies",
    "OEMs & system integrators",
    "Enterprises & IT services",
    "Smart city projects",
    "Government & PSU",
    "Banking & financial services",
    "Manufacturing & industrial",
  ],

  whyEyebrow: "Why uConnect",
  whyHeading: { lead: "Why partner", tail: "with us?" },
  whyUs: [
    "Large technology talent pool",
    "PAN India deployment reach",
    "Fast turnaround on requisitions",
    "Domain-trained engineers",
    "Compliance & payroll managed",
    "Performance-managed delivery",
    "Scalable team ramp-up",
    "Single accountable partner",
  ],

  ctaHeading: { lead: "Scale your team", accent: "with uConnect." },
  ctaBody:
    "Whether you need a handful of specialists, a dedicated managed team, or hundreds of field engineers across a national rollout, uConnect Technologies provides the right talent at the right time.",
};

const ResourceManagementPage = () => <ServiceDetailLayout data={data} />;
export default ResourceManagementPage;
