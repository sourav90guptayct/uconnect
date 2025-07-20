import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Building, Briefcase, Search, Cpu, Smartphone, Database, Cloud, Shield, Zap } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Users,
      title: "Staffing Solutions",
      description: "Connect with top talent and find the right professionals for your technology projects",
      features: ["Technical recruiting", "Contract staffing", "Permanent placements", "Team augmentation"]
    },
    {
      icon: UserCheck,
      title: "Technology Consulting",
      description: "Expert guidance to help you make informed technology decisions and strategic planning",
      features: ["Technology assessment", "Strategic planning", "Implementation support", "Best practices"]
    },
    {
      icon: Building,
      title: "Enterprise Solutions",
      description: "Comprehensive technology solutions designed for large-scale enterprise environments",
      features: ["Enterprise architecture", "System integration", "Scalability planning", "Performance optimization"]
    },
    {
      icon: Briefcase,
      title: "Project Management",
      description: "Professional project management services to ensure successful technology implementations",
      features: ["Project planning", "Resource allocation", "Timeline management", "Quality assurance"]
    },
    {
      icon: Search,
      title: "Resource Optimization",
      description: "Optimize your technology resources for maximum efficiency and cost-effectiveness",
      features: ["Resource planning", "Cost optimization", "Performance monitoring", "Capacity planning"]
    },
    {
      icon: Database,
      title: "Data Solutions",
      description: "Comprehensive data management and analytics solutions for modern businesses",
      features: ["Data architecture", "Analytics platforms", "Data migration", "Business intelligence"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-card border px-4 py-2 rounded-full mb-6">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">Our Services</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-primary">
              Technology
            </span>
            <br />
            <span className="text-foreground">
              Solutions & Services
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We provide comprehensive technology solutions and services to help your organization 
            succeed in today's digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 group"
            >
              <CardHeader>
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-card-foreground">
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
                      <div className="h-1.5 w-1.5 bg-primary rounded-full flex-shrink-0" />
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
          <div className="bg-card border rounded-lg p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-primary">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Every organization is unique. Let us create a tailored technology strategy 
              that aligns perfectly with your specific requirements and business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
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
                className="border-primary text-primary hover:bg-primary/10"
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