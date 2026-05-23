import { motion } from "framer-motion";
import { Factory, Zap, Building2, Truck, Briefcase, ShoppingBag, ArrowUpRight } from "lucide-react";
import industrialImg from "@/assets/usecase-industrial.jpg";
import energyImg from "@/assets/usecase-energy.jpg";
import smartcityImg from "@/assets/usecase-smartcity.jpg";
import transportationImg from "@/assets/usecase-transportation.jpg";
import enterpriseImg from "@/assets/usecase-enterprise.jpg";
import retailImg from "@/assets/usecase-retail.jpg";

const useCases = [
  {
    icon: Factory,
    title: "Industrial & Automation",
    image: industrialImg,
    desc: "Resilient connectivity for PLCs, SCADA and factory-floor automation — keeping production lines online with redundant cellular and wired uplinks.",
    tags: ["Cellular routers", "Managed switches", "Remote monitoring"],
  },
  {
    icon: Zap,
    title: "Energy & Utilities",
    image: energyImg,
    desc: "Secure remote access for substations, solar farms and smart-grid assets. Reliable backhaul where wired lines can't reach.",
    tags: ["4G/5G routers", "VPN", "Outdoor enclosures"],
  },
  {
    icon: Building2,
    title: "Smart City",
    image: smartcityImg,
    desc: "Connect traffic systems, smart streetlights, CCTV and environmental sensors with PoE-powered ConnectLH™ switches and outdoor radios.",
    tags: ["PoE switches", "Surveillance", "UBR links"],
  },
  {
    icon: Truck,
    title: "Transportation & Fleet",
    image: transportationImg,
    desc: "On-board connectivity for fleet vehicles, public transit and logistics — GPS, telematics and passenger Wi-Fi on one platform.",
    tags: ["In-vehicle routers", "GPS", "Wi-Fi"],
  },
  {
    icon: Briefcase,
    title: "Enterprise & Branch",
    image: enterpriseImg,
    desc: "Day-one branch rollouts and 4G/5G failover for retail, banking and corporate offices. Centrally managed across 18 circles.",
    tags: ["SD-WAN failover", "Site rollouts", "NOC"],
  },
  {
    icon: ShoppingBag,
    title: "Retail & POS",
    image: retailImg,
    desc: "Always-on connectivity for POS terminals, payment devices and digital signage. Zero-touch deployment to hundreds of stores.",
    tags: ["POS uplink", "Digital signage", "Zero-touch"],
  },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-12 lg:mb-16"
        >
          <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
            Industries we serve
          </div>
          <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
            ConnectLH™ in action
            <br />
            <span className="text-muted-foreground">across every sector.</span>
          </h2>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            From smart factories to remote substations, our routers, switches and antenna systems
            power mission-critical connectivity for India's most demanding industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {useCases.map((uc, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              className="group relative bg-background rounded-3xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  loading="lazy"
                  decoding="async"
                  src={uc.image}
                  alt={uc.title}
                  width={800}
                  height={640}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className="absolute top-4 left-4 h-10 w-10 rounded-xl bg-background/95 backdrop-blur flex items-center justify-center">
                  <uc.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4 text-accent-foreground" />
                </div>
              </div>

              <div className="p-6 lg:p-7">
                <h3 className="display-headline text-foreground text-xl lg:text-2xl mb-3">
                  {uc.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{uc.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {uc.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
