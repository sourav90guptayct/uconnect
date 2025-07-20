import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Building, Briefcase, Search, Settings } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Users,
      title: "Temporary Staffing",
      description: "Flexible workforce solutions for short-term projects and seasonal demands",
      features: ["Quick deployment", "Scalable teams", "Cost-effective", "Quality assured"]
    },
    {
      icon: UserCheck,
      title: "Permanent Recruitment",
      description: "End-to-end recruitment services to find the perfect permanent employees",
      features: ["Executive search", "Background verification", "Skills assessment", "Cultural fit analysis"]
    },
    {
      icon: Building,
      title: "Contract Staffing",
      description: "Long-term contract professionals for specialized projects and roles",
      features: ["Specialized skills", "Project-based", "Risk mitigation", "Compliance management"]
    },
    {
      icon: Briefcase,
      title: "Executive Search",
      description: "Senior-level recruitment for leadership and strategic positions",
      features: ["C-level recruitment", "Board positions", "Confidential search", "Global reach"]
    },
    {
      icon: Search,
      title: "Volume Hiring",
      description: "Large-scale recruitment solutions for rapid expansion and bulk hiring",
      features: ["Mass recruitment", "Quick turnaround", "Streamlined process", "Quality control"]
    },
    {
      icon: Settings,
      title: "HR Consulting",
      description: "Strategic HR advisory services to optimize your workforce management",
      features: ["HR strategy", "Process optimization", "Compliance advisory", "Training programs"]
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
            <p className="text-muted-foreground mb-6 text-lg">
              Every organization is unique. Let us create a tailored manpower strategy 
              that aligns perfectly with your specific requirements and goals.
            </p>
            
            {/* uconnect Academy & Jobs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-primary">UC</span>
                </div>
                <h4 className="font-semibold text-card-foreground">uconnect Academy</h4>
                <p className="text-sm text-muted-foreground">Skill Development</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-primary">UJ</span>
                </div>
                <h4 className="font-semibold text-card-foreground">uconnect Jobs</h4>
                <p className="text-sm text-muted-foreground">Career Opportunities</p>
              </div>
            </div>
            
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