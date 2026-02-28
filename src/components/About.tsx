import { Button } from "@/components/ui/button";
import { CheckCircle, Target, Globe, Award } from "lucide-react";
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
              <span className="font-semibold text-sm">About Us</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              A Globally Trusted Leader in
              <span className="text-gradient"> Manpower Solutions</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              uConnect Technologies delivers cutting-edge IT, Telecom, NOC Staffing, and Project Management solutions. With a team of visionary engineers and dynamic leaders, we blend innovation with execution.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { title: "Industry Expertise", desc: "Deep understanding across 15+ industries" },
                { title: "Quality Assurance", desc: "Rigorous screening and verification processes" },
                { title: "24/7 Support", desc: "Round-the-clock assistance for all your needs" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 px-8" onClick={() => navigate('/about')}>
              Learn More About Us
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
                <img src="/lovable-uploads/839cd676-3d03-4ff0-941b-4baee8220c7b.png" alt="Team Collaboration" className="w-full h-52 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-2xl font-bold mb-1">Collaborative Excellence</h3>
                  <p className="text-sm text-white/70">Building partnerships that drive innovation</p>
                </div>
              </div>

              {[
                { icon: Target, title: "Our Mission", desc: "Bridging the gap between talent and opportunity, creating meaningful connections that drive success." },
                { icon: Globe, title: "Our Vision", desc: "To be the global leader in manpower solutions, transforming workforce building in the digital age." },
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
                      { val: "100+", label: "Employees" },
                      { val: "2000+", label: "Placements" },
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
