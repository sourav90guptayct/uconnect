import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const productCategories = {
    towers: {
      title: "Tower/Poles",
      description: "Telecom towers are structures specifically designed to facilitate wireless communication and telecommunication services. These towers enable the transmission and reception of signals for various wireless technologies such as 2G, 3G, 4G LTE, and 5G.",
      image: "/products/telecom-tower.webp",
      features: [
        "Support for 2G, 3G, 4G LTE, and 5G technologies",
        "High-quality construction for long-term reliability",
        "Minimal downtime and disruptions",
        "Suitable for high population density areas and remote locations"
      ]
    },
    ftth: {
      title: "FTTH Products",
      description: "Fiber-to-home technology solutions that deliver high-speed internet and other services over optical fibers, supporting higher bandwidths, lower latencies, and lower power consumption.",
      subProducts: [
        {
          name: "FMS/LIU Boxes",
          image: "/products/fms-box.jpg",
          description: "Fiber management boxes organize and manage fiber optic cables and connections in a network.",
          specs: [
            "12 Fiber to 288 Fiber sizes",
            "Rackmount/Wall Mount options",
            "Multiple connector types: SC/PC, LC/PC, SC/UPC, SC APC, LC APC, E2000",
            "Prevents damage and interference"
          ]
        },
        {
          name: "Splitters",
          description: "Various types of fiber optic splitters for signal distribution",
          specs: [
            "PLC Cassette Splitters - Plug-and-play design",
            "ABS Fiber Optic Splitters - Multiple protection",
            "Blockless Splitters - Compact structure",
            "Various split ratios: 1×2/4/6/8/16/32"
          ]
        },
        {
          name: "Joint Enclosure & Termination Boxes",
          description: "Protection and termination solutions for fiber connections",
          specs: [
            "Aerial, direct burial, and duct applications",
            "Fire-resistant and waterproof",
            "Home termination boxes for user premises",
            "Cost-effective protection solutions"
          ]
        },
        {
          name: "SFP Modules",
          description: "Small form-factor pluggable transceivers for network equipment",
          specs: [
            "Hot-pluggable design",
            "Fast communication between switches",
            "Easy network adjustments",
            "Compatible with various network devices"
          ]
        }
      ]
    },
    cables: {
      title: "Telecom and Network Cables",
      description: "Professional-grade cables for telecommunications and networking applications, engineered for exceptional performance and reliability.",
      subProducts: [
        {
          name: "CAT5 Cables",
          image: "/products/cat5-cable.png",
          description: "Twisted pair wiring for Ethernet networks supporting speeds up to 100 MHz",
          specs: [
            "Up to 100 MHz data transfer rates",
            "Telephone and video transmission support",
            "Industry standards compliant",
            "Rigorous testing for reliability"
          ]
        },
        {
          name: "CAT6 Cables",
          description: "Enhanced performance cables supporting up to 250 MHz",
          specs: [
            "Up to 250 MHz bandwidth",
            "Minimized crosstalk and interference",
            "Improved signal integrity",
            "Longer cable runs without degradation"
          ]
        },
        {
          name: "HDMI Cables",
          image: "/products/hdmi-cable.webp",
          description: "High-Definition Multimedia Interface cables for pristine audio and video transmission",
          specs: [
            "Supports 4K and 8K resolutions",
            "Single cable for audio and video",
            "High-definition content delivery",
            "Wide device compatibility"
          ]
        }
      ]
    },
    racks: {
      title: "Racks and Cabinets",
      description: "Professional equipment mounting solutions for servers, network devices, and telecommunications equipment.",
      subProducts: [
        {
          name: "Open Frame Racks",
          image: "/products/open-rack.jpg",
          description: "Flexible mounting solutions with easy access and airflow",
          specs: [
            "Floor-standing or wall-mounted options",
            "Two and four-post configurations",
            "Easy access to equipment",
            "Optimal airflow management"
          ]
        },
        {
          name: "Closed Cabinets",
          image: "/products/enclosed-cabinet.png",
          description: "Secure enclosures for servers and IT equipment",
          specs: [
            "Security with locking mechanisms",
            "Protection from environmental factors",
            "Professional appearance",
            "Dust and moisture protection"
          ]
        },
        {
          name: "Wall-Mounted Racks",
          description: "Space-saving enclosed racks for wall mounting",
          specs: [
            "Welded frames with integrated side panels",
            "Vented top cover for cooling",
            "Front glass door with lock",
            "Flexible mounting locations"
          ]
        }
      ]
    },
    bts: {
      title: "BTS Installation Products",
      description: "Complete range of products for Base Transceiver Station installations and site infrastructure.",
      subProducts: [
        {
          name: "Cold Shrink Tubes",
          image: "/products/cold-shrink-tube.png",
          description: "Revolutionary cable and connector insulation solution",
          specs: [
            "No heat application required",
            "Easy installation process",
            "Specially formulated rubber material",
            "Reliable insulation protection"
          ]
        },
        {
          name: "Cable Ties",
          image: "/products/cable-ties.png",
          description: "Durable nylon straps for cable management",
          specs: [
            "Various lengths and strengths",
            "Quick and efficient bundling",
            "Heavy-duty industrial applications",
            "Integrated locking mechanism"
          ]
        },
        {
          name: "Tapes",
          description: "Essential insulation and bundling solutions",
          specs: [
            "Electrical insulation",
            "Wire and cable bundling",
            "Protection against electrical currents",
            "Multiple application types"
          ]
        },
        {
          name: "Lugs & Feeder Clamps",
          description: "Electrical connections and cable mounting solutions",
          specs: [
            "Copper and aluminum construction",
            "Various sizes for different gauges",
            "Secure cable fastening",
            "Excellent conductivity"
          ]
        },
        {
          name: "Weather Proofing Kits",
          description: "Protection for exposed telecommunications connectors",
          specs: [
            "Moisture protection",
            "Butyl and plastic tapes",
            "Various sizes available",
            "Buried and exposed applications"
          ]
        },
        {
          name: "Conduits",
          description: "Protective pathways for cables and wires",
          specs: [
            "PVC and metal options",
            "Environmental protection",
            "Moisture and abrasion resistance",
            "Organized wiring solutions"
          ]
        }
      ]
    }
  };

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

        {/* Products Tabs */}
        <Tabs defaultValue="towers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
            <TabsTrigger value="towers">Towers/Poles</TabsTrigger>
            <TabsTrigger value="ftth">FTTH Products</TabsTrigger>
            <TabsTrigger value="cables">Cables</TabsTrigger>
            <TabsTrigger value="racks">Racks & Cabinets</TabsTrigger>
            <TabsTrigger value="bts">BTS Installation</TabsTrigger>
          </TabsList>

          {/* Towers Tab */}
          <TabsContent value="towers">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">{productCategories.towers.title}</CardTitle>
                <CardDescription>{productCategories.towers.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <img 
                  src={productCategories.towers.image} 
                  alt="Telecommunication Tower"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {productCategories.towers.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FTTH Tab */}
          <TabsContent value="ftth">
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">{productCategories.ftth.title}</CardTitle>
                  <CardDescription>{productCategories.ftth.description}</CardDescription>
                </CardHeader>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productCategories.ftth.subProducts.map((product, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Cables Tab */}
          <TabsContent value="cables">
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">{productCategories.cables.title}</CardTitle>
                  <CardDescription>{productCategories.cables.description}</CardDescription>
                </CardHeader>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productCategories.cables.subProducts.map((product, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Racks Tab */}
          <TabsContent value="racks">
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">{productCategories.racks.title}</CardTitle>
                  <CardDescription>{productCategories.racks.description}</CardDescription>
                </CardHeader>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productCategories.racks.subProducts.map((product, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* BTS Installation Tab */}
          <TabsContent value="bts">
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">{productCategories.bts.title}</CardTitle>
                  <CardDescription>{productCategories.bts.description}</CardDescription>
                </CardHeader>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productCategories.bts.subProducts.map((product, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

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