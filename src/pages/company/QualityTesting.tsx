import { FlaskConical } from "lucide-react";
import PolicyPage from "@/components/PolicyPage";

const QualityTesting = () => (
  <PolicyPage
    eyebrow="Quality & Testing"
    title="Tested before it reaches your site"
    intro="Every ConnectLH™ product line goes through defined validation and incoming inspection so field teams can install with confidence."
    seoTitle="Quality & Testing | uConnect Technologies"
    seoDescription="Product validation, incoming inspection, RF and environmental testing and field feedback loops for ConnectLH™ products by uConnect Technologies."
    path="/company/quality-testing"
    icon={FlaskConical}
    related={[
      { label: "Manufacturing", to: "/company/manufacturing" },
      { label: "Quality, Health, Safety & Environment", to: "/quality-hse" },
      { label: "Support", to: "/support" },
    ]}
    sections={[
      {
        title: "Design validation",
        body: "New products are validated against their datasheet claims before launch.",
        points: [
          "RF performance checks for antennas and RF assemblies.",
          "Power and load verification for PoE and power products.",
          "Environmental and ingress checks for outdoor products.",
        ],
      },
      {
        title: "Incoming inspection",
        body: "Batches are sampled on arrival for visual, dimensional and functional checks before entering stock.",
      },
      {
        title: "Field feedback",
        body: "Our deployment teams report field issues directly to engineering. Findings feed corrective actions with production partners and updates to documentation.",
      },
    ]}
  />
);

export default QualityTesting;
