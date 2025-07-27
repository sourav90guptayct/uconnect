import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Building } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center" style={{ background: 'var(--gradient-hero)' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='30 60 15 45 45 45'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center min-h-[80vh]">
          {/* Content */}
          <div className="text-white space-y-8 lg:pr-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/20 rounded-lg backdrop-blur-sm">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <span className="text-accent font-semibold text-lg tracking-wide">
                Trusted Technology Solutions Provider
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="block">Connecting</span>
              <span className="text-accent block"> Technology</span>
              <span className="block">Powering</span>
              <span className="text-accent block"> Innovation</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl">
              uConnect Technologies is your premier partner for comprehensive technology solutions. 
              We connect organizations with cutting-edge infrastructure, digital transformation, and 
              innovative technology services to drive productivity, growth, and success across all industries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary text-lg px-8 py-4 h-auto backdrop-blur-sm transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Us Today
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-accent mb-1">50+</div>
                <div className="text-sm lg:text-base text-gray-300">Clients Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-accent mb-1">2000+</div>
                <div className="text-sm lg:text-base text-gray-300">Successful Placements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-accent mb-1">99%</div>
                <div className="text-sm lg:text-base text-gray-300">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-full max-w-md xl:max-w-lg">
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 xl:p-10 border border-white/20 shadow-2xl relative overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-3xl"></div>
                
                <div className="text-center text-white relative z-10">
                  <div className="bg-accent/20 rounded-2xl p-4 inline-block mb-6">
                    <Building className="h-16 w-16 xl:h-20 xl:w-20 text-accent" />
                  </div>
                  <h3 className="text-2xl xl:text-3xl font-bold mb-4">Enterprise Solutions</h3>
                  <p className="text-gray-200 mb-8 leading-relaxed">
                    Scalable technology solutions for organizations of all sizes
                  </p>
                  <div className="flex justify-center items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Users className="h-8 w-8 text-accent" />
                    <span className="text-accent font-semibold text-lg">24/7 Support</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-accent text-accent-foreground rounded-2xl p-4 shadow-lg animate-pulse">
                <Award className="h-8 w-8" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute top-1/2 -right-8 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
              <div className="absolute -top-8 left-1/2 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;