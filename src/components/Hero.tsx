import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Cpu, Award, Users, Building } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
              <Award className="h-6 w-6 text-primary" />
              <span className="text-primary font-semibold">
                Trusted Technology Solutions Provider
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-primary">
                Connecting Technology
              </span>
              <br />
              <span className="text-foreground">
                Powering Innovation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              YouConnect Technologies is your premier partner for next-generation technology solutions. 
              We connect organizations with cutting-edge infrastructure and innovative services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-primary text-primary hover:bg-primary/10"
              >
                Contact Us Today
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Clients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2000+</div>
                <div className="text-sm text-muted-foreground">Successful Placements</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="bg-card border rounded-lg p-8 shadow-lg">
                <div className="text-center">
                  <Building className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-primary">Enterprise Solutions</h3>
                  <p className="text-muted-foreground mb-6">
                    Scalable technology solutions for organizations of all sizes
                  </p>
                  <div className="flex justify-center items-center gap-4">
                    <Users className="h-8 w-8 text-primary" />
                    <span className="text-primary font-semibold">24/7 Support</span>
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

export default Hero;