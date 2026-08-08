import { Scale } from "lucide-react";
import PolicyPage from "@/components/PolicyPage";

const BusinessPractices = () => (
  <PolicyPage
    eyebrow="Business Practices"
    title="Business practices and policies"
    intro="How uConnect Technologies works with customers, partners and employees — the commitments that guide our commercial conduct, delivery discipline and workplace culture."
    seoTitle="Business Practices & Policies | uConnect Technologies"
    seoDescription="uConnect Technologies' commitments on ethical conduct, fair dealing, supplier standards, delivery discipline and workplace policies for enterprise telecom projects."
    path="/business-practices"
    icon={Scale}
    related={[
      { label: "Governance", to: "/governance" },
      { label: "Quality, Health, Safety & Environment", to: "/quality-hse" },
      { label: "About uConnect", to: "/about" },
    ]}
    sections={[
      {
        title: "Code of business conduct",
        body: "Every uConnect employee, contractor and field engineer is expected to act with honesty and professionalism on customer sites, in tenders and in day-to-day dealings. We do not tolerate bribery, kickbacks or facilitation payments in any form.",
        points: [
          "No offering or accepting of improper payments, gifts or favours to win or retain business.",
          "Conflicts of interest must be declared to management before an engagement begins.",
          "Accurate, complete records for all commercial transactions and project documentation.",
        ],
      },
      {
        title: "Fair dealing with customers",
        body: "Our proposals state what we can deliver, in what timeframe, with which resources. Scope, assumptions and exclusions are written down before mobilisation so there are no surprises during rollout.",
        points: [
          "Transparent pricing with clearly stated lead times and validity.",
          "Written change control for any variation in scope, quantity or schedule.",
          "Escalation path published at project kickoff, from site lead to account owner.",
        ],
      },
      {
        title: "Supplier and partner standards",
        body: "We source products and subcontracted manpower from vetted partners. Suppliers are expected to mirror our standards on labour practices, site safety and product traceability.",
        points: [
          "Documented onboarding and periodic performance review for every supplier.",
          "Traceability of equipment batches supplied into customer networks.",
          "Subcontracted field teams work under the same safety and conduct rules as our own crews.",
        ],
      },
      {
        title: "Confidentiality and customer data",
        body: "Network designs, site data, IP plans and commercial terms shared with us stay confidential. Access is limited to the delivery team that needs it, and returned or destroyed at the end of an engagement on request.",
        points: [
          "Need-to-know access for project documentation and network records.",
          "Non-disclosure obligations extend to contractors and field engineers.",
          "Customer material is never reused in marketing without written approval.",
        ],
      },
      {
        title: "Workplace policies",
        body: "We operate across 18 telecom circles with a large distributed engineering workforce. Our people policies are built for that reality — clear expectations, fair treatment and equal opportunity regardless of background.",
        points: [
          "Zero tolerance for harassment, discrimination or retaliation.",
          "Merit-based hiring and promotion, with structured technical assessment.",
          "Structured onboarding and continuing technical training for field engineers.",
        ],
      },
      {
        title: "Raising a concern",
        body: "Employees, customers and suppliers can report a suspected breach of these practices directly to management. Reports are reviewed by the leadership team, and we do not permit retaliation against anyone who raises a concern in good faith.",
      },
    ]}
  />
);

export default BusinessPractices;
