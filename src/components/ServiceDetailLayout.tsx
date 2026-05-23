import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Globe, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export type Capability = {
  icon: LucideIcon;
  title: string;
  items: string[];
};

export type ServiceDetailData = {
  seoTitle: string;
  seoDescription: string;
  path: string;
  eyebrow: string;
  heroImage: string;
  heroAlt: string;
  headlineLead: string;
  headlineAccent: string;
  headlineTail: string;
  intro: string;
  capabilitiesEyebrow: string;
  capabilitiesHeading: { lead: string; tail: string };
  capabilities: Capability[];
  pillarsEyebrow: string;
  pillarsHeading: { lead: string; tail: string };
  pillars: string[];
  industriesEyebrow: string;
  industriesHeading: { lead: string; tail: string };
  industries: string[];
  whyEyebrow: string;
  whyHeading: { lead: string; tail: string };
  whyUs: string[];
  ctaHeading: { lead: string; accent: string };
  ctaBody: string;
};

const ServiceDetailLayout = ({ data }: { data: ServiceDetailData }) => {
  return (
    <div className="min-h-screen bg-background">
      <SEO title={data.seoTitle} description={data.seoDescription} path={data.path} />
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20"
          style={{ background: "var(--gradient-hero-soft)" }}
        >
          <div className="absolute inset-0">
            <img
              src={data.heroImage}
              alt={data.heroAlt}
              width={1600}
              height={1024}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/55 to-background/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: "72px 72px",
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-5xl"
            >
              <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-5">
                {data.eyebrow}
              </div>
              <h1 className="display-headline text-foreground text-5xl sm:text-6xl lg:text-8xl">
                {data.headlineLead}
                <br />
                <span className="text-accent">{data.headlineAccent}</span>{" "}
                <span className="text-foreground/80">{data.headlineTail}</span>
              </h1>
              <p className="mt-8 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {data.intro}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 lg:py-24 bg-muted/40">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mb-12 lg:mb-16"
            >
              <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                {data.capabilitiesEyebrow}
              </div>
              <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
                {data.capabilitiesHeading.lead}
                <br />
                <span className="text-muted-foreground">{data.capabilitiesHeading.tail}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {data.capabilities.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                  className="bg-card border border-border rounded-3xl p-6 lg:p-8 hover:border-accent/40 transition-all duration-500"
                >
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="display-headline text-foreground text-xl lg:text-2xl mb-4">
                    {item.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {item.items.map((it, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                        <div className="h-1.5 w-1.5 bg-accent rounded-full flex-shrink-0" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillars / scope */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mb-12 lg:mb-16"
            >
              <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                {data.pillarsEyebrow}
              </div>
              <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
                {data.pillarsHeading.lead}
                <br />
                <span className="text-muted-foreground">{data.pillarsHeading.tail}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.pillars.map((cap, index) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03, duration: 0.4 }}
                  className="flex items-center gap-3 bg-card border border-border rounded-2xl px-5 py-3.5 text-sm text-foreground/80"
                >
                  <div className="h-2 w-2 bg-accent rounded-full shrink-0" />
                  {cap}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-16 lg:py-24 bg-muted/40">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mb-12 lg:mb-16"
            >
              <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                {data.industriesEyebrow}
              </div>
              <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
                {data.industriesHeading.lead}
                <br />
                <span className="text-muted-foreground">{data.industriesHeading.tail}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.industries.map((ind, index) => (
                <motion.div
                  key={ind}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                  className="flex items-center gap-3 bg-muted/60 border border-border rounded-2xl px-5 py-3.5 text-sm font-medium text-foreground/90"
                >
                  <Globe className="h-4 w-4 text-accent shrink-0" />
                  {ind}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mb-12 lg:mb-16"
            >
              <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                {data.whyEyebrow}
              </div>
              <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
                {data.whyHeading.lead}
                <br />
                <span className="text-muted-foreground">{data.whyHeading.tail}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {data.whyUs.map((reason, index) => (
                <motion.div
                  key={reason}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                  className="flex items-start gap-3 bg-card border border-border rounded-2xl p-5 text-sm text-foreground/80"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  {reason}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-muted/40">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
                {data.ctaHeading.lead}
                <br />
                <span className="text-accent">{data.ctaHeading.accent}</span>
              </h2>
              <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {data.ctaBody}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/?section=contact">
                  <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-7 h-12">
                    Contact our team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/?section=contact">
                  <Button size="lg" variant="outline" className="rounded-full px-7 h-12 border-foreground/20 hover:bg-foreground/5">
                    Request a quote
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailLayout;
