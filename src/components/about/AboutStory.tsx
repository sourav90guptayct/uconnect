import { motion } from "framer-motion";
import { Milestone, Users, Network, Shield, Layers, Award } from "lucide-react";

const timeline = [
  { year: "2017", title: "Founded in India", desc: "uConnect Technologies established with a focus on telecom infrastructure and managed IT services for carrier-grade networks." },
  { year: "2019", title: "Pan-India operations", desc: "Expanded field operations across multiple telecom circles with dedicated Tier-1 engineering teams." },
  { year: "2021", title: "ConnectLH™ product line", desc: "Launched in-house product brand covering sector antennas, FTTH equipment, PoE solutions, and RF infrastructure." },
  { year: "2023", title: "10,000+ Links deployed", desc: "Crossed the 10,000 link-deployment milestone across customer networks nationwide." },
  { year: "2025", title: "18 circles, 5 warehouses", desc: "Scaled to 200+ Tier-1 engineers, 18 active telecom circles, and 5 regional warehouses for rapid project mobilization." },
];

const capabilities = [
  { icon: Network, title: "Telecom Infrastructure", desc: "BTS installation, microwave links, fiber backhaul, antenna alignment, and RF surveys for tower operators and carriers." },
  { icon: Layers, title: "Managed IT Services", desc: "NOC operations, network monitoring, structured cabling, and enterprise IT support across multi-site deployments." },
  { icon: Shield, title: "Quality & Safety", desc: "OEM-certified engineers, documented SOPs, and strict EHS compliance across every field deployment." },
  { icon: Users, title: "Strategic Workforce", desc: "Skilled manpower deployment for telecom, IT, and infrastructure projects — onboarded, trained, and managed end-to-end." },
];

const industries = [
  "Tier-1 Telecom Carriers", "Tower Infrastructure Operators", "ISPs & FTTH Providers",
  "Enterprise IT", "Government & PSU", "Defence Communications",
  "Banking & Financial Services", "Smart City Projects", "Data Centers",
];

const AboutStory = () => {
  return (
    <>
      {/* Our Story / Timeline */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
              Our Journey
            </div>
            <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-6xl">
              From a single team in 2017 to{" "}
              <span className="text-muted-foreground">India-wide telecom delivery.</span>
            </h2>
          </motion.div>

          <div className="relative max-w-4xl">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" aria-hidden />
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative flex gap-6 pb-10 last:pb-0"
              >
                <div className="relative z-10 flex-shrink-0 h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                  <Milestone className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <div className="text-accent font-semibold text-sm mb-1">{t.year}</div>
                  <h3 className="display-headline text-foreground text-2xl mb-2">{t.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
              What We Do
            </div>
            <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-6xl">
              Four practices.{" "}
              <span className="text-muted-foreground">One delivery standard.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-muted/40 border border-border rounded-3xl p-7 lg:p-8"
              >
                <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                  <c.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="display-headline text-foreground text-xl lg:text-2xl mb-3">
                  {c.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries / Why uConnect */}
      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                Industries We Serve
              </div>
              <h2 className="display-headline text-background text-4xl sm:text-5xl lg:text-6xl mb-8">
                Trusted across the{" "}
                <span className="text-accent">connected economy.</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <span
                    key={ind}
                    className="px-4 py-2 rounded-full border border-background/20 text-sm text-background/80"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-6"
            >
              {[
                { icon: Award, title: "Carrier-approved", desc: "Vendor-registered with India's top Tier-1 telecom operators and OEMs." },
                { icon: Network, title: "5 regional warehouses", desc: "Spares and equipment positioned for rapid mobilization on time-critical rollouts." },
                { icon: Shield, title: "Single accountable partner", desc: "Products, deployment, and managed services under one roof — fewer handoffs, faster outcomes." },
              ].map((b, i) => (
                <div
                  key={b.title}
                  className="flex gap-5 pb-6 border-b border-background/10 last:border-0"
                >
                  <div className="h-12 w-12 rounded-2xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <b.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-background text-lg mb-1">{b.title}</h4>
                    <p className="text-background/70 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutStory;
