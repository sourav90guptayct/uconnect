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
  const services = [
    {
      icon: Network,
      image: circuitBoard,
      title: "Enterprise Networks & Connectivity",
      description: "Advanced enterprise networking solutions with next-generation security and scalability",
      features: ["SD-WAN implementation", "5G network deployment", "WiFi 6/7 infrastructure", "Network security", "IoT connectivity", "Network automation", "Edge computing", "MPLS solutions"],
      details: "Our enterprise networking solutions deliver high-performance, secure, and scalable connectivity. We specialize in SD-WAN, 5G deployment, advanced WiFi infrastructure, and comprehensive network security to keep your organization connected and protected."
    },
    {
      icon: Users,
      image: teamwork,
      title: "Professional Managed Services",
      description: "Complete IT operations management with industry-leading expertise and 24/7 support",
      features: ["24/7 NOC services", "Security operations center", "Application management", "Database administration", "Backup & disaster recovery", "IT service desk", "Performance monitoring", "Compliance management"],
      details: "Our managed services provide comprehensive IT operations support, allowing your organization to focus on core business while we handle all technology requirements with expert monitoring, security, and support services."
    },
    {
      icon: Building,
      image: codeTech,
      title: "Digital Transformation & Cloud Services",
      description: "End-to-end digital transformation with multi-cloud, hybrid solutions, and AI integration",
      features: ["Multi-cloud strategy", "Cloud migration & optimization", "DevOps & CI/CD", "Microservices architecture", "API management", "Data analytics platforms", "AI/ML implementation", "Digital workplace"],
      details: "Transform your business with our comprehensive digital transformation services. We help organizations modernize IT infrastructure, implement cloud-native solutions, and leverage AI/ML for competitive advantage."
    },
    {
      icon: Briefcase,
      image: planning,
      title: "Professional Consulting & IP Services",
      description: "Strategic technology consulting, enterprise architecture, and intellectual property solutions",
      features: ["Enterprise architecture", "Technology roadmapping", "Solution design & implementation", "Integration services", "Performance optimization", "Compliance consulting", "Digital strategy", "Innovation consulting"],
      details: "Our professional consulting services provide strategic technology guidance, enterprise architecture design, and comprehensive IP solutions to drive business growth and technological innovation."
    },
    {
      icon: Search,
      image: workforceManagement,
      title: "Specialized Technology Resources",
      description: "Expert technology professionals and specialized workforce solutions for complex projects",
      features: ["Cloud architects & engineers", "Cybersecurity specialists", "Network & infrastructure engineers", "DevOps & automation experts", "Data scientists & analysts", "AI/ML engineers", "Project managers", "Solution architects"],
      details: "Access specialized technology talent and expertise through our comprehensive resource management solutions. We provide skilled professionals across all technology domains to support your most critical projects."
    },
    {
      icon: Settings,
      image: infrastructure,
      title: "Infrastructure & Professional Deployment",
      description: "Complete infrastructure design, deployment, and professional installation services",
      features: ["Data center design & setup", "Server & storage deployment", "Network infrastructure installation", "Security system implementation", "Monitoring & automation systems", "Professional installation services", "Maintenance contracts", "24/7 support"],
      details: "Professional infrastructure services including data center setup, enterprise server deployment, comprehensive network installation, and ongoing maintenance. We provide complete infrastructure lifecycle management."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
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
      <Footer />
    </div>
  );
};

export default ServicesPage;