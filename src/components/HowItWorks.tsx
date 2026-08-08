import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Survey & design",
    body: "Site survey, RF planning and link budgets before a single bracket is mounted.",
  },
  {
    n: "02",
    title: "Supply",
    body: "ConnectLH™ antennas, PoE, RF and fiber shipped from five regional warehouses.",
  },
  {
    n: "03",
    title: "Deploy",
    body: "Tower, pole and fiber crews commission the link and hand over acceptance reports.",
  },
  {
    n: "04",
    title: "Operate",
    body: "24×7 NOC monitoring, remote management and SLA-backed field response.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
              How it works
            </div>
            <h2 className="display-headline text-foreground text-3xl sm:text-4xl lg:text-5xl">
              From survey to
              <br />
              <span className="text-muted-foreground">steady-state operations.</span>
            </h2>
            <p className="mt-6 text-sm lg:text-base text-muted-foreground leading-relaxed">
              A single accountable partner across the full lifecycle of a
              wireless or fiber link — design, supply, deployment and ongoing
              operations.
            </p>

            <div className="mt-10 space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex gap-5"
                >
                  <div className="display-headline text-accent text-xl lg:text-2xl w-9 flex-shrink-0 pt-0.5">
                    {step.n}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm lg:text-base">
                      {step.title}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {step.body}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/?section=contact" className="inline-block mt-10">
              <Button variant="cta" size="xl">
                Request a network design review
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <figure className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl">
              <img
                src="/lovable-uploads/hero-enterprise-network.webp"
                alt="ConnectLH™ deployment diagram showing IP cameras, IP speaker, 4G LTE backhaul and remote management connected to a CLH951 unit"
                loading="lazy"
                decoding="async"
                width={1376}
                height={768}
                className="w-full h-auto object-contain"
              />
              <figcaption className="px-6 py-4 border-t border-border text-xs text-muted-foreground">
                A typical ConnectLH™ smart-city deployment: surveillance, public
                address and LTE backhaul on one managed link.
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;
