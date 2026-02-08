import { Button } from "@/components/ui/button";
import { CheckCircle, Target, Globe, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6"
              variants={itemVariants}
            >
              <Award className="h-5 w-5" />
              <span className="font-semibold">About Us</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight"
              variants={itemVariants}
            >
              A Globally Trusted Leader in 
              <span className="text-primary"> Manpower Solutions</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
              variants={itemVariants}
            >
              uConnect Technologies delivers cutting-edge IT, Telecom, NOC Staffing, and Project Management solutions. With a team of visionary engineers and dynamic leaders, we blend innovation with execution—seamlessly connecting people, organizations, and technology.
            </motion.p>

            <motion.div className="space-y-4 mb-8" variants={containerVariants}>
              {[
                { title: "Industry Expertise", desc: "Deep understanding across 15+ industries" },
                { title: "Quality Assurance", desc: "Rigorous screening and verification processes" },
                { title: "24/7 Support", desc: "Round-the-clock assistance for all your needs" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3 group"
                  variants={itemVariants}
                >
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 group" 
                onClick={() => navigate('/about')}
              >
                Learn More About Us
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Team Collaboration Image */}
              <motion.div 
                className="col-span-2 relative rounded-xl overflow-hidden mb-4 sm:mb-6 group"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/lovable-uploads/839cd676-3d03-4ff0-941b-4baee8220c7b.png" 
                  alt="Team Collaboration - Professional workforce solutions" 
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1">Collaborative Excellence</h3>
                  <p className="text-sm opacity-90">Building partnerships that drive innovation</p>
                </div>
              </motion.div>

              {/* Mission Card */}
              <motion.div 
                className="bg-card border border-border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift"
                whileHover={{ borderColor: "hsl(var(--accent) / 0.3)" }}
              >
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2">Our Mission</h3>
                <p className="text-muted-foreground text-sm">
                  To bridge the gap between talent and opportunity, creating meaningful connections 
                  that drive success for both organizations and professionals.
                </p>
              </motion.div>

              {/* Vision Card */}
              <motion.div 
                className="bg-card border border-border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift"
                whileHover={{ borderColor: "hsl(var(--accent) / 0.3)" }}
              >
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2">Our Vision</h3>
                <p className="text-muted-foreground text-sm">
                  To be the global leader in manpower solutions, transforming how organizations 
                  build and manage their workforce in the digital age.
                </p>
              </motion.div>

              {/* Professional Work Environment */}
              <div className="col-span-2 relative rounded-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/8fc1a4ec-6d54-4375-b1f4-6c972127e11e.png" 
                  alt="Professional Work Environment - Modern workplace" 
                  className="w-full h-28 sm:h-32 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 text-primary-foreground">
                  <div className="grid grid-cols-4 gap-2 sm:gap-6 w-full text-center">
                    {[
                      { value: "2017", label: "Established" },
                      { value: "10+", label: "States" },
                      { value: "100+", label: "Employees" },
                      { value: "2000+", label: "Placements" }
                    ].map((stat, index) => (
                      <div key={index}>
                        <div className="text-lg sm:text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-[10px] sm:text-xs opacity-90">{stat.label}</div>
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