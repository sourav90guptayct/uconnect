import { Building2, Globe, Shield, Zap, Users, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
const Clients = () => {
  const clients = [{
    name: "Airtel",
    logo: "/clients/airtel.jpg",
    sector: "Telecommunications",
    description: "Leading telecom provider with innovative connectivity solutions"
  }, {
    name: "Reliance Jio",
    logo: "/clients/jio.png",
    sector: "Telecommunications",
    description: "Digital services and 4G/5G network solutions"
  }, {
    name: "Vi (Vodafone Idea)",
    logo: "/clients/vi.jpg",
    sector: "Telecommunications",
    description: "Digital transformation and network infrastructure solutions"
  }, {
    name: "BSNL",
    logo: "/clients/bsnl.png",
    sector: "Telecommunications",
    description: "Pan-India telecom and broadband infrastructure"
  }, {
    name: "Railtel",
    logo: "/clients/railtel.jpg",
    sector: "Telecommunications",
    description: "Nationwide rail-based telecom infrastructure"
  }, {
    name: "Wipro",
    logo: "/clients/wipro.png",
    sector: "IT Services",
    description: "Enterprise IT services and digital transformation"
  }, {
    name: "Gujarat FibreGrid",
    logo: "/clients/gujarat-fibregrid.jpg",
    sector: "Network Infrastructure",
    description: "State-wide optical fibre network infrastructure"
  }, {
    name: "Airports Authority of India",
    logo: "/lovable-uploads/981587b1-7cd3-46b5-a056-44bbab360255.png",
    sector: "Aviation",
    description: "Critical airport infrastructure and management systems"
  }, {
    name: "Larsen & Toubro",
    logo: "/lovable-uploads/981587b1-7cd3-46b5-a056-44bbab360255.png",
    sector: "Engineering & Construction",
    description: "Large-scale engineering and technology solutions"
  }, {
    name: "Indian Army",
    logo: "/lovable-uploads/92c8fc98-f9f4-42d7-a9e7-7770cec572f1.png",
    sector: "Defense",
    description: "Mission-critical defense systems and infrastructure"
  }, {
    name: "Electronics Corporation of India Limited",
    logo: "/lovable-uploads/92c8fc98-f9f4-42d7-a9e7-7770cec572f1.png",
    sector: "Electronics & Technology",
    description: "Advanced electronics and automation solutions"
  }, {
    name: "Siemens",
    logo: "/lovable-uploads/ae610b9c-2091-4caf-874f-643960b4d5d1.png",
    sector: "Industrial Technology",
    description: "Industrial automation and digitalization solutions"
  }, {
    name: "Indus Towers",
    logo: "/lovable-uploads/7685279a-9cd7-43ce-9a5e-1788f6a8ffc0.png",
    sector: "Infrastructure",
    description: "Telecom tower infrastructure and management"
  }, {
    name: "Tejas Networks",
    logo: "/lovable-uploads/7685279a-9cd7-43ce-9a5e-1788f6a8ffc0.png",
    sector: "Network Technology",
    description: "Advanced networking and optical solutions"
  }];
  const stats = [{
    icon: Building2,
    value: "50+",
    label: "Enterprise Clients"
  }, {
    icon: Users,
    value: "10,000+",
    label: "Professionals Placed"
  }, {
    icon: Globe,
    value: "15+",
    label: "Industries Served"
  }, {
    icon: CheckCircle,
    value: "95%",
    label: "Client Satisfaction"
  }];
  const achievements = ["Trusted partner for Fortune 500 companies", "Successfully delivered 500+ projects", "24/7 dedicated support and maintenance", "ISO 9001:2015 certified organization", "Industry-leading security compliance", "Agile project management methodologies"];
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Trusted</span> Clients
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Partnering with industry leaders to deliver exceptional talent solutions 
              and drive technological innovation across diverse sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Static Client Logo Grid */}
      <section className="py-16 bg-gradient-to-r from-muted/30 via-background to-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {clients.map((client, index) => (
              <div
                key={index}
                className="group relative h-24 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl flex items-center justify-center overflow-hidden border border-white/50 transition-all duration-300 hover:-translate-y-1 p-4"
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Industry Leaders Who Trust Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From telecommunications giants to defense organizations, we've successfully 
              partnered with diverse industry leaders to meet their talent acquisition needs.
            </p>
          </div>

          
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Why Leading Companies Choose uConnect
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our proven track record and commitment to excellence makes us the preferred 
                partner for organizations seeking top-tier talent and innovative solutions.
              </p>
              
              <div className="grid gap-4">
                {achievements.map((achievement, index) => <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{achievement}</span>
                  </div>)}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-background rounded-lg p-6 shadow-sm">
                    <Shield className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Security First</h3>
                    <p className="text-sm text-muted-foreground">
                      Enterprise-grade security and compliance standards
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-6 shadow-sm">
                    <Zap className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      Rapid deployment and quick time-to-market
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-6 shadow-sm">
                    <Users className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Expert Team</h3>
                    <p className="text-sm text-muted-foreground">
                      Skilled professionals with industry expertise
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-6 shadow-sm">
                    <Globe className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Global Reach</h3>
                    <p className="text-sm text-muted-foreground">
                      Nationwide presence with local expertise
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help your organization find the right talent 
              and achieve your business objectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Start Partnership
              </button>
              <button className="px-8 py-3 border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Clients;