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
          image: "/products/plc-splitter.png",
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
          image: "/products/abs-splitter.png",
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
          image: "/products/blockless-splitter.png",
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
          image: "/products/joint-enclosure.png",
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
          image: "/products/home-termination-box.png",
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
          image: "/products/sfp-module.png",
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
          image: "/products/coaxial-cable.png",
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
          image: "/products/multipin-connector.png",
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
    antennas: {
      title: "ConnectLH™ Dish Antennas",
      description: "High-performance 2x2 MIMO dual-polarization dish antennas engineered for 4.9–5.9 GHz unlicensed and licensed bands. ConnectLH™ antennas deliver best-in-class gain, isolation, and rugged environmental durability for point-to-point wireless backhaul and public safety networks.",
      subProducts: [
        {
          name: "29CLH4959 — 29dBi 2×2 MIMO Dish Antenna",
          image: "/products/dish-antenna-29dbi.jpg",
          description: "2 ft (Ø650mm) dual-pol dish for 4.9–5.9 GHz. Ideal for mid-range point-to-point links with excellent port isolation.",
          specs: [
            "Gain: 29 ±1 dBi | Beamwidth: 6° ±0.5",
            "VSWR ≤ 1.5:1 | Port Isolation > 30 dB",
            "Front-to-Back > 30 dB | Cross Pol > 30 dB",
            "IP65 rated | Wind survival 200 km/h",
            "Weight: 5 ±0.5 kg | Pole mount 90–120 mm",
            "Connector: 2× N(F) | Aluminum reflector, powder coated"
          ],
          datasheet: "/datasheets/29CLH4959-datasheet.pdf"
        },
        {
          name: "32CLH4959 — 32dBi 2×2 MIMO Dish Antenna",
          image: "/products/dish-antenna-32dbi.jpg",
          description: "3 ft (Ø950mm) dual-pol dish for 4.9–5.9 GHz. Higher gain for longer-distance backhaul deployments.",
          specs: [
            "Gain: 32 ±1 dBi | Beamwidth: 4° ±0.5",
            "VSWR ≤ 1.5:1 | Port Isolation > 30 dB",
            "Front-to-Back > 34 dB | Cross Pol > 30 dB",
            "IP65 rated | Wind survival 200 km/h",
            "Weight: 10 ±1 kg | Pole mount 90–120 mm",
            "Connector: 2× N(F) | Aluminum alloy reflector, powder coated"
          ],
          datasheet: "/datasheets/32CLH4959-datasheet.pdf"
        },
        {
          name: "34CLH4959 — 34dBi 2×2 MIMO Dish Antenna",
          image: "/products/dish-antenna-34dbi.jpg",
          description: "4 ft (Ø1200mm) dual-pol dish for 4.9–5.9 GHz. Maximum gain for long-haul point-to-point wireless links.",
          specs: [
            "Gain: 34 ±1 dBi | Beamwidth: 3° ±0.25",
            "VSWR ≤ 1.5:1 | Port Isolation > 30 dB",
            "Front-to-Back > 36 dB | Cross Pol > 28 dB",
            "IP65 rated | Wind survival 200 km/h",
            "Weight: 12 ±1 kg | Pole mount 90–120 mm",
            "Connector: 2× N(F) | Aluminum alloy reflector, powder coated"
          ],
          datasheet: "/datasheets/34CLH4959-datasheet.pdf"
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="animate-fade-in">
        {/* Hero Section with Image */}
        <div className="relative h-[400px] w-full overflow-hidden">
          <img 
            src="/products/fiber-optic-hero.jpeg" 
            alt="Fiber Optic Cable Assemblies"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                  Telecom, IT & Infrastructure Products
                </h1>
                <p className="text-lg md:text-xl text-white/90">
                  From our proprietary ConnectLH™ antenna systems to fiber optics and network infrastructure — a complete product ecosystem engineered for performance.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">

        {/* Products Tabs */}
        <Tabs defaultValue="antennas" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8 h-auto bg-muted/50 p-2 border border-border rounded-lg shadow-sm">
            <TabsTrigger value="antennas">Dish Antennas</TabsTrigger>
            <TabsTrigger value="ftth">FTTH Products</TabsTrigger>
            <TabsTrigger value="fiberCables">Fiber Cables</TabsTrigger>
            <TabsTrigger value="rfCables">RF Cables</TabsTrigger>
            <TabsTrigger value="networkCables">Network Cables</TabsTrigger>
            <TabsTrigger value="specializedCables">Specialized Cables</TabsTrigger>
            <TabsTrigger value="racks">Racks & Cabinets</TabsTrigger>
            <TabsTrigger value="bts">BTS Installation</TabsTrigger>
            <TabsTrigger value="fabricated">Fabricated Products</TabsTrigger>
          </TabsList>

          {/* ConnectLH Antennas Tab */}
          <TabsContent value="antennas" className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">{productCategories.antennas.title}</h2>
              <p className="text-muted-foreground">{productCategories.antennas.description}</p>
            </div>
            
            <div className="space-y-8">
              {productCategories.antennas.subProducts.map((product, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="flex items-center justify-center bg-muted/30 rounded-lg p-6">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-auto max-h-64 object-contain"
                        />
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 flex-shrink-0">–</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                      {'datasheet' in product && product.datasheet && (
                        <a 
                          href={product.datasheet} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium mt-2"
                        >
                          Download Datasheet (PDF)
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* FTTH Tab */}
          <TabsContent value="ftth" className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">{productCategories.ftth.title}</h2>
              <p className="text-muted-foreground">{productCategories.ftth.description}</p>
            </div>
            
            <div className="space-y-8">
              {productCategories.ftth.subProducts.map((product, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="flex items-center justify-center bg-muted/30 rounded-lg p-6">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-auto max-h-64 object-contain"
                        />
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 flex-shrink-0">–</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Fiber Cables Tab */}
          <TabsContent value="fiberCables" className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">{productCategories.fiberCables.title}</h2>
              <p className="text-muted-foreground">{productCategories.fiberCables.description}</p>
            </div>
            
            <div className="space-y-8">
              {productCategories.fiberCables.subProducts.map((product, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="flex items-center justify-center bg-muted/30 rounded-lg p-6">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-auto max-h-64 object-contain"
                        />
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 flex-shrink-0">–</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* RF Cables Tab */}
          <TabsContent value="rfCables" className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">{productCategories.rfCables.title}</h2>
              <p className="text-muted-foreground">{productCategories.rfCables.description}</p>
            </div>
            
            <div className="space-y-8">
              {productCategories.rfCables.subProducts.map((product, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="flex items-center justify-center bg-muted/30 rounded-lg p-6">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-auto max-h-64 object-contain"
                        />
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 flex-shrink-0">–</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Network Cables Tab */}
          <TabsContent value="networkCables" className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">{productCategories.networkCables.title}</h2>
              <p className="text-muted-foreground">{productCategories.networkCables.description}</p>
            </div>
            
            <div className="space-y-8">
              {productCategories.networkCables.subProducts.map((product, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="flex items-center justify-center bg-muted/30 rounded-lg p-6">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-auto max-h-64 object-contain"
                        />
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 flex-shrink-0">–</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Specialized Cables Tab */}
          <TabsContent value="specializedCables" className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">{productCategories.specializedCables.title}</h2>
              <p className="text-muted-foreground">{productCategories.specializedCables.description}</p>
            </div>
            
            <div className="space-y-8">
              {productCategories.specializedCables.subProducts.map((product, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="flex items-center justify-center bg-muted/30 rounded-lg p-6">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-auto max-h-64 object-contain"
                        />
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 flex-shrink-0">–</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Racks Tab */}
          <TabsContent value="racks" className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">{productCategories.racks.title}</h2>
              <p className="text-muted-foreground">{productCategories.racks.description}</p>
            </div>
            
            <div className="space-y-8">
              {productCategories.racks.subProducts.map((product, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="flex items-center justify-center bg-muted/30 rounded-lg p-6">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-auto max-h-64 object-contain"
                        />
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 flex-shrink-0">–</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* BTS Installation Tab */}
          <TabsContent value="bts" className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">{productCategories.bts.title}</h2>
              <p className="text-muted-foreground">{productCategories.bts.description}</p>
            </div>
            
            <div className="space-y-8">
              {productCategories.bts.subProducts.map((product, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="flex items-center justify-center bg-muted/30 rounded-lg p-6">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-auto max-h-64 object-contain"
                        />
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 flex-shrink-0">–</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Fabricated Products Tab */}
          <TabsContent value="fabricated" className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">{productCategories.fabricated.title}</h2>
              <p className="text-muted-foreground">{productCategories.fabricated.description}</p>
            </div>
            
            <div className="space-y-8">
              {productCategories.fabricated.subProducts.map((product, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="flex items-center justify-center bg-muted/30 rounded-lg p-6">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-auto max-h-64 object-contain"
                        />
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 flex-shrink-0">–</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;