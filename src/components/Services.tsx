import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Building, Briefcase, Search, Settings } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Users,
      title: "Managed Services",
      description: "Focus on core competencies as we take charge of your processes",
      features: ["End-to-end process management", "24/7 operational support", "Performance monitoring", "Service level agreements"]
    },
    {
      icon: UserCheck,
      title: "Networks",
      description: "Stay Connected, Stay Ahead - One-stop-shop for all your networking requirements",
      features: ["Network infrastructure", "Connectivity solutions", "Network monitoring", "Maintenance & support"]
    },
    {
      icon: Building,
      title: "Digital Transformation",
      description: "Store, manage & disseminate data & more. Secure Enterprise IT solutions",
      features: ["Cloud migration", "Digital platforms", "Data management", "Enterprise IT solutions"]
    },
    {
      icon: Briefcase,
      title: "IP Services",
      description: "Cutting edge IP & ITeS solutions: Empowering your growth",
      features: ["IP infrastructure", "ITeS solutions", "Technology consulting", "System integration"]
    },
    {
      icon: Search,
      title: "Resource Management",
      description: "Technology enabled staffing so that you focus on your core business",
      features: ["Technology staffing", "Resource allocation", "Skill management", "Workforce optimization"]
    },
    {
      icon: Settings,
      title: "Infra Installation",
      description: "Self support and Guy mast Tower as well as Pole, Tower Erection Service and Pole Erection Service",
      features: ["Self support installations", "Guy mast tower setup", "Pole erection services", "Tower erection services"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Briefcase className="h-5 w-5" />
            <span className="font-semibold">Our Services</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Comprehensive Technology Solutions for
            <span className="text-primary"> Every Industry</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From telecom infrastructure to digital transformation, we provide cutting-edge 
            technology solutions across all domains to help you innovate, implement and succeed.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/30">
              <CardHeader>
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 bg-accent rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-card-foreground">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Every organization is unique. Let us create a tailored technology strategy 
              that aligns perfectly with your specific requirements and business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Discuss Your Needs
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;