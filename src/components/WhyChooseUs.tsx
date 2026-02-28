import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Zap, Shield, Users, Globe, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const differentiators = [
    { icon: Trophy, title: "SCALE", subtitle: "National Infrastructure", stats: ["Pan-India footprint across 10+ states", "200+ specialized recruiters & engineers", "500+ active enterprise clients", "10,000+ professionals managed", "15+ industries served"] },
    { icon: Zap, title: "AGILITY", subtitle: "Speed & Precision", stats: ["100+ deployments per month capacity", "4-hour enterprise inquiry response", "7-day average placement cycle", "Real-time project tracking dashboard", "Flexible engagement models"] },
    { icon: Shield, title: "TECHNOLOGY", subtitle: "Innovation-Driven", stats: ["AI-powered candidate matching engine", "Proprietary workforce management platform", "Predictive analytics & reporting", "Cloud-native infrastructure", "ISO 27001 compliant operations"] },
  ];

  const achievements = [
    { icon: Award, title: "Industry Recognition", description: "Top 10 Technology Staffing Company 2024" },
    { icon: Users, title: "Client Retention", description: "98% Year-over-Year Client Retention" },
    { icon: Globe, title: "National Presence", description: "Operations Across 10+ Indian States" },
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
            <Trophy className="h-4 w-4" />
            <span className="font-semibold text-sm">Why Leading Enterprises Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            The uConnect <span className="text-gradient">Advantage</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Built for scale, engineered for reliability — discover why India's top organizations 
            trust uConnect Technologies for their most critical operations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-7 mb-20">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card className="group hover:premium-shadow-hover transition-all duration-500 border-border rounded-2xl hover:-translate-y-1 h-full">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="h-16 w-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-gradient mb-1">{item.title}</h3>
                    <p className="text-muted-foreground font-medium">{item.subtitle}</p>
                  </div>
                  <ul className="space-y-3.5">
                    {item.stats.map((stat, statIndex) => (
                      <li key={statIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{stat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden mb-12"
        >
          <img src="/lovable-uploads/e2f0fa8e-0cfd-4a8e-8ab3-e9550216c580.png" alt="Team Unity" className="w-full h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-accent/60" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
            <div>
              <h3 className="text-3xl lg:text-5xl font-bold mb-4">Powering India's Digital Infrastructure</h3>
              <p className="text-xl text-white/70 max-w-2xl">From telecom towers to enterprise IT — we build the backbone of India's connected future</p>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-3xl p-8 lg:p-12 text-primary-foreground"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <achievement.icon className="h-7 w-7 text-accent" />
                </div>
                <h4 className="text-xl font-bold mb-2">{achievement.title}</h4>
                <p className="text-primary-foreground/70">{achievement.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
