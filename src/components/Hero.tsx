import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { ArrowRight, Award, Users, Building } from "lucide-react";
const Hero = () => {
  return <section id="home" className="relative min-h-screen flex items-center" style={{
    background: 'var(--gradient-hero)'
  }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='30 60 15 45 45 45'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Connecting
              <span className="text-accent"> Technology</span>
              <br />
              Powering
              <span className="text-accent"> Innovation</span>
            </h1>
            
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              uConnect Technologies is your premier partner for comprehensive technology solutions. 
              We connect organizations with cutting-edge infrastructure, digital transformation, and 
              innovative technology services to drive productivity, growth, and success across all industries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8" onClick={() => document.getElementById('services')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-primary text-lg px-8 backdrop-blur-sm" onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                Contact Us Today
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Main image card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                <img 
                  src="/lovable-uploads/d75128dc-3c18-4149-aba1-d879dab93472.png" 
                  alt="Technology Innovation" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center text-white">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Award className="h-6 w-6 text-accent" />
                    <span className="text-accent font-semibold text-lg">
                      Trusted Technology Solutions Provider
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Enterprise Solutions</h3>
                  <p className="text-gray-200 mb-4">
                    Scalable technology solutions for organizations of all sizes
                  </p>
                  <div className="flex justify-center items-center gap-4">
                    <Users className="h-8 w-8 text-accent" />
                    <span className="text-accent font-semibold">24/7 Support</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-full p-4">
                <Award className="h-8 w-8" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats - Full Width */}
        <div className="mt-4 pt-3 border-t border-white/20 py-[3px] my-[6px]">
          <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
            <div className="text-center flex-1">
              <div className="text-4xl lg:text-5xl font-bold text-accent mb-3">
                <AnimatedCounter to={50} suffix="+" />
              </div>
              <div className="text-lg text-gray-200">Clients Served</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-4xl lg:text-5xl font-bold text-accent mb-3">
                <AnimatedCounter to={2000} suffix="+" />
              </div>
              <div className="text-lg text-gray-200">Successful Placements</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-4xl lg:text-5xl font-bold text-accent mb-3">
                <AnimatedCounter to={99} suffix="%" />
              </div>
              <div className="text-lg text-gray-200">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;