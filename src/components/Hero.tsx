import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Cpu, Award, Users, Building } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
              <Award className="h-6 w-6 text-secondary" />
              <span className="text-secondary font-semibold">
                Trusted Technology Solutions Provider
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-primary-foreground">
                Connecting
              </span>
              <br />
              <span className="text-secondary">
                Technology
              </span>
              <br />
              <span className="text-primary-foreground">
                Powering
              </span>
              <br />
              <span className="text-secondary">
                Innovation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              YouConnect Technologies is your premier partner for comprehensive technology solutions. 
              We connect organizations with cutting-edge infrastructure, digital transformation, and innovative technology services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Contact Us Today
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                <div className="text-sm text-primary-foreground/70">Clients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">2000+</div>
                <div className="text-sm text-primary-foreground/70">Successful Placements</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">99%</div>
                <div className="text-sm text-primary-foreground/70">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-8 shadow-lg">
                <div className="text-center">
                  <div className="bg-secondary rounded-lg p-4 w-fit mx-auto mb-4">
                    <Building className="h-16 w-16 text-secondary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary-foreground">Enterprise Solutions</h3>
                  <p className="text-primary-foreground/80 mb-6">
                    Scalable technology solutions for organizations of all sizes
                  </p>
                  <div className="flex justify-center items-center gap-4">
                    <Users className="h-8 w-8 text-secondary" />
                    <span className="text-secondary font-semibold">24/7 Support</span>
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