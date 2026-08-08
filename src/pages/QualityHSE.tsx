import { HardHat } from "lucide-react";
import PolicyPage from "@/components/PolicyPage";

const QualityHSE = () => (
  <PolicyPage
    eyebrow="Quality & HSE"
    title="Quality, health, safety and environment"
    intro="Network work happens on towers, rooftops, trenches and live power environments. Our quality and safety commitments exist so that work gets done right the first time, and everyone goes home safe."
    seoTitle="Quality, Health, Safety & Environment | uConnect Technologies"
    seoDescription="uConnect Technologies' approach to installation quality, site safety, field engineer training, waste handling and environmental responsibility on telecom deployments."
    path="/quality-hse"
    icon={HardHat}
    related={[
      { label: "Infra installation", to: "/infra-installation" },
      { label: "Governance", to: "/governance" },
      { label: "Business practices & policies", to: "/business-practices" },
    ]}
    sections={[
      {
        title: "Quality on site",
        body: "Installation quality is verified against the customer's method statement and our own checklists before a site is declared complete. Photographic evidence and as-built records accompany every handover.",
        points: [
          "Pre-installation survey and design validation before mobilisation.",
          "Checklist-based self-audit, then supervisor sign-off per site.",
          "Photo documentation and as-built records at handover.",
        ],
      },
      {
        title: "Product quality and traceability",
        body: "ConnectLH™ equipment and third-party material are inspected on inward receipt at our regional warehouses and dispatched with batch records, so any field issue can be traced back to its source.",
        points: [
          "Inward inspection and rejection handling at five regional warehouses.",
          "Batch traceability from warehouse to installed site.",
          "Warranty and replacement handling coordinated by a single owner.",
        ],
      },
      {
        title: "Site safety",
        body: "Height work, live electrical work and roadside work are treated as high-risk activities with mandatory controls. No crew is permitted to start without the required protective equipment and a safety briefing.",
        points: [
          "Mandatory PPE — harness, helmet, gloves, high-visibility clothing.",
          "Toolbox talk and hazard briefing before each site activity.",
          "Permit and lockout discipline for work near live power.",
        ],
      },
      {
        title: "Competence and training",
        body: "Field engineers are trained and assessed before deployment on tower climbing, splicing, RF alignment and equipment commissioning. Technical screening and refresher training are part of our standard onboarding.",
        points: [
          "Structured technical assessment before field deployment.",
          "Refresher training on safety practice and new equipment.",
          "Supervisor coverage across circles for on-site coaching.",
        ],
      },
      {
        title: "Incident reporting and learning",
        body: "Near-misses and incidents are reported and reviewed, not hidden. Findings feed back into method statements and briefings so the same failure does not repeat on the next site.",
        points: [
          "Same-day reporting of incidents and near-misses.",
          "Root-cause review with corrective action owner and due date.",
          "Lessons circulated to crews across circles.",
        ],
      },
      {
        title: "Environmental responsibility",
        body: "We plan work to limit disturbance at customer sites and in surrounding communities, and we handle packaging, cable offcuts and replaced equipment through appropriate disposal or recycling channels.",
        points: [
          "Segregation of packaging, metal and cable waste at site.",
          "Return of replaced electronic equipment through authorised channels.",
          "Site restoration after trenching and civil work.",
        ],
      },
    ]}
  />
);

export default QualityHSE;
