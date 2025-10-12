import { Phone, Network, Cable, Server, Radio, Wrench } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const products = [
    {
      icon: Radio,
      title: "Tower/Poles",
      description: "High-quality telecommunication towers and poles for network infrastructure.",
      features: [
        "Durable construction",
        "Weather-resistant materials",
        "Customizable heights",
        "Easy installation"
      ]
    },
    {
      icon: Network,
      title: "FTTH Products",
      description: "Fiber-to-the-Home solutions for high-speed internet connectivity.",
      features: [
        "High-speed fiber optic cables",
        "Optical network terminals",
        "Splitters and connectors",
        "Installation accessories"
      ]
    },
    {
      icon: Cable,
      title: "Telecom and Network Cables",
      description: "Professional-grade cables for telecommunications and networking applications.",
      features: [
        "Copper and fiber optic cables",
        "Indoor and outdoor variants",
        "High bandwidth capacity",
        "Standards compliant"
      ]
    },
    {
      icon: Phone,
      title: "CAT 6 Cables & Patch Cords",
      description: "High-performance Category 6 cables for reliable data transmission.",
      features: [
        "Up to 10 Gbps speed",
        "Reduced crosstalk",
        "Various lengths available",
        "Quality connectors"
      ]
    },
    {
      icon: Server,
      title: "Racks and Cabinets",
      description: "Server racks and network cabinets for organized equipment management.",
      features: [
        "Multiple sizes available",
        "Cable management systems",
        "Ventilation and cooling",
        "Security features"
      ]
    },
    {
      icon: Wrench,
      title: "BTS Installation Products",
      description: "Complete range of products for Base Transceiver Station installations.",
      features: [
        "Mounting equipment",
        "Power systems",
        "Grounding solutions",
        "Protection devices"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Telecommunications Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality telecommunications products designed to meet the evolving needs of modern network infrastructure.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-sm text-foreground/80">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 border border-border/50">
          <h2 className="text-3xl font-bold mb-4">Need More Information?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team of experts is ready to help you find the perfect telecommunications solutions for your business needs.
          </p>
          <a 
            href="/?section=contact" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us Today
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;