import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Zap, Shield, Users, Globe, Award } from "lucide-react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const differentiators = [
    {
      icon: Trophy,
      title: "SCALE",
      subtitle: "Scale that Delivers",
      stats: [
        "National Footprint: 25+ offices across the country",
        "Recruitment Team: 200+ specialized recruiters",
        "Active Clients: 500+ organizations",
        "Workforce Managed: 10K+ professionals",
        "Industries Served: 15+ sectors"
      ]
    },
    {
      icon: Zap,
      title: "AGILITY",
      subtitle: "Speed meets Precision",
      stats: [
        "Rapid Deployment: Up to 100+ hires per month",
        "Quick Response: 24-hour initial candidate submission",
        "Flexible Solutions: Adapt to changing requirements",
        "Streamlined Process: 7-day average placement cycle",
        "Real-time Tracking: Complete transparency"
      ]
    },
    {
      icon: Shield,
      title: "TECHNOLOGY",
      subtitle: "Powered by Innovation",
      stats: [
        "AI-Powered Matching: Advanced candidate screening",
        "Digital Platform: Real-time project management",
        "Data Analytics: Predictive hiring insights",
        "Mobile App: On-the-go workforce management",
        "Cloud Infrastructure: Secure and scalable"
      ]
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Top 10 Staffing Company 2024"
    },
    {
      icon: Users,
      title: "Client Satisfaction",
      description: "98% Client Retention Rate"
    },
    {
      icon: Globe,
      title: "Market Presence",
      description: "Serving 15+ Industries Nationwide"
    }
  ];

  const stats = [
    { value: "50+", label: "Clients Served" },
    { value: "2000+", label: "Successful Placements" },
    { value: "15+", label: "Industries Served" },
    { value: "99%", label: "Client Satisfaction" }
  ];

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">Why Choose Us</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Key Differentiators
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            What sets uConnect Technologies apart in the competitive manpower solutions landscape
          </p>
        </motion.div>

        {/* Main Differentiators */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full hover:shadow-xl transition-all duration-300 border-border hover:border-accent/30">
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <motion.div 
                      className="h-16 w-16 sm:h-20 sm:w-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-accent/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <item.icon className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-accent mb-2">{item.title}</h3>
                    <p className="text-base sm:text-lg text-muted-foreground font-medium">{item.subtitle}</p>
                  </div>
                  
                  <ul className="space-y-3 sm:space-y-4">
                    {item.stats.map((stat, statIndex) => (
                      <li key={statIndex} className="flex items-start gap-3">
                        <div className="h-2 w-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm sm:text-base">{stat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Unity Image Section */}
        <motion.div 
          className="relative rounded-2xl overflow-hidden mb-10 sm:mb-12"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/lovable-uploads/e2f0fa8e-0cfd-4a8e-8ab3-e9550216c580.png" 
            alt="Team Unity and Success - uConnect Technologies workforce" 
            className="w-full h-52 sm:h-64 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="absolute inset-0 flex items-center justify-center text-primary-foreground text-center p-6 sm:p-8">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                Trusted by Leading Organizations
              </h3>
              <p className="text-base sm:text-xl opacity-90 max-w-2xl">
                Our commitment to excellence has earned us recognition and trust across industries
              </p>
            </div>
          </div>
        </motion.div>

        {/* Achievements Banner */}
        <motion.div 
          className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 sm:p-8 lg:p-12 text-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-14 w-14 sm:h-16 sm:w-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <achievement.icon className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{achievement.title}</h4>
                <p className="opacity-90 text-sm sm:text-base">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm sm:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;