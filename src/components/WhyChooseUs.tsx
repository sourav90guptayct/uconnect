import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Zap, Shield, Users, Globe, Award } from "lucide-react";
const WhyChooseUs = () => {
  const differentiators = [{
    icon: Trophy,
    title: "ENTERPRISE SCALE",
    subtitle: "Professional Solutions at Scale",
    stats: ["National Network Coverage: 25+ major cities", "Professional Team: 200+ certified engineers", "Enterprise Clients: 500+ organizations", "Network Infrastructure: 10K+ managed endpoints", "Technology Domains: 15+ specializations"]
  }, {
    icon: Zap,
    title: "RAPID DEPLOYMENT",
    subtitle: "Speed meets Professional Excellence",
    stats: ["Quick Implementation: 48-hour network deployment", "Expert Response: 24/7 professional support", "Flexible Solutions: Scalable technology architectures", "Streamlined Process: 5-day average project initiation", "Real-time Monitoring: Complete visibility and control"]
  }, {
    icon: Shield,
    title: "ADVANCED TECHNOLOGY",
    subtitle: "Innovation-Driven Solutions",
    stats: ["AI-Powered Networks: Intelligent traffic optimization", "Cloud-Native Platforms: Modern infrastructure solutions", "Security Excellence: Advanced threat protection", "Professional Tools: Enterprise-grade management systems", "Certified Infrastructure: Industry-compliant deployments"]
  }];
  const achievements = [{
    icon: Award,
    title: "Industry Recognition",
    description: "Top 10 Technology Services Provider 2024"
  }, {
    icon: Users,
    title: "Client Satisfaction",
    description: "99% Network Uptime Guarantee"
  }, {
    icon: Globe,
    title: "Market Presence",
    description: "Enterprise Networks in 15+ Industries"
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
            What sets uConnect Technologies apart in providing professional technology services and enterprise networks
          </p>
        </div>

        {/* Main Differentiators */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {differentiators.map((item, index) => <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="h-20 w-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">{item.title}</h3>
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

        {/* Achievements Banner */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 lg:p-12 text-primary-foreground">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Trusted by Leading Organizations
            </h3>
            <p className="text-xl opacity-90">
              Our professional technology services and network solutions have earned recognition across enterprise sectors
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => <div key={index} className="text-center">
                <div className="h-16 w-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold mb-2">{achievement.title}</h4>
                <p className="opacity-90">{achievement.description}</p>
              </div>)}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">150+</div>
            <div className="text-muted-foreground">Enterprise Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Network Projects</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">Technology Domains</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">99%</div>
            <div className="text-muted-foreground">Network Uptime</div>
          </div>
        </div>
      </div>
    </section>;
};
export default WhyChooseUs;