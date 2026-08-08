import { Landmark } from "lucide-react";
import PolicyPage from "@/components/PolicyPage";

const Governance = () => (
  <PolicyPage
    eyebrow="Governance"
    title="How uConnect is governed"
    intro="Clear ownership, documented decision rights and disciplined project oversight — the structures that let us run large multi-circle deployments predictably since 2017."
    seoTitle="Corporate Governance | uConnect Technologies"
    seoDescription="Leadership structure, decision rights, project governance, risk management and financial discipline at uConnect Technologies, a product and services integrator."
    path="/governance"
    icon={Landmark}
    related={[
      { label: "Business practices & policies", to: "/business-practices" },
      { label: "Quality, Health, Safety & Environment", to: "/quality-hse" },
      { label: "Managed services", to: "/managed-services" },
    ]}
    sections={[
      {
        title: "Leadership and decision rights",
        body: "The leadership team owns strategy, commercial approvals and customer relationships. Delivery authority is delegated to circle and project leads within defined limits, so decisions are made close to the site while accountability stays traceable.",
        points: [
          "Defined approval thresholds for pricing, procurement and resourcing.",
          "Named account owner and delivery owner for every active engagement.",
          "Monthly leadership review of delivery performance and customer feedback.",
        ],
      },
      {
        title: "Project governance",
        body: "Every deployment runs on a documented governance rhythm agreed with the customer at kickoff — reporting cadence, review forums, acceptance criteria and escalation ladder.",
        points: [
          "Weekly progress reporting with milestone and quality status.",
          "Joint review forums with the customer's project management office.",
          "Formal acceptance and handover documentation before closure.",
        ],
      },
      {
        title: "Risk management",
        body: "Delivery risks — permits, material lead times, site access, weather windows, resource availability — are logged, owned and reviewed rather than absorbed silently. Mitigations are agreed with the customer where they affect schedule.",
        points: [
          "Risk register maintained per project with named owners.",
          "Early-warning reporting on lead-time and site-access risks.",
          "Business continuity planning across five regional warehouses.",
        ],
      },
      {
        title: "Financial discipline",
        body: "Commercial commitments are made against costed plans, and project margins are tracked through delivery. Invoicing follows agreed milestones, with documentation attached so customer verification is straightforward.",
        points: [
          "Costed baselines before commitment; variance tracked monthly.",
          "Milestone-based invoicing supported by acceptance records.",
          "Independent bookkeeping and statutory compliance in India.",
        ],
      },
      {
        title: "Information and access control",
        body: "Internal systems that hold customer or employee data operate on role-based access. Administrative rights are granted deliberately, reviewed periodically and revoked on role change or exit.",
        points: [
          "Role-based access to project, HR and candidate records.",
          "Periodic review and removal of dormant administrative accounts.",
          "Documented offboarding checklist covering system and site access.",
        ],
      },
      {
        title: "Oversight of partners",
        body: "Subcontractors and suppliers operating under uConnect contracts fall within our governance scope. Their performance, safety record and compliance documentation are reviewed on the same cycle as our own teams.",
      },
    ]}
  />
);

export default Governance;
