import { Button } from "@/components/ui/button";
import { CheckCircle, Target, Globe, Award } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Award className="h-5 w-5" />
              <span className="font-semibold">About Us</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              A Globally Trusted Leader in 
              <span className="text-primary"> Manpower Solutions</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              uConnect Technologies is a leading provider of comprehensive manpower services, 
              leveraging our extensive industry knowledge and innovative recruitment platforms to 
              deliver exceptional workforce solutions that drive organizational productivity and growth.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Industry Expertise</h4>
                  <p className="text-muted-foreground">Deep understanding across 15+ industries</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Quality Assurance</h4>
                  <p className="text-muted-foreground">Rigorous screening and verification processes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">24/7 Support</h4>
                  <p className="text-muted-foreground">Round-the-clock assistance for all your needs</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Learn More About Us
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Mission Card */}
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-card-foreground mb-3">Our Mission</h3>
                <p className="text-muted-foreground text-sm">
                  To bridge the gap between talent and opportunity, creating meaningful connections 
                  that drive success for both organizations and professionals.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <Globe className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-bold text-card-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground text-sm">
                  To be the global leader in manpower solutions, transforming how organizations 
                  build and manage their workforce in the digital age.
                </p>
              </div>

              {/* Stats Card */}
              <div className="col-span-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">2017</div>
                    <div className="text-sm opacity-90">Year Established</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">5+</div>
                    <div className="text-sm opacity-90">States</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">100+</div>
                    <div className="text-sm opacity-90">Employees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">2000+</div>
                    <div className="text-sm opacity-90">Successful Placements</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;