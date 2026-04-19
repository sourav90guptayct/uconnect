import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, Briefcase, Search, Settings, ArrowLeft, Network } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import circuitBoard from "@/assets/circuit-board.jpg";
import teamwork from "@/assets/teamwork.jpg";
import codeTech from "@/assets/code-tech.jpg";
import planning from "@/assets/planning.jpg";
import workforceManagement from "@/assets/workforce-management.jpg";
import infrastructure from "@/assets/infrastructure.jpg";
const ServicesPage = () => {
  const services = [{
    icon: Network,
    image: "/lovable-uploads/4404a0c7-dfe8-4d6c-a763-8ddc0c228f40.webp",
    title: "Networks",
    description: "Stay Connected, Stay Ahead - One-stop-shop for all your networking requirements",
    features: ["Network infrastructure", "Connectivity solutions", "Network monitoring", "Maintenance & support"],
    details: "Our comprehensive networking solutions ensure your organization stays connected and ahead of the competition. We provide end-to-end networking services from infrastructure setup to ongoing maintenance and support."
  }, {
    icon: Users,
    image: "/lovable-uploads/115872b6-8d21-43a0-b6ed-a612375446ba.webp",
    title: "Managed Services",
    description: "Focus on core competencies as we take charge of your processes",
    features: ["End-to-end process management", "24/7 operational support", "Performance monitoring", "Service level agreements"],
    details: "Our managed services provide comprehensive process management solutions that allow your organization to focus on core business activities while we handle all operational requirements with expert support and monitoring."
  }, {
    icon: Building,
    image: "/lovable-uploads/3a00d3ac-8dd2-40fb-b5bb-bf516bd60ff2.webp",
    title: "Digital Transformation",
    description: "Store, manage & disseminate data & more. Secure Enterprise IT solutions",
    features: ["Cloud migration", "Digital platforms", "Data management", "Enterprise IT solutions"],
    details: "Transform your business with our comprehensive digital transformation services. We help organizations modernize their IT infrastructure, migrate to cloud platforms, and implement secure enterprise solutions."
  }, {
    icon: Briefcase,
    image: "/lovable-uploads/2d02a26b-70d0-4eb8-98e3-04f141cb0bff.webp",
    title: "IP Services",
    description: "Cutting edge IP & ITeS solutions: Empowering your growth",
    features: ["IP infrastructure", "ITeS solutions", "Technology consulting", "System integration"],
    details: "Our IP services deliver cutting-edge intellectual property and IT-enabled services that empower business growth through innovative technology consulting and seamless system integration."
  }, {
    icon: Search,
    image: "/lovable-uploads/55b3aa6c-9ace-4e67-9a9d-05f41feefab1.png",
    title: "Resource Management",
    description: "Technology enabled staffing so that you focus on your core business",
    features: ["Technology staffing", "Resource allocation", "Skill management", "Workforce optimization"],
    details: "Optimize your workforce with our technology-enabled resource management solutions. We provide skilled technology professionals and efficient resource allocation to support your business objectives."
  }, {
    icon: Settings,
    image: "/lovable-uploads/36d182be-8602-4bb3-9554-331999f9b0ed.webp",
    title: "Infra Installation",
    description: "Self support and Guy mast Tower as well as Pole, Tower Erection Service and Pole Erection Service",
    features: ["Self support installations", "Guy mast tower setup", "Pole erection services", "Tower erection services"],
    details: "Complete infrastructure installation services including self-supporting structures, guy mast towers, and comprehensive pole and tower erection services for telecommunications and other industries."
  }];
  return <div className="min-h-screen bg-background">
      <Header />
      {/* Header */}
      <div className="relative bg-primary text-primary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/lovable-uploads/2c094ed9-72c7-4355-a7aa-38ea78d08bb1.webp" alt="Professional Technology Services" className="w-full h-full object-cover opacity-20" />
          
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            From telecom infrastructure and IT services to digital transformation and branded product lines — 
            uConnect Technologies delivers end-to-end solutions across Telecom, IT, and Enterprise verticals.
          </p>
        </div>
      </div>

      {/* Hero Image Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden">
            
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {services.map((service, index) => <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/30 overflow-hidden">
                 <div className="relative h-48 overflow-hidden">
                   <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                   <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                   <div className="absolute bottom-4 left-4">
                     <div className="h-12 w-12 bg-accent/90 rounded-lg flex items-center justify-center backdrop-blur-sm">
                       <service.icon className="h-6 w-6 text-accent-foreground" />
                     </div>
                   </div>
                 </div>
                 <CardHeader>
                   <CardTitle className="text-xl text-card-foreground group-hover:text-accent transition-colors">
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
                      {service.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 bg-accent rounded-full flex-shrink-0" />
                          {feature}
                        </li>)}
                    </ul>
                  </div>
                </CardContent>
              </Card>)}
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
      <Footer />
    </div>;
};
export default ServicesPage;