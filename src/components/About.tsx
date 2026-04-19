import { Button } from "@/components/ui/button";
import { CheckCircle, Target, Globe, TrendingUp, Handshake, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  return (
    <>
      {/* Editorial hero — only on /about */}
      {isAboutPage && (
        <section
          className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20"
          style={{ background: "var(--gradient-hero-soft)" }}
        >
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
                About uConnect
              </div>
              <h1 className="display-headline text-foreground text-5xl sm:text-6xl lg:text-8xl">
                Engineered for trust.
                <br />
                <span className="text-accent">Built for India.</span>
              </h1>
              <p className="mt-8 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Since 2017, uConnect Technologies has been at the forefront of enterprise IT,
                Telecom Infrastructure, NOC Operations and Strategic Workforce Management — serving
                top companies, leading telecom operators and government organizations.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      <section id="about" className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          {!isAboutPage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mb-14 lg:mb-20"
            >
              <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                About uConnect
              </div>
              <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
                India's trusted partner
                <br />
                <span className="text-muted-foreground">for enterprise technology.</span>
              </h2>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-10">
                Pan-India operations serving top companies, leading telecom operators and
                government organizations with mission-critical solutions.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  { icon: TrendingUp, title: "Proven track record", desc: "1,000+ deployments across 15+ industries with 98% client retention." },
                  { icon: Handshake, title: "Strategic partnerships", desc: "Long-term partnerships with India's top telecom operators and enterprises." },
                  { icon: CheckCircle, title: "Operational excellence", desc: "ISO-compliant processes with 24/7 NOC support and real-time project management." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="flex items-start gap-5 pb-6 border-b border-border last:border-0"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-lg mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {!isAboutPage && (
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 px-7"
                  onClick={() => navigate("/about")}
                >
                  Discover our story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </motion.div>

            {/* Visual collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="col-span-2 relative rounded-3xl overflow-hidden">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/lovable-uploads/839cd676-3d03-4ff0-941b-4baee8220c7b.webp"
                  alt="Pan-India enterprise team"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-background">
                  <div className="display-headline text-3xl lg:text-4xl">Pan-India</div>
                  <div className="text-sm text-background/70 mt-1">Operations across 10+ states</div>
                </div>
              </div>

              {[
                { icon: Target, title: "Our mission", desc: "Empower enterprises with world-class technology infrastructure and the right talent to drive digital transformation at scale." },
                { icon: Globe, title: "Our vision", desc: "Be India's most trusted technology solutions partner — known for operational excellence, innovation and lasting impact." },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                  className="bg-muted/50 border border-border rounded-3xl p-6 lg:p-7"
                >
                  <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <card.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="display-headline text-foreground text-xl lg:text-2xl mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}

              <div className="col-span-2 bg-foreground rounded-3xl p-8 lg:p-10">
                <div className="grid grid-cols-4 gap-6">
                  {[
                    { val: "2017", label: "Established" },
                    { val: "10+", label: "States" },
                    { val: "50+", label: "Clients" },
                    { val: "1000+", label: "Deployments" },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="display-headline text-background text-2xl lg:text-4xl">{s.val}</div>
                      <div className="text-xs text-background/60 uppercase tracking-wider mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
