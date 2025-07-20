import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Building, Briefcase, Search, Cpu, Smartphone, Database, Cloud, Shield, Zap } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Cpu,
      title: "Neural Networks",
      description: "Advanced networking solutions with AI-powered optimization and quantum-level security protocols",
      features: ["AI-optimized infrastructure", "Quantum encryption", "Self-healing networks", "Predictive maintenance"],
      gradient: "from-primary to-accent"
    },
    {
      icon: UserCheck,
      title: "Cyber Workforce",
      description: "Technology-enabled staffing with neural interface compatibility and biometric verification",
      features: ["Biometric screening", "Skill-AI matching", "Real-time performance", "Virtual collaboration"],
      gradient: "from-secondary to-primary"
    },
    {
      icon: Building,
      title: "Digital Transformation",
      description: "Quantum-powered enterprise solutions with holographic data visualization and neural processing",
      features: ["Quantum computing", "Holographic displays", "Neural processing", "Autonomous systems"],
      gradient: "from-accent to-secondary"
    },
    {
      icon: Briefcase,
      title: "Cyber-IP Services",
      description: "Next-gen intellectual property solutions with blockchain verification and quantum encryption",
      features: ["Blockchain IP protection", "Quantum encryption", "AI patent analysis", "Digital rights management"],
      gradient: "from-primary to-secondary"
    },
    {
      icon: Search,
      title: "Resource Matrix",
      description: "AI-driven resource allocation with predictive analytics and autonomous workforce management",
      features: ["Predictive analytics", "Autonomous allocation", "Neural matching", "Real-time optimization"],
      gradient: "from-secondary to-accent"
    },
    {
      icon: Shield,
      title: "Fortress Security",
      description: "Military-grade cybersecurity with quantum barriers and neural threat detection systems",
      features: ["Quantum barriers", "Neural threat detection", "Autonomous response", "Biometric access"],
      gradient: "from-accent to-primary"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 uconnect-tech-pattern opacity-20"></div>
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-secondary/10 blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 uconnect-card px-4 py-2 rounded-full mb-6">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary uconnect-orange-text">Our Services</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="uconnect-orange-gradient bg-clip-text text-transparent uconnect-orange-text">
              Advanced Technology
            </span>
            <br />
            <span className="text-foreground uconnect-orange-text">
              Solutions
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unleash the future with our comprehensive suite of <span className="text-accent uconnect-orange-text">cutting-edge</span> technology solutions 
            across all domains to help you innovate and succeed.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="uconnect-card hover:uconnect-orange-glow transition-all duration-500 group"
              style={{animationDelay: `${index * 0.5}s`}}
            >
              <CardHeader>
                <div className={`h-16 w-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:uconnect-orange-glow transition-all duration-300`}>
                  <service.icon className="h-8 w-8 text-background" />
                </div>
                <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors uconnect-orange-text">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      <div className="h-1.5 w-1.5 bg-accent rounded-full flex-shrink-0 uconnect-orange-glow" />
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
          <div className="uconnect-card p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 uconnect-orange-text text-primary">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Every organization is unique. Let us create a <span className="text-secondary uconnect-orange-text">tailored technology strategy</span> 
              that aligns perfectly with your specific requirements and business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/80 text-primary-foreground uconnect-border hover:uconnect-orange-glow transition-all duration-300"
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
                className="border-secondary text-secondary hover:bg-secondary/10 uconnect-border transition-all duration-300"
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