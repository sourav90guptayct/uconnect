import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Radio, Wifi, Antenna, Router, Globe, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import networksHero from "@/assets/networks-highway.jpg";
import networksDeployment from "@/assets/networks-station.jpg";
import networksCoverage from "@/assets/networks-coverage.jpg";
import networksInfra from "@/assets/networks-datacenter.png";
import networksEnterprise from "@/assets/networks-enterprise.png";
import networksRail from "@/assets/networks-rail.jpg";
import networksUtility from "@/assets/networks-utility.jpg";
import networksSmartCity from "@/assets/networks-smartcity.png";

const expertise = [
  {
    icon: Radio,
    title: "Point-to-Point (PtP) Wireless Networks",
    items: ["Telecom operators", "Enterprise connectivity", "Smart city infrastructure", "Surveillance networks", "Utility and industrial applications"],
  },
  {
    icon: Wifi,
    title: "Point-to-Multipoint (PtMP) Networks",
    items: ["ISPs/WISPs", "Rural broadband", "Enterprise campuses", "Multi-site business connectivity"],
  },
  {
    icon: Antenna,
    title: "Microwave Network Installation",
    items: ["Alignment & LOS verification", "ODU/IDU integration", "Antenna installation", "RF optimization", "Acceptance testing"],
  },
  {
    icon: Router,
    title: "Switching & Routing Infrastructure",
    items: ["Core switches", "Distribution switches", "Industrial switches", "Enterprise routers", "SD-WAN infrastructure", "Secure network edge solutions"],
  },
];

const oems = [
  "Cambium Networks",
  "RADWIN",
  "Ceragon Networks",
  "Aviat Networks",
  "HFCL",
  "Fortinet",
  "Cisco",
  "Versa Networks",
  "Hewlett Packard Enterprise",
];

const rolloutCapabilities = [
  "Network survey & planning",
  "RF planning & LOS analysis",
  "Site readiness assessment",
  "Installation & commissioning",
  "Antenna alignment",
  "Structured cabling",
  "Power integration",
  "Network configuration",
  "ATP/UAT support",
  "Performance optimization",
  "Preventive & corrective maintenance",
];

const industries = [
  "Telecom operators",
  "ISPs & broadband providers",
  "Enterprises",
  "Smart city projects",
  "Oil & gas",
  "Railways",
  "Surveillance & safe city projects",
  "Manufacturing & industrial facilities",
  "Government infrastructure projects",
];

const whyUs = [
  "Proven multi-vendor deployment expertise",
  "PAN India execution capability",
  "Cross-border project experience in South Asia",
  "Experienced RF & network engineering teams",
  "Faster rollout execution",
  "Scalable deployment model",
  "Carrier-grade implementation standards",
  "Strong field operations and support capability",
];

const regions = ["India", "Nepal", "Bhutan", "Sri Lanka"];

const NetworksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Networks — Telecom Deployment | uConnect"
        description="End-to-end network rollout and deployment services for telecom operators, ISPs, and enterprises across India, Nepal, Bhutan, and Sri Lanka."
        path="/networks"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Networks", path: "/networks" }]}
      />
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20"
          style={{ background: "var(--gradient-hero-soft)" }}
        >
          <div className="absolute inset-0">
            <img
              src={networksHero}
              alt="Telecom microwave tower at sunset across mountain terrain"
              width={1600}
              height={1024}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
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
                Networks
              </div>
              <h1 className="display-headline text-foreground text-5xl sm:text-6xl lg:text-8xl">
                Connectivity At
                <br />
                <span className="text-accent">Scale.</span>{" "}
                <span className="text-foreground/80">Across South Asia.</span>
              </h1>
              <p className="mt-8 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                uConnect Technologies delivers end-to-end network rollout and deployment
                services for telecom operators, ISPs, enterprises, government projects, and
                large-scale connectivity initiatives across India, Nepal, Bhutan, and Sri Lanka.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed">
                  With extensive experience in both licensed and unlicensed spectrum networks,
                  we specialize in designing, deploying, integrating, and supporting carrier-grade
                  communication infrastructure built for scalability, reliability, and long-term
                  operational performance.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative rounded-3xl overflow-hidden border border-border shadow-xl"
              >
                <img
                  src={networksDeployment}
                  alt="Field engineer aligning point-to-point wireless antenna during network deployment"
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </motion.div>
            </div>

            {/* Proof points strip */}
            <div className="mt-14 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[
                { val: "10,000+", label: "Links deployed" },
                { val: "18", label: "Circles operational" },
                { val: "200+", label: "Field engineers" },
                { val: "5", label: "Regional warehouses" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="bg-card border border-border rounded-3xl p-6 lg:p-8"
                >
                  <div className="display-headline text-foreground text-3xl lg:text-5xl">{s.val}</div>
                  <div className="mt-2 text-xs lg:text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Expertise */}
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
                Our Expertise
              </div>
              <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
                Complete deployment and
                <br />
                <span className="text-muted-foreground">integration services.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {expertise.map((item, index) => (
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

            {/* Enterprise Wi-Fi — full width card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-6 bg-card border border-border rounded-3xl overflow-hidden hover:border-accent/40 transition-all duration-500"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-6 lg:p-8">
                  <div className="flex items-start gap-6">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Wifi className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="display-headline text-foreground text-xl lg:text-2xl mb-4">
                        Enterprise & Outdoor Wi-Fi Solutions
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        Deployment of secure and high-performance Wi-Fi infrastructure for:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Campuses", "Warehouses", "Hospitality", "Smart public spaces", "Industrial environments"].map((t) => (
                          <span key={t} className="inline-flex items-center gap-2 text-sm text-foreground/80 bg-muted px-3 py-1.5 rounded-full">
                            <div className="h-1.5 w-1.5 bg-accent rounded-full" />
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative min-h-[220px] md:min-h-full">
                  <img
                    src={networksEnterprise}
                    alt="Modern enterprise campus building with sustainable architecture and green surroundings"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Multi-OEM */}
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
                Vendor Ecosystem
              </div>
              <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
                Multi-OEM
                <br />
                <span className="text-muted-foreground">deployment experience.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-10"
            >
              <p className="text-base lg:text-lg text-foreground/80 leading-relaxed">
                Our engineering teams have hands-on experience working across multiple global
                telecom and networking platforms, enabling seamless multi-vendor deployments
                and interoperability.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {oems.map((oem, index) => (
                <motion.div
                  key={oem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                  className="flex items-center gap-3 bg-muted/60 border border-border rounded-2xl px-4 py-3 text-sm font-medium text-foreground/90"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  {oem}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-12 relative rounded-3xl overflow-hidden border border-border"
            >
              <img
                src={networksInfra}
                alt="Enterprise data center infrastructure with high-density network switching and cabling"
                width={1280}
                height={896}
                loading="lazy"
                className="w-full h-[280px] lg:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                <h3 className="display-headline text-foreground text-2xl lg:text-4xl max-w-2xl">
                  Carrier-grade infrastructure,{" "}
                  <span className="text-accent">built to scale.</span>
                </h3>
              </div>
            </motion.div>
          </div>
        </section>

        {/* End-to-End Rollout */}
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
                Execution
              </div>
              <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
                End-to-end
                <br />
                <span className="text-muted-foreground">rollout capabilities.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {rolloutCapabilities.map((cap, index) => (
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
                Industries
              </div>
              <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
                Sectors we
                <br />
                <span className="text-muted-foreground">support.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                { src: networksRail, label: "Railways & Transit", alt: "Aerial view of a large urban rail terminus connecting city infrastructure" },
                { src: networksUtility, label: "Utilities & Industrial", alt: "Aerial view of a water utility treatment facility with circular tanks" },
                { src: networksSmartCity, label: "Smart Cities", alt: "Illuminated smart city convention complex at dusk with connected buildings" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className="group relative rounded-3xl overflow-hidden border border-border aspect-[4/3]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Sector</div>
                    <div className="display-headline text-foreground text-lg lg:text-xl">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {industries.map((ind, index) => (
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

        {/* Why uConnect */}
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
                Why uConnect
              </div>
              <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
                Why partner
                <br />
                <span className="text-muted-foreground">with us?</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {whyUs.map((reason, index) => (
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

        {/* Regional Coverage */}
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
                Coverage
              </div>
              <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
                Regional
                <br />
                <span className="text-muted-foreground">reach.</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl">
              <div className="grid grid-cols-2 gap-3">
                {regions.map((region, index) => (
                  <motion.div
                    key={region}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06, duration: 0.4 }}
                    className="flex items-center gap-3 bg-muted/60 border border-border rounded-2xl px-5 py-4 text-sm font-medium text-foreground/90"
                  >
                    <MapPin className="h-4 w-4 text-accent shrink-0" />
                    {region}
                  </motion.div>
                ))}
              </div>
            </div>


            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8 text-muted-foreground text-base leading-relaxed max-w-2xl"
            >
              Delivering reliable connectivity solutions for challenging terrains, urban
              environments, enterprise campuses, and large-scale telecom infrastructure projects.
            </motion.p>
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
                Let's Build
                <br />
                <span className="text-accent">Your Network.</span>
              </h2>
              <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Whether you are expanding broadband coverage, upgrading enterprise connectivity,
                deploying wireless backhaul, or building a new telecom infrastructure network,
                uConnect Technologies delivers scalable and reliable rollout services tailored
                to your operational requirements.
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

export default NetworksPage;
