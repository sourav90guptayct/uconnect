import { Button } from "@/components/ui/button";
import { CheckCircle, Target, Globe, Award, TrendingUp, Handshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

const About = () => {
  const navigate = useNavigate();
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Award className="h-4 w-4" />
              <span className="font-semibold text-sm">About uConnect Technologies</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              India's Trusted Partner for
              <span className="text-gradient"> Enterprise Technology</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Since 2017, uConnect Technologies has been at the forefront of enterprise IT, Telecom Infrastructure, 
              NOC Operations, and Strategic Workforce Management. Our pan-India operations serve Fortune 500 companies, 
              leading telecom operators, and government organizations with mission-critical solutions.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: TrendingUp, title: "Proven Track Record", desc: "10,000+ professionals deployed across 15+ industries with 98% client retention rate" },
                { icon: Handshake, title: "Strategic Partnerships", desc: "Long-term partnerships with India's top telecom operators, IT companies, and enterprises" },
                { icon: CheckCircle, title: "Operational Excellence", desc: "ISO-compliant processes with 24/7 NOC support and real-time project management" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 px-8" onClick={() => navigate('/about')}>
              Discover Our Story
            </Button>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 relative rounded-2xl overflow-hidden mb-2 premium-shadow">
                <img src="/lovable-uploads/839cd676-3d03-4ff0-941b-4baee8220c7b.png" alt="Enterprise Team" className="w-full h-52 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-2xl font-bold mb-1">Pan-India Operations</h3>
                  <p className="text-sm text-white/70">Delivering excellence across 10+ states</p>
                </div>
              </div>

              {[
                { icon: Target, title: "Our Mission", desc: "To empower enterprises with world-class technology infrastructure and the right talent to drive digital transformation at scale." },
                { icon: Globe, title: "Our Vision", desc: "To be India's most trusted technology solutions partner — known for operational excellence, innovation, and lasting impact." },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:premium-shadow-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <card.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}

              <div className="col-span-2 relative rounded-2xl overflow-hidden premium-shadow">
                <img src="/lovable-uploads/8fc1a4ec-6d54-4375-b1f4-6c972127e11e.png" alt="Professional Work Environment" className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/70" />
                <div className="absolute inset-0 flex items-center p-6 text-white">
                  <div className="grid grid-cols-4 gap-6 w-full">
                    {[
                      { val: "2017", label: "Established" },
                      { val: "10+", label: "States" },
                      { val: "500+", label: "Clients" },
                      { val: "10K+", label: "Deployed" },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl font-bold mb-1">{s.val}</div>
                        <div className="text-xs text-white/70 uppercase tracking-wider">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default About;
