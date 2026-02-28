import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Zap, Shield, Users, Globe, Award } from "lucide-react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const differentiators = [
    { icon: Trophy, title: "SCALE", subtitle: "Scale that Delivers", stats: ["National Footprint: 25+ offices across the country", "Recruitment Team: 200+ specialized recruiters", "Active Clients: 500+ organizations", "Workforce Managed: 10K+ professionals", "Industries Served: 15+ sectors"] },
    { icon: Zap, title: "AGILITY", subtitle: "Speed meets Precision", stats: ["Rapid Deployment: Up to 100+ hires per month", "Quick Response: 24-hour initial candidate submission", "Flexible Solutions: Adapt to changing requirements", "Streamlined Process: 7-day average placement cycle", "Real-time Tracking: Complete transparency"] },
    { icon: Shield, title: "TECHNOLOGY", subtitle: "Powered by Innovation", stats: ["AI-Powered Matching: Advanced candidate screening", "Digital Platform: Real-time project management", "Data Analytics: Predictive hiring insights", "Mobile App: On-the-go workforce management", "Cloud Infrastructure: Secure and scalable"] },
  ];

  const achievements = [
    { icon: Award, title: "Industry Recognition", description: "Top 10 Staffing Company 2024" },
    { icon: Users, title: "Client Satisfaction", description: "98% Client Retention Rate" },
    { icon: Globe, title: "Market Presence", description: "Serving 15+ Industries Nationwide" },
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
            <span className="font-semibold text-sm">Why Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Key <span className="text-gradient">Differentiators</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            What sets uConnect Technologies apart in the competitive manpower solutions landscape
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
                        <div className="h-2 w-2 bg-accent rounded-full mt-2 flex-shrink-0" />
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
              <h3 className="text-3xl lg:text-5xl font-bold mb-4">Trusted by Leading Organizations</h3>
              <p className="text-xl text-white/70 max-w-2xl">Our commitment to excellence has earned us recognition and trust across industries</p>
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

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "50+", label: "Clients Served" },
            { val: "2000+", label: "Successful Placements" },
            { val: "15+", label: "Industries Served" },
            { val: "99%", label: "Client Satisfaction" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-gradient mb-2">{stat.val}</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
