import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Building, Briefcase, Search, Settings, Network } from "lucide-react";
import circuitBoard from "@/assets/circuit-board.jpg";
import teamwork from "@/assets/teamwork.jpg";
import codeTech from "@/assets/code-tech.jpg";
import planning from "@/assets/planning.jpg";
import workforceManagement from "@/assets/workforce-management.jpg";
import infrastructure from "@/assets/infrastructure.jpg";

const Services = () => {
  const services = [
    {
      icon: Network,
      image: circuitBoard,
      title: "Enterprise Networks",
      description: "Comprehensive enterprise networking solutions with advanced security and scalability",
      features: ["SD-WAN implementation", "Network security", "5G network deployment", "WiFi 6/7 infrastructure", "IoT connectivity", "Network automation"]
    },
    {
      icon: Users,
      image: teamwork,
      title: "Professional Managed Services",
      description: "Complete IT operations management with industry-leading expertise and support",
      features: ["24/7 NOC services", "Security operations center", "Application management", "Database administration", "Backup & disaster recovery", "IT service desk"]
    },
    {
      icon: Building,
      image: codeTech,
      title: "Digital Transformation & Cloud",
      description: "End-to-end digital transformation with multi-cloud and hybrid solutions",
      features: ["Cloud migration & optimization", "DevOps & CI/CD", "Microservices architecture", "API management", "Data analytics platforms", "AI/ML implementation"]
    },
    {
      icon: Briefcase,
      image: planning,
      title: "Professional IP & Consulting Services",
      description: "Strategic technology consulting and intellectual property solutions for enterprise growth",
      features: ["Enterprise architecture", "Technology roadmapping", "Solution design", "Integration services", "Performance optimization", "Compliance consulting"]
    },
    {
      icon: Search,
      image: workforceManagement,
      title: "Specialized Resource Management",
      description: "Expert technology professionals and workforce optimization solutions",
      features: ["Cloud architects", "Security specialists", "Network engineers", "DevOps engineers", "Data scientists", "Project managers"]
    },
    {
      icon: Settings,
      image: infrastructure,
      title: "Infrastructure & Deployment Services",
      description: "Complete infrastructure setup, deployment, and maintenance services",
      features: ["Data center setup", "Server deployment", "Network infrastructure", "Security implementation", "Monitoring systems", "Maintenance contracts"]
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
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/30 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="h-12 w-12 bg-primary/90 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <CardHeader>
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