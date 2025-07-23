import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, Briefcase, Search, Settings, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  const services = [
    {
      icon: Users,
      title: "Managed Services",
      description: "Focus on core competencies as we take charge of your processes",
      features: ["End-to-end process management", "24/7 operational support", "Performance monitoring", "Service level agreements"],
      details: "Our managed services provide comprehensive process management solutions that allow your organization to focus on core business activities while we handle all operational requirements with expert support and monitoring."
    },
    {
      icon: Building,
      title: "Networks",
      description: "Stay Connected, Stay Ahead - One-stop-shop for all your networking requirements",
      features: ["Network infrastructure", "Connectivity solutions", "Network monitoring", "Maintenance & support"],
      details: "Our comprehensive networking solutions ensure your organization stays connected and ahead of the competition. We provide end-to-end networking services from infrastructure setup to ongoing maintenance and support."
    },
    {
      icon: Settings,
      title: "Infra Installation",
      description: "Self support and Guy mast Tower as well as Pole, Tower Erection Service and Pole Erection Service",
      features: ["Self support installations", "Guy mast tower setup", "Pole erection services", "Tower erection services"],
      details: "Complete infrastructure installation services including self-supporting structures, guy mast towers, and comprehensive pole and tower erection services for telecommunications and other industries."
    },
    {
      icon: Search,
      title: "Resource Management",
      description: "Technology enabled staffing so that you focus on your core business",
      features: ["Technology staffing", "Resource allocation", "Skill management", "Workforce optimization"],
      details: "Optimize your workforce with our technology-enabled resource management solutions. We provide skilled technology professionals and efficient resource allocation to support your business objectives."
    },
    {
      icon: Briefcase,
      title: "Digital Transformation",
      description: "Store, manage & disseminate data & more. Secure Enterprise IT solutions",
      features: ["Cloud migration", "Digital platforms", "Data management", "Enterprise IT solutions"],
      details: "Transform your business with our comprehensive digital transformation services. We help organizations modernize their IT infrastructure, migrate to cloud platforms, and implement secure enterprise solutions."
    },
    {
      icon: Briefcase,
      title: "IP Services",
      description: "Cutting edge IP & ITeS solutions: Empowering your growth",
      features: ["IP infrastructure", "ITeS solutions", "Technology consulting", "System integration"],
      details: "Our IP services deliver cutting-edge intellectual property and IT-enabled services that empower business growth through innovative technology consulting and seamless system integration."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground">
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            uConnect Technologies offers comprehensive technology solutions across all domains. 
            From network management to infrastructure installation, we provide the expertise you need to succeed.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
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
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {service.details}
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2 text-card-foreground">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 bg-accent rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4 text-card-foreground">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Contact us today to discuss how our services can help transform your business 
                and achieve your technology goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/?section=contact">
                  <Button size="lg">
                    Get in Touch
                  </Button>
                </Link>
                <Link to="/?section=contact">
                  <Button variant="outline" size="lg">
                    Request a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;