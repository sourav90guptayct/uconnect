import { Button } from "@/components/ui/button";
import { CheckCircle, Target, Globe, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  return <section id="about" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-in-left">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Award className="h-5 w-5 animate-bounce-gentle" />
              <span className="font-semibold">About Us</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              A Globally Trusted Leader in 
              <span className="text-primary"> Manpower Solutions</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.4s'}}>uConnect Technologies delivers cutting-edge IT, Telecom, NOC Staffing, and Project Management solutions. With a team of visionary engineers and dynamic leaders, we blend innovation with execution—seamlessly connecting people, organizations, and technology.</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 animate-slide-in-left" style={{animationDelay: '0.6s'}}>
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0 animate-bounce-gentle" />
                <div>
                  <h4 className="font-semibold text-foreground">Industry Expertise</h4>
                  <p className="text-muted-foreground">Deep understanding across 15+ industries</p>
                </div>
              </div>
              <div className="flex items-start gap-3 animate-slide-in-left" style={{animationDelay: '0.8s'}}>
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0 animate-bounce-gentle" style={{animationDelay: '1s'}} />
                <div>
                  <h4 className="font-semibold text-foreground">Quality Assurance</h4>
                  <p className="text-muted-foreground">Rigorous screening and verification processes</p>
                </div>
              </div>
              <div className="flex items-start gap-3 animate-slide-in-left" style={{animationDelay: '1s'}}>
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0 animate-bounce-gentle" style={{animationDelay: '1.5s'}} />
                <div>
                  <h4 className="font-semibold text-foreground">24/7 Support</h4>
                  <p className="text-muted-foreground">Round-the-clock assistance for all your needs</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 hover:shadow-lg animate-scale-in" style={{animationDelay: '1.2s'}} onClick={() => navigate('/about')}>
              Learn More About Us
            </Button>
          </div>

          {/* Visual */}
          <div className="relative animate-slide-in-right">
            <div className="grid grid-cols-2 gap-6">
              {/* Team Collaboration Image */}
              <div className="col-span-2 relative rounded-xl overflow-hidden mb-6 animate-scale-in hover:scale-105 transition-transform duration-500" style={{animationDelay: '0.3s'}}>
                <img src="/lovable-uploads/839cd676-3d03-4ff0-941b-4baee8220c7b.png" alt="Team Collaboration" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                  <h3 className="text-2xl font-bold mb-2">Collaborative Excellence</h3>
                  <p className="text-sm opacity-90">Building partnerships that drive innovation</p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                <Target className="h-12 w-12 text-accent mb-4 animate-bounce-gentle" style={{animationDelay: '1.2s'}} />
                <h3 className="text-xl font-bold text-card-foreground mb-3">Our Mission</h3>
                <p className="text-muted-foreground text-sm">
                  To bridge the gap between talent and opportunity, creating meaningful connections 
                  that drive success for both organizations and professionals.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
                <Globe className="h-12 w-12 text-accent mb-4 animate-bounce-gentle" style={{animationDelay: '1.4s'}} />
                <h3 className="text-xl font-bold text-card-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground text-sm">
                  To be the global leader in manpower solutions, transforming how organizations 
                  build and manage their workforce in the digital age.
                </p>
              </div>

              {/* Professional Work Environment */}
              <div className="col-span-2 relative rounded-xl overflow-hidden animate-scale-in hover:scale-105 transition-transform duration-500" style={{animationDelay: '0.9s'}}>
                <img src="/lovable-uploads/8fc1a4ec-6d54-4375-b1f4-6c972127e11e.png" alt="Professional Work Environment" className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
                <div className="absolute inset-0 flex items-center justify-between p-6 text-primary-foreground">
                  <div className="grid grid-cols-4 gap-6 w-full">
                    <div className="text-center animate-fade-in" style={{animationDelay: '1.1s'}}>
                      <div className="text-2xl font-bold mb-1 hover:scale-110 transition-transform duration-300 cursor-pointer">2017</div>
                      <div className="text-xs opacity-90">Year Established</div>
                    </div>
                    <div className="text-center animate-fade-in" style={{animationDelay: '1.3s'}}>
                      <div className="text-2xl font-bold mb-1 hover:scale-110 transition-transform duration-300 cursor-pointer">10+</div>
                      <div className="text-xs opacity-90">States</div>
                    </div>
                    <div className="text-center animate-fade-in" style={{animationDelay: '1.5s'}}>
                      <div className="text-2xl font-bold mb-1 hover:scale-110 transition-transform duration-300 cursor-pointer">100+</div>
                      <div className="text-xs opacity-90">Employees</div>
                    </div>
                    <div className="text-center animate-fade-in" style={{animationDelay: '1.7s'}}>
                      <div className="text-2xl font-bold mb-1 hover:scale-110 transition-transform duration-300 cursor-pointer">2000+</div>
                      <div className="text-xs opacity-90">Successful Placements</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;