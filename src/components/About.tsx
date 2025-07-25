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
              Leading Provider of 
              <span className="text-primary">Professional Technology Services & Networks</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              uConnect Technologies is a premier technology solutions provider, specializing in enterprise networks, 
              professional IT services, and comprehensive infrastructure solutions. We deliver cutting-edge technology 
              services across telecommunications, cloud computing, cybersecurity, and digital transformation initiatives.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Enterprise Network Solutions</h4>
                  <p className="text-muted-foreground">Advanced networking, 5G, SD-WAN, and IoT connectivity</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Professional IT Services</h4>
                  <p className="text-muted-foreground">Cloud transformation, cybersecurity, and managed services</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">24/7 Professional Support</h4>
                  <p className="text-muted-foreground">Expert technical support and monitoring services</p>
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
                  To deliver innovative technology solutions and professional services that empower 
                  organizations to achieve digital transformation and operational excellence.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <Globe className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-bold text-card-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground text-sm">
                  To be the premier provider of enterprise technology solutions, networks, and 
                  professional services that drive innovation and business success globally.
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
                    <div className="text-3xl font-bold mb-1">500+</div>
                    <div className="text-sm opacity-90">Network Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">200+</div>
                    <div className="text-sm opacity-90">IT Professionals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">150+</div>
                    <div className="text-sm opacity-90">Enterprise Clients</div>
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