import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, Briefcase, Search, Settings, Network } from "lucide-react";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    { icon: Network, image: "/lovable-uploads/87e1e778-3b68-41c8-bb46-6e22dae156ed.png", title: "Networks", description: "Stay Connected, Stay Ahead - One-stop-shop for all your networking requirements", features: ["Network infrastructure", "Connectivity solutions", "Network monitoring", "Maintenance & support"] },
    { icon: Users, image: "/lovable-uploads/f3b2f370-c817-48b6-85e7-4f7ea79dcbcc.png", title: "Managed Services", description: "Focus on core competencies as we take charge of your processes", features: ["End-to-end process management", "24/7 operational support", "Performance monitoring", "Service level agreements"] },
    { icon: Building, image: "/lovable-uploads/8a3919a0-25ca-4ddc-8b40-b666e6f34784.png", title: "Digital Transformation", description: "Store, manage & disseminate data & more. Secure Enterprise IT solutions", features: ["Cloud migration", "Digital platforms", "Data management", "Enterprise IT solutions"] },
    { icon: Briefcase, image: "/lovable-uploads/3452b9b3-2558-42b0-a053-f0efdc7efb72.png", title: "IP Services", description: "Cutting edge IP & ITeS solutions: Empowering your growth", features: ["IP infrastructure", "ITeS solutions", "Technology consulting", "System integration"] },
    { icon: Search, image: "/lovable-uploads/4cf29a0e-c8b2-46f9-a586-5e1c9216bfe6.png", title: "Resource Management", description: "Technology enabled staffing so that you focus on your core business", features: ["Technology staffing", "Resource allocation", "Skill management", "Workforce optimization"] },
    { icon: Settings, image: "/lovable-uploads/32edb691-2f39-4492-8903-2eef4fa3641a.png", title: "Infra Installation", description: "Self support and Guy mast Tower as well as Pole, Tower Erection Service", features: ["Self support installations", "Guy mast tower setup", "Pole erection services", "Tower erection services"] },
  ];

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
            <Briefcase className="h-4 w-4" />
            <span className="font-semibold text-sm">Our Services</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Comprehensive Technology Solutions for
            <span className="text-gradient"> Every Industry</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From telecom infrastructure to digital transformation, we provide cutting-edge technology solutions across all domains.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group hover:premium-shadow-hover transition-all duration-500 border-border hover:border-accent/30 overflow-hidden rounded-2xl hover:-translate-y-2 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="h-11 w-11 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/30">
                      <service.icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-card-foreground group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 bg-accent rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
