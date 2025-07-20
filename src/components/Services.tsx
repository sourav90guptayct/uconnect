import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Building, Briefcase, Search, Settings } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Users,
      title: "Managed Staffing Services",
      description: "Focus on core competencies as we take charge of your workforce management processes",
      features: ["End-to-end workforce management", "Performance monitoring", "Compliance management", "24/7 operational support"]
    },
    {
      icon: UserCheck,
      title: "Network Recruitment",
      description: "Stay Connected, Stay Ahead - One-stop-shop for all your talent acquisition requirements",
      features: ["Pan-India recruitment network", "Multi-channel sourcing", "Candidate database access", "Real-time hiring updates"]
    },
    {
      icon: Building,
      title: "Digital HR Transformation",
      description: "Store, manage & disseminate workforce data & more. Secure Enterprise HR solutions",
      features: ["HRIS implementation", "Digital onboarding", "Cloud-based HR platforms", "Data analytics & reporting"]
    },
    {
      icon: Briefcase,
      title: "Integrated Placement Services",
      description: "Cutting edge placement & talent solutions: Empowering your organizational growth",
      features: ["Strategic talent placement", "Leadership hiring", "Skill-based matching", "Career progression planning"]
    },
    {
      icon: Search,
      title: "Resource Management",
      description: "Technology enabled staffing so that you focus on your core business operations",
      features: ["Resource allocation", "Skill inventory management", "Workforce optimization", "Cost-effective solutions"]
    },
    {
      icon: Settings,
      title: "Enterprise Workforce Solutions",
      description: "Driving organizational growth forward - Powering your enterprise workforce needs",
      features: ["Large-scale hiring", "Workforce transformation", "Change management", "Scalable solutions"]
    },
    {
      icon: UserCheck,
      title: "Talent Process Outsourcing",
      description: "Leverage our expertise to enhance recruitment efficiency & candidate satisfaction",
      features: ["RPO services", "Screening & assessment", "Interview coordination", "Candidate experience management"]
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
            Comprehensive Manpower Solutions for
            <span className="text-primary"> Every Organization</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From startups to enterprises, we provide tailored workforce solutions across all industries 
            to help you build the perfect team for your business objectives.
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
              Every organization is unique. Let us create a tailored manpower strategy 
              that aligns perfectly with your specific requirements and goals.
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