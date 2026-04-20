import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Download, ChevronRight, ArrowUpRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    searchParams.get("category")
  );

  // Sync URL → state when query param changes (e.g. via header dropdown)
  useEffect(() => {
    const param = searchParams.get("category");
    setActiveCategory(param);
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory]);

  // Curated hero images shown on each category tile in the overview grid
  const categoryHeroImages: Record<string, string> = {
    antennas: "/products/category-antennas.jpg",
    switches: "/products/category-switches.png",
    networkCables: "/products/category-networkCables.jpg",
    specializedCables: "/products/category-specializedCables.jpg",
    ftth: "/products/category-ftth.jpg",
    racks: "/products/category-racks.jpg",
    poe: "/products/category-poe.webp",
    rfCables: "/products/category-rfCables.jpg",
    fiberCables: "/products/category-fiberCables.jpg",
    bts: "/products/category-bts.jpg",
  };

  const productCategories = {
    ftth: {
      title: "FTTH Products",
      description: "FTTH Products are fiber-to-home technology solutions that deliver high speed and other services over optical fibers. These solutions meet the diverse needs and requirements of FTTH service providers. FTTH products support higher bandwidths, lower latencies, longer distances, lower costs, and lower power consumption.",
      subProducts: [
        {
          name: "FMS/LIU Boxes",
          image: "/products/fms-96-port.webp",
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
          image: "/products/fiber-patch-cord-1.webp",
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
          image: "/products/fiber-patch-cord-2.webp",
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
          image: "/products/rf-jumpers.webp",
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
          image: "/products/cat5-cable-assembly.webp",
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
          image: "/products/cat6-cable-assembly.webp",
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
          image: "/products/patch-cords.webp",
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
          image: "/products/specialized-cable.webp",
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
          image: "/products/open-rack-unicel.webp",
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
          image: "/products/enclosed-cabinet-unicel.webp",
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
          image: "/products/wall-mount-rack.webp",
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
          image: "/products/cold-shrink-tube-unicel.webp",
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
          image: "/products/pvc-tape.webp",
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
          image: "/products/cable-ties-unicel.webp",
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
          image: "/products/lugs.webp",
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
          image: "/products/feeder-clamps.webp",
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
          image: "/products/weather-proofing-kit.webp",
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
          image: "/products/conduits.webp",
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
    poe: {
      title: "ConnectLH™ AC & DC PoE",
      description: "Power over Ethernet (PoE) solutions under the ConnectLH™ brand, engineered for telecom and wireless infrastructure. These PoE devices deliver reliable power and data over a single Ethernet cable, supporting RADWIN and other radio equipment with built-in surge, overload, and short-circuit protection.",
      subProducts: [
        {
          name: "ACCLH566-056-100 — Indoor AC PoE Adapter",
          image: "/products/ac-poe-clh.png",
          description: "Indoor AC Power over Ethernet device supporting most RADWIN product portfolio with up to 2.5 Gbps Ethernet interface and 56W PoE power output.",
          specs: [
            "Input: 90–264 VAC | Output: 12–56 VDC",
            "PoE Power: 56W | Rated Power: up to 35W",
            "Efficiency > 85% | Energy Level 6",
            "Two RJ45 connectors (Data In; Data + Power Out)",
            "Overload, over-voltage & short circuit protection",
            "Dimensions: 160×63×33 mm | Weight: 205g",
            "Operating Temp: -10°C to +70°C | Humidity: 0–95% RH"
          ],
          datasheet: "/datasheets/AC_POE_CLH-056-100.pdf"
        },
        {
          name: "DCCLH-35-56VDC — Extended Temp DC PoE Adapter",
          image: "/products/dc-poe-clh.png",
          description: "Extended temperature DC Power over Ethernet device with 48VDC input, supporting RADWIN product portfolio with up to 2.5 Gbps Ethernet and 35W PoE power.",
          specs: [
            "Input: 48 VDC | Output: 12–56 VDC",
            "PoE Power: 35W | Rated Power: up to 35W",
            "Efficiency > 85% | Isolated output",
            "Metallic RJ45 for PoE-OUT and DATA ports",
            "Protections: Short circuit, overload, over voltage, CC, CV",
            "LED indication for ON and Output OK",
            "Earthing port (6 sqmm) | Metallic RJ45 connected to earthing",
            "Dimensions: 150×60×40 mm | Weight: 245g",
            "Operating Temp: -20°C to +70°C | Humidity: 0–95% RH"
          ],
          datasheet: "/datasheets/DC_POE_CLH-35-56VDC.pdf"
        },
        {
          name: "ConnectLH™ PoE Splitter",
          image: "/products/ac-poe-clh.png",
          description: "PoE splitter that separates power and data from a single PoE-enabled Ethernet cable, enabling non-PoE devices to be powered remotely.",
          specs: [
            "IEEE 802.3af/at compliant",
            "Splits PoE into separate data and DC power",
            "Multiple output voltage options (5V, 9V, 12V)",
            "Compact design for easy deployment",
            "Ideal for IP cameras, access points & sensors"
          ]
        },
        {
          name: "ConnectLH™ Gigabit PoE Midspan Injector (4-Port)",
          image: "/products/ac-poe-clh.png",
          description: "4-port Gigabit PoE midspan injector compliant with IEEE 802.3at, delivering up to 30W per port for powering multiple network devices.",
          specs: [
            "IEEE 802.3at (PoE+) compliant | 30W per port",
            "4 Gigabit Ethernet ports",
            "Auto-sensing PoE with short circuit protection",
            "Desktop or rack-mount installation",
            "Ideal for access points, IP phones & cameras"
          ]
        },
        {
          name: "ConnectLH™ Gigabit PoE Midspan Injector (8-Port)",
          image: "/products/dc-poe-clh.png",
          description: "8-port Gigabit PoE midspan injector for enterprise-scale deployments, providing IEEE 802.3at compliant power to multiple endpoints.",
          specs: [
            "IEEE 802.3at (PoE+) compliant | 30W per port",
            "8 Gigabit Ethernet ports",
            "Total power budget up to 240W",
            "Auto-sensing with overload protection",
            "1U rack-mountable for data center use"
          ]
        },
        {
          name: "ConnectLH™ 100M PoE Adapter",
          image: "/products/ac-poe-clh.png",
          description: "Compact 100Mbps PoE adapter delivering 18W power for smaller network devices like IP cameras and wireless access points.",
          specs: [
            "IEEE 802.3af compliant | 18W output",
            "100 Mbps Fast Ethernet",
            "Plug-and-play installation",
            "LED power and status indicators",
            "Compact form factor for flexible deployment"
          ]
        }
      ]
    },
    switches: {
      title: "ConnectLH™ Managed PoE Switches",
      description: "Carrier-grade L2+ managed Gigabit Ethernet PoE switches under the ConnectLH™ brand, engineered for SMB, enterprise, and carrier Ethernet deployments. Built-in Device Management System (DMS), advanced PoE+ scheduling, and support for ERPS, EPS, IEEE 1588v2 PTP, OAM and CFM for service-grade reliability.",
      subProducts: [
        {
          name: "CLHS-2710GH — 8-Port L2+ Managed GbE PoE+ Switch",
          image: "/products/clhs-2710gh-switch.webp",
          description: "Next-generation L2+ managed Gigabit Ethernet PoE+ switch with 8× 10/100/1000 RJ45 PoE+ ports, 2× GbE RJ45/SFP combo uplinks and RJ45 console. Delivers 250W total PoE budget with carrier Ethernet features for SMB and Enterprise applications.",
          specs: [
            "8× 10/100/1000 RJ45 PoE+ (802.3at/af) | 250W total budget",
            "2× 100/1000 RJ45/SFP combo uplinks + RJ45 console",
            "Switching: 20 Gbps | Forwarding: 14.88 Mpps | 8K MAC | 9216B Jumbo",
            "ITU-T G.8031 EPS, G.8032 ERPS, IEEE 1588v2 PTP, 802.3ah OAM, 802.1ag CFM",
            "Built-in Device Management System (DMS) with topology, floor & map views",
            "IPv4/IPv6 L3 static routing | DHCP server | 802.3az Energy Efficient Ethernet",
            "100–240 VAC | 0–40°C operating | 220×44×242 mm | 2.3 kg | Rack mount",
            "CE (EN 62368-1) & FCC Part 15 Class A certified"
          ],
          datasheet: "/datasheets/CLHS-2710GH-datasheet.pdf"
        }
      ]
    },
    fabricated: {
      title: "Fabricated Products",
      description: "Specialized fabricated products for infrastructure support, providing sturdy and reliable frameworks for various industrial and telecommunications applications.",
      subProducts: [
        {
          name: "Poles",
          image: "/products/poles.webp",
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
          image: "/products/cable-trays.webp",
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
          image: "/products/ms-stands.webp",
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
          image: "/products/antenna-mounts.webp",
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
        {/* Editorial Hero */}
        <div
          className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20"
          style={{ background: "var(--gradient-hero-soft)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: "72px 72px",
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl">
              <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-5">
                Our products
              </div>
              <h1 className="display-headline text-foreground text-5xl sm:text-6xl lg:text-8xl">
                Engineered for
                <br />
                <span className="text-accent">the wireless edge.</span>
              </h1>
              <p className="mt-8 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                From our proprietary ConnectLH™ antenna systems to fiber optics and network
                infrastructure — a complete product ecosystem engineered for performance.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">

        {/* Inseego-style: image-tile category overview / drill-down */}
        {!activeCategory ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {Object.entries(productCategories).map(([key, category], idx) => {
              const heroImg = categoryHeroImages[key] ?? category.subProducts[0]?.image;
              return (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => setSearchParams({ category: key })}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative flex flex-col text-left rounded-3xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="relative m-3 rounded-2xl overflow-hidden bg-secondary aspect-[4/3]">
                    {heroImg && (
                      <img
                        src={heroImg}
                        alt={category.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-contain object-center p-6 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                  </div>
                  <div className="px-6 pb-6 pt-2 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="display-headline text-foreground text-xl lg:text-2xl leading-tight">
                        {category.title}
                      </h3>
                      <span className="shrink-0 w-10 h-10 rounded-full bg-secondary text-foreground flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                    <p className="mt-3 text-muted-foreground text-sm line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All products
            </button>

            <div className="border-t border-border pt-8">
              <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                Category
              </div>
              <h2 className="display-headline text-foreground text-4xl lg:text-6xl max-w-4xl">
                {productCategories[activeCategory as keyof typeof productCategories].title}
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed max-w-3xl">
                {productCategories[activeCategory as keyof typeof productCategories].description}
              </p>
            </div>

            <div className="grid gap-6">
              {productCategories[activeCategory as keyof typeof productCategories].subProducts.map((product, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="group bg-card border border-border rounded-3xl overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-500"
                >
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-2 relative bg-gradient-to-br from-muted/60 to-muted/20 p-8 flex items-center justify-center min-h-[240px]">
                      {product.image && (
                        <img
                          loading="lazy"
                          decoding="async"
                          src={product.image}
                          alt={product.name}
                          className="w-full h-auto max-h-56 object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="md:col-span-3 p-8 flex flex-col justify-center space-y-5">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                        {product.specs.map((spec, specIdx) => (
                          <div
                            key={specIdx}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground py-1"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                      {'datasheet' in product && (product as any).datasheet && (
                        <a
                          href={(product as any).datasheet}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-all text-sm font-semibold w-fit shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-300"
                        >
                          <Download className="w-4 h-4" />
                          Download Datasheet
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

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