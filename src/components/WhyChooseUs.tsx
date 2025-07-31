import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Zap, Shield, Users, Globe, Award } from "lucide-react";
const WhyChooseUs = () => {
  const differentiators = [{
    icon: Trophy,
    title: "SCALE",
    subtitle: "Scale that Delivers",
    stats: ["National Footprint: 25+ offices across the country", "Recruitment Team: 200+ specialized recruiters", "Active Clients: 500+ organizations", "Workforce Managed: 10K+ professionals", "Industries Served: 15+ sectors"]
  }, {
    icon: Zap,
    title: "AGILITY",
    subtitle: "Speed meets Precision",
    stats: ["Rapid Deployment: Up to 100+ hires per month", "Quick Response: 24-hour initial candidate submission", "Flexible Solutions: Adapt to changing requirements", "Streamlined Process: 7-day average placement cycle", "Real-time Tracking: Complete transparency"]
  }, {
    icon: Shield,
    title: "TECHNOLOGY",
    subtitle: "Powered by Innovation",
    stats: ["AI-Powered Matching: Advanced candidate screening", "Digital Platform: Real-time project management", "Data Analytics: Predictive hiring insights", "Mobile App: On-the-go workforce management", "Cloud Infrastructure: Secure and scalable"]
  }];
  const achievements = [{
    icon: Award,
    title: "Industry Recognition",
    description: "Top 10 Staffing Company 2024"
  }, {
    icon: Users,
    title: "Client Satisfaction",
    description: "98% Client Retention Rate"
  }, {
    icon: Globe,
    title: "Market Presence",
    description: "Serving 15+ Industries Nationwide"
  }];
  return <section id="why-choose-us" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">Why Choose Us</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Key Differentiators
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            What sets uConnect Technologies apart in the competitive manpower solutions landscape
          </p>
        </div>

        {/* Main Differentiators */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {differentiators.map((item, index) => <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="h-20 w-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent mb-2">{item.title}</h3>
                  <p className="text-lg text-muted-foreground font-medium">{item.subtitle}</p>
                </div>
                
                <ul className="space-y-4">
                  {item.stats.map((stat, statIndex) => <li key={statIndex} className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{stat}</span>
                    </li>)}
                </ul>
              </CardContent>
            </Card>)}
        </div>

        {/* Team Unity Image Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <img 
            src="/lovable-uploads/e2f0fa8e-0cfd-4a8e-8ab3-e9550216c580.png" 
            alt="Team Unity and Success" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="absolute inset-0 flex items-center justify-center text-primary-foreground text-center p-8">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Trusted by Leading Organizations
              </h3>
              <p className="text-xl opacity-90 max-w-2xl">
                Our commitment to excellence has earned us recognition and trust across industries
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Banner */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 lg:p-12 text-primary-foreground">
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => <div key={index} className="text-center">
                <div className="h-16 w-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold mb-2">{achievement.title}</h4>
                <p className="opacity-90">{achievement.description}</p>
              </div>)}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">50+</div>
            <div className="text-muted-foreground">Clients Served</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">2000+</div>
            <div className="text-muted-foreground">Successful Placements</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">15+</div>
            <div className="text-muted-foreground">Industries Served</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">99%</div>
            <div className="text-muted-foreground">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>;
};
export default WhyChooseUs;