import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Building, Briefcase, Search, ArrowRight, CheckCircle, Globe, Award, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ServicesPage = () => {
  const services = [
    {
      icon: Users,
      title: "Managed Services",
      subtitle: "Focus on core competencies as we take charge of your processes",
      description: "Comprehensive end-to-end process management solutions that allow you to focus on your core business while we handle your operational requirements with precision and efficiency.",
      features: [
        "End-to-end process management",
        "24/7 operational support",
        "Performance monitoring",
        "Service level agreements",
        "Quality assurance",
        "Cost optimization"
      ],
      benefits: [
        "Reduced operational costs",
        "Improved efficiency",
        "Scalable solutions",
        "Expert management"
      ]
    },
    {
      icon: UserCheck,
      title: "Networks",
      subtitle: "Stay Connected, Stay Ahead - One-stop-shop for all your networking requirements",
      description: "Complete networking solutions from infrastructure setup to maintenance, ensuring your organization stays connected with reliable, high-performance network systems.",
      features: [
        "Network infrastructure design",
        "Connectivity solutions",
        "Network monitoring",
        "Maintenance & support",
        "Security implementation",
        "Performance optimization"
      ],
      benefits: [
        "Reliable connectivity",
        "Enhanced security",
        "Scalable infrastructure",
        "24/7 monitoring"
      ]
    },
    {
      icon: Building,
      title: "Digital Transformation",
      subtitle: "Store, manage & disseminate data & more. Secure Enterprise IT solutions",
      description: "Comprehensive digital transformation services that modernize your business processes, enhance data management, and provide secure enterprise IT solutions for the digital age.",
      features: [
        "Cloud migration",
        "Digital platforms",
        "Data management",
        "Enterprise IT solutions",
        "Legacy system modernization",
        "Business process automation"
      ],
      benefits: [
        "Improved agility",
        "Enhanced security",
        "Cost efficiency",
        "Future-ready technology"
      ]
    },
    {
      icon: Briefcase,
      title: "IP Services",
      subtitle: "Cutting edge IP & ITeS solutions: Empowering your growth",
      description: "Advanced IP infrastructure and Information Technology enabled Services (ITeS) solutions designed to empower your business growth through innovative technology implementations.",
      features: [
        "IP infrastructure",
        "ITeS solutions",
        "Technology consulting",
        "System integration",
        "Application development",
        "Technical support"
      ],
      benefits: [
        "Technology leadership",
        "Competitive advantage",
        "Innovation enablement",
        "Expert guidance"
      ]
    },
    {
      icon: Search,
      title: "Resource Management",
      subtitle: "Technology enabled staffing so that you focus on your core business",
      description: "Strategic resource management services that leverage technology to provide skilled professionals and workforce optimization, allowing you to concentrate on your core business objectives.",
      features: [
        "Technology staffing",
        "Resource allocation",
        "Skill management",
        "Workforce optimization",
        "Talent acquisition",
        "Performance management"
      ],
      benefits: [
        "Skilled workforce",
        "Optimized costs",
        "Flexible scaling",
        "Quality delivery"
      ]
    }
  ];

  const valuePropositions = [
    {
      icon: Globe,
      title: "Pan India Presence",
      description: "Breaking geographical boundaries, YouConnect establishes itself as a market leader, no matter where you are."
    },
    {
      icon: Users,
      title: "Customer-centric approach",
      description: "Our solutions are designed with your specific needs in mind, ensuring maximum value and satisfaction."
    },
    {
      icon: Award,
      title: "Operational excellence",
      description: "Delivering consistent, high-quality services through proven methodologies and best practices."
    },
    {
      icon: Zap,
      title: "Technical excellence",
      description: "Leveraging cutting-edge technology and expert knowledge to deliver superior solutions."
    },
    {
      icon: CheckCircle,
      title: "Ability to scale",
      description: "Flexible solutions that grow with your business, from startup to enterprise level."
    },
    {
      icon: Building,
      title: "CoE for cutting-edge technology",
      description: "Center of Excellence driving innovation and implementing the latest technological advancements."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Our <span className="text-accent">Services</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive technology solutions designed to empower businesses and register growth. 
            We think along you to deliver cutting-edge technological solutions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Comprehensive Technology Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From managed services to digital transformation, we provide end-to-end solutions 
              for your technology needs.
            </p>
          </div>

          <div className="grid gap-12">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden border-border hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-8">
                  <CardHeader className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl text-card-foreground mb-2">
                          {service.title}
                        </CardTitle>
                        <Badge variant="outline" className="text-primary border-primary">
                          {service.subtitle}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-lg leading-relaxed">
                      {service.description}
                    </CardDescription>
                    
                    <div>
                      <h4 className="font-semibold text-lg mb-4 text-card-foreground">Key Benefits:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="bg-muted/30 p-8">
                    <h4 className="font-semibold text-lg mb-6 text-card-foreground">Service Features:</h4>
                    <div className="space-y-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <ArrowRight className="h-4 w-4 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Value <span className="text-primary">Proposition</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              What sets us apart in delivering exceptional technology solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuePropositions.map((prop, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <prop.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">
                    {prop.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {prop.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-card border border-border rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-card-foreground">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how our comprehensive technology solutions can empower your business growth 
              and drive digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '/#contact'}
              >
                Contact Our Experts
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;