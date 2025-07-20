import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Cpu, Award, Users, Building } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 uconnect-tech-pattern opacity-30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-secondary/20 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-accent/20 animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Floating tech icons */}
            <div className="flex justify-center lg:justify-start space-x-4 mb-8">
              <div className="uconnect-card p-3 uconnect-orange-glow">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <div className="uconnect-card p-3 uconnect-orange-glow" style={{animationDelay: '1s'}}>
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <div className="uconnect-card p-3 uconnect-orange-glow" style={{animationDelay: '2s'}}>
                <Zap className="h-6 w-6 text-accent" />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
              <Award className="h-6 w-6 text-accent" />
              <span className="text-accent font-semibold uconnect-orange-text">
                Trusted Technology Solutions Provider
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="uconnect-orange-gradient bg-clip-text text-transparent animate-pulse-gold">
                Connecting Technology
              </span>
              <br />
              <span className="uconnect-orange-text text-foreground">
                Powering Innovation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              YouConnect Technologies is your premier partner for <span className="text-secondary uconnect-orange-text">next-generation</span> technology solutions. 
              We connect organizations with cutting-edge infrastructure and innovative services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-primary/80 text-primary-foreground uconnect-border group transition-all duration-300 hover:uconnect-orange-glow"
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-secondary text-secondary hover:bg-secondary/10 uconnect-border transition-all duration-300"
              >
                Contact Us Today
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2 uconnect-orange-text">50+</div>
                <div className="text-sm text-muted-foreground">Clients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2 uconnect-orange-text">2000+</div>
                <div className="text-sm text-muted-foreground">Successful Placements</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2 uconnect-orange-text">99%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Main card */}
              <div className="uconnect-card p-8">
                <div className="text-center">
                  <Building className="h-16 w-16 text-accent mx-auto mb-4 uconnect-orange-glow" />
                  <h3 className="text-2xl font-bold mb-4 uconnect-orange-text text-primary">Enterprise Solutions</h3>
                  <p className="text-muted-foreground mb-6">
                    Scalable technology solutions for organizations of all sizes
                  </p>
                  <div className="flex justify-center items-center gap-4">
                    <Users className="h-8 w-8 text-accent uconnect-orange-glow" />
                    <span className="text-accent font-semibold uconnect-orange-text">24/7 Support</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-full p-4 uconnect-orange-glow animate-float">
                <Award className="h-8 w-8" />
              </div>
              <div className="absolute -bottom-4 -left-4 uconnect-card rounded-full p-4 uconnect-border animate-float" style={{animationDelay: '3s'}}>
                <Users className="h-8 w-8 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;