import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const productCategories = {
    ftth: {
      title: "FTTH Products",
      description: "FTTH Products are fiber-to-home technology solutions that deliver high speed and other services over optical fibers. These solutions meet the diverse needs and requirements of FTTH service providers. FTTH products support higher bandwidths, lower latencies, longer distances, lower costs, and lower power consumption.",
      subProducts: [
        {
          name: "FMS/LIU Boxes",
          image: "/products/fms-96-port.png",
          description: "Fiber management boxes organize and manage fiber optic cables and connections in a network.",
          specs: [
            "12 Fiber to 288 Fiber sizes",
            "Rackmount/Wall Mount options",
            "Multiple connectors: SC/PC, LC/PC, SC/UPC, SC APC, LC APC, E2000",
            "Prevents damage and interference in fiber optic networks"
          ]
        },
        {
          name: "PLC Cassette Splitters",
          description: "Mini cassette type PLC fiber optic splitter with plug-in-play design",
          specs: [
            "Fast deployment without splicing machine",
            "Space-saving design with reliable protection",
            "Installed in wall mount FTTH boxes",
            "Fiber optical signal distribution"
          ]
        },
        {
          name: "ABS Fiber Optic Splitter",
          description: "PLC fiber optic splitter with plastic ABS box for multiple protection",
          specs: [
            "1 input fiber and 2/4/8/16/32 output fibers",
            "Easy and reliable installation",
            "Used in outdoor fiber distribution boxes",
            "Compact design for various connections"
          ]
        },
        {
          name: "Blockless Fiber Optic Splitters",
          description: "Mini type PLC splitter with stainless tube package",
          specs: [
            "1×2/4/6/8/16 split ratios",
            "Strong protection with SC APC connectors",
            "No fiber splice during installation",
            "Compact structure for saving space"
          ]
        },
        {
          name: "Joint Enclosure",
          description: "Protection for fiber optic cable splicing in various environments",
          specs: [
            "Suitable for aerial, direct burial, and duct applications",
            "Fire-resistant and waterproof",
            "Quakeproof protection",
            "Long-term use in bad natural environments"
          ]
        },
        {
          name: "Home Termination Box",
          description: "FTTH connection solution at user's premises",
          specs: [
            "Cost-effective protection",
            "Passive termination of fibers",
            "Single location deployment",
            "Reliable user-end connectivity"
          ]
        },
        {
          name: "SFP Modules",
          description: "Small modular transceiver for network switches and servers",
          specs: [
            "Hot-pluggable design",
            "Small size for tight networking spaces",
            "Fast communication between switches",
            "Easy network adjustments without redesign"
          ]
        }
      ]
    },
    fiberCables: {
      title: "Optic Fiber Cable Assemblies",
      description: "Cutting-edge connectivity solutions designed to propel your communication networks into the future, delivering unparalleled performance, reliability, and speed.",
      subProducts: [
        {
          name: "Optic Fiber Patch Cords",
          image: "/products/fiber-patch-cord-1.png",
          description: "High-speed fiber optic cable assemblies for seamless communication",
          specs: [
            "Lightning-fast data transmission",
            "Precision engineering for optimal signal integrity",
            "Versatile solutions for diverse applications",
            "Advanced technology with superior bandwidth"
          ]
        },
        {
          name: "CPRI Cables",
          image: "/products/fiber-patch-cord-2.png",
          description: "High-performance connectivity for modern communication networks",
          specs: [
            "Ultra-fast data transmission",
            "Reliable link performance",
            "Future-proof technology",
            "Industry standards compliance"
          ]
        }
      ]
    },
    rfCables: {
      title: "RF Cables & Assemblies",
      description: "Top-notch RF and coaxial cables specially designed to mitigate signal interference. These cables carry radio frequency signals with different frequencies and wavelengths for various applications.",
      subProducts: [
        {
          name: "RF Jumpers",
          image: "/products/rf-jumpers.png",
          description: "Professional RF cables for telecommunications applications",
          specs: [
            "7/8\", 1/2\" flex and super flex options",
            "LMR 300/400 with associated RF Jumpers",
            "Optimized signal transmission",
            "Durable build for telecommunications environment"
          ]
        },
        {
          name: "Coaxial Cables",
          description: "High-frequency signal cables with minimal interference",
          specs: [
            "Copper conductors with metal shielding",
            "Used in phone lines and cable TV",
            "Reduced signal interference",
            "Multiple application support"
          ]
        }
      ]
    },
    networkCables: {
      title: "Network & Data Cable Assemblies",
      description: "Professional-grade network cables designed to meet the demands of modern connectivity, ensuring seamless data transfer and optimal network performance.",
      subProducts: [
        {
          name: "CAT 5 Cables",
          image: "/products/cat5-cable-assembly.png",
          description: "High-speed twisted pair cables for Ethernet networks",
          specs: [
            "Up to 100 MHz data transfer rates",
            "Exceptional bandwidth capacity",
            "Reduced electromagnetic interference",
            "Plug-and-play installation"
          ]
        },
        {
          name: "CAT 6 Cables",
          image: "/products/cat6-cable-assembly.png",
          description: "Enhanced performance cables for high-speed data transfer",
          specs: [
            "Up to 250 MHz bandwidth",
            "Superior signal integrity",
            "Minimized crosstalk and interference",
            "Backward compatible with CAT 5/5e"
          ]
        },
        {
          name: "Fiber Patch Cords",
          image: "/products/patch-cords.png",
          description: "High-quality fiber optic patch cables for reliable data transmission",
          specs: [
            "Various connector types (LC, SC, MTRJ, ST)",
            "Rapid connection capability",
            "Ideal for server rooms and data centers",
            "Superior reliability and security"
          ]
        }
      ]
    },
    specializedCables: {
      title: "Specialized Cable Assemblies",
      description: "Meticulously crafted cables for distinct purposes and applications, featuring customized specifications for specific requirements with precision engineering.",
      subProducts: [
        {
          name: "Custom Cable Assemblies",
          image: "/products/specialized-cable.jpg",
          description: "Tailored cables with customized specifications",
          specs: [
            "HDMI Cables for high-definition",
            "SMA/QMA connectors",
            "BNC to SMB adapters",
            "Shielded/unshielded options with PVC and PE insulation"
          ]
        },
        {
          name: "Multipin Connectors",
          description: "Specialized connectors for PCM applications",
          specs: [
            "8, 10, 12, and 16 pair configurations",
            "D-connector compatibility",
            "High performance and reliability",
            "Industrial-grade durability"
          ]
        }
      ]
    },
    racks: {
      title: "Racks and Cabinets",
      description: "Professional equipment mounting solutions for servers, network devices, and telecommunications equipment with flexible and secure designs.",
      subProducts: [
        {
          name: "Open Frame Racks",
          image: "/products/open-rack-unicel.jpg",
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
          image: "/products/enclosed-cabinet-unicel.png",
          description: "Secure enclosures for servers and IT equipment",
          specs: [
            "Locking mechanisms for security",
            "Protection from environmental factors",
            "Professional appearance",
            "Dust and moisture protection"
          ]
        },
        {
          name: "Wall-Mounted Racks",
          image: "/products/wall-mount-rack.jpg",
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
      description: "Complete range of products for Base Transceiver Station installations and site infrastructure, providing essential solutions for telecommunications installations.",
      subProducts: [
        {
          name: "Cold Shrink Tubes",
          image: "/products/cold-shrink-tube-unicel.png",
          description: "Revolutionary cable and connector insulation solution",
          specs: [
            "No heat application required",
            "Easy installation process",
            "Specially formulated rubber material",
            "Contracts when supporting core is removed"
          ]
        },
        {
          name: "Tapes",
          image: "/products/pvc-tape.jpg",
          description: "Essential insulation and bundling solutions",
          specs: [
            "Electrical insulation for wires and cables",
            "Protective barrier against electrical currents",
            "Bundling and securing applications",
            "Versatile for various installations"
          ]
        },
        {
          name: "Cable Ties",
          image: "/products/cable-ties-unicel.png",
          description: "Durable nylon straps for cable management",
          specs: [
            "Various lengths and strengths",
            "Integrated locking mechanism",
            "Quick and efficient bundling",
            "Heavy-duty industrial applications"
          ]
        },
        {
          name: "Lugs",
          image: "/products/lugs.png",
          description: "Cable lugs for secure electrical connections",
          specs: [
            "Copper and aluminum construction",
            "Various sizes for different cable gauges",
            "Excellent conductivity",
            "Secure interface for electrical circuits"
          ]
        },
        {
          name: "Feeder Clamps",
          image: "/products/feeder-clamps.png",
          description: "Cable fastening solutions for telecommunications",
          specs: [
            "Secures coaxial and feeder cables",
            "Mounts to masts, towers, or walls",
            "Ensures stability and alignment",
            "Efficient signal transmission"
          ]
        },
        {
          name: "Weather Proofing Kits",
          image: "/products/weather-proofing-kit.png",
          description: "Protection for exposed telecommunications connectors",
          specs: [
            "Moisture protection",
            "Butyl and plastic tapes included",
            "Various sizes available",
            "Suitable for buried and exposed applications"
          ]
        },
        {
          name: "Conduits",
          image: "/products/conduits.png",
          description: "Protective pathways for cables and wires",
          specs: [
            "PVC and metal options",
            "Protection from environmental factors",
            "Moisture and abrasion resistance",
            "Organized wiring solutions"
          ]
        }
      ]
    },
    fabricated: {
      title: "Fabricated Products",
      description: "Specialized fabricated products for infrastructure support, providing sturdy and reliable frameworks for various industrial and telecommunications applications.",
      subProducts: [
        {
          name: "Poles",
          image: "/products/poles.jpeg",
          description: "Integral components for supporting utilities",
          specs: [
            "Materials: wood, metal, or concrete",
            "Supports electricity and telecommunications",
            "Street lighting applications",
            "Sturdy framework for above-ground equipment"
          ]
        },
        {
          name: "Cable Trays",
          image: "/products/cable-trays.png",
          description: "Efficient cable management and support systems",
          specs: [
            "Galvanized steel, aluminum, or fiberglass",
            "Secure pathway for electrical cables",
            "Durability and corrosion resistance",
            "Optimal performance and easy maintenance"
          ]
        },
        {
          name: "MS Stands",
          image: "/products/ms-stands.png",
          description: "Mild Steel Stands for equipment support",
          specs: [
            "Fabricated from mild steel",
            "Stability and durability",
            "Supports machinery and electrical panels",
            "Withstands heavy loads"
          ]
        },
        {
          name: "Antenna Mounts",
          image: "/products/antenna-mounts.png",
          description: "Essential mounting solutions for telecommunications",
          specs: [
            "Secure platform for antenna positioning",
            "Galvanized steel or aluminum construction",
            "Withstands environmental elements",
            "Optimal signal reception and transmission"
          ]
        },
        {
          name: "Street Light Poles",
          image: "/products/street-light-poles.png",
          description: "Infrastructure for street lighting and telecommunications",
          specs: [
            "Durable construction materials",
            "Weather-resistant design",
            "Multi-purpose applications",
            "Long-lasting performance"
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-16 animate-fade-in">
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
        <Tabs defaultValue="ftth" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 mb-8 h-auto">
            <TabsTrigger value="ftth">FTTH Products</TabsTrigger>
            <TabsTrigger value="fiberCables">Fiber Cables</TabsTrigger>
            <TabsTrigger value="rfCables">RF Cables</TabsTrigger>
            <TabsTrigger value="networkCables">Network Cables</TabsTrigger>
            <TabsTrigger value="specializedCables">Specialized Cables</TabsTrigger>
            <TabsTrigger value="racks">Racks & Cabinets</TabsTrigger>
            <TabsTrigger value="bts">BTS Installation</TabsTrigger>
            <TabsTrigger value="fabricated">Fabricated Products</TabsTrigger>
          </TabsList>

          {/* FTTH Tab */}
          <TabsContent value="ftth">
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">{productCategories.ftth.title}</CardTitle>
                  <CardDescription>{productCategories.ftth.description}</CardDescription>
                </CardHeader>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productCategories.ftth.subProducts.map((product, idx) => (
                  <Card key={idx} className="group hover:shadow-2xl transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.image && (
                        <div className="relative w-full overflow-hidden rounded-lg bg-muted/50 p-6">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-auto max-h-64 object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1 flex-shrink-0">•</span>
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

          {/* Fiber Cables Tab */}
          <TabsContent value="fiberCables">
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">{productCategories.fiberCables.title}</CardTitle>
                  <CardDescription>{productCategories.fiberCables.description}</CardDescription>
                </CardHeader>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productCategories.fiberCables.subProducts.map((product, idx) => (
                  <Card key={idx} className="group hover:shadow-2xl transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.image && (
                        <div className="relative w-full overflow-hidden rounded-lg bg-muted/50 p-6">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-auto max-h-64 object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1 flex-shrink-0">•</span>
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

          {/* RF Cables Tab */}
          <TabsContent value="rfCables">
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">{productCategories.rfCables.title}</CardTitle>
                  <CardDescription>{productCategories.rfCables.description}</CardDescription>
                </CardHeader>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productCategories.rfCables.subProducts.map((product, idx) => (
                  <Card key={idx} className="group hover:shadow-2xl transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.image && (
                        <div className="relative w-full overflow-hidden rounded-lg bg-muted/50 p-6">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-auto max-h-64 object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1 flex-shrink-0">•</span>
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

          {/* Network Cables Tab */}
          <TabsContent value="networkCables">
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">{productCategories.networkCables.title}</CardTitle>
                  <CardDescription>{productCategories.networkCables.description}</CardDescription>
                </CardHeader>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productCategories.networkCables.subProducts.map((product, idx) => (
                  <Card key={idx} className="group hover:shadow-2xl transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.image && (
                        <div className="relative w-full overflow-hidden rounded-lg bg-muted/50 p-6">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-auto max-h-64 object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1 flex-shrink-0">•</span>
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

          {/* Specialized Cables Tab */}
          <TabsContent value="specializedCables">
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">{productCategories.specializedCables.title}</CardTitle>
                  <CardDescription>{productCategories.specializedCables.description}</CardDescription>
                </CardHeader>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productCategories.specializedCables.subProducts.map((product, idx) => (
                  <Card key={idx} className="group hover:shadow-2xl transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.image && (
                        <div className="relative w-full overflow-hidden rounded-lg bg-muted/50 p-6">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-auto max-h-64 object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1 flex-shrink-0">•</span>
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
                  <Card key={idx} className="group hover:shadow-2xl transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.image && (
                        <div className="relative w-full overflow-hidden rounded-lg bg-muted/50 p-6">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-auto max-h-64 object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1 flex-shrink-0">•</span>
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
                  <Card key={idx} className="group hover:shadow-2xl transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.image && (
                        <div className="relative w-full overflow-hidden rounded-lg bg-muted/50 p-6">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-auto max-h-64 object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1 flex-shrink-0">•</span>
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

          {/* Fabricated Products Tab */}
          <TabsContent value="fabricated">
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">{productCategories.fabricated.title}</CardTitle>
                  <CardDescription>{productCategories.fabricated.description}</CardDescription>
                </CardHeader>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productCategories.fabricated.subProducts.map((product, idx) => (
                  <Card key={idx} className="group hover:shadow-2xl transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.image && (
                        <div className="relative w-full overflow-hidden rounded-lg bg-muted/50 p-6">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-auto max-h-64 object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1 flex-shrink-0">•</span>
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