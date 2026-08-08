import { motion } from "framer-motion";
import { Wifi, Shield, TrainFront, Zap, Factory, Server, ArrowUpRight } from "lucide-react";
import telecomAsset from "@/assets/telecom-connectivity.jpg.asset.json";
import governmentImg from "@/assets/networks-smartcity.png";
import railImg from "@/assets/networks-rail.jpg";
import energyImg from "@/assets/networks-utility.jpg";
import enterpriseImg from "@/assets/usecase-industrial.jpg";
import digitalImg from "@/assets/networks-datacenter.png";

const telecomImg = telecomAsset.url;

const useCases = [
  {
    icon: Wifi,
    title: "Telecommunications",
    image: telecomImg,
    desc: "Carriers, ISPs, WISPs, tower companies and system integrators rely on our ConnectLH™ hardware and rollout playbooks for rapid, reliable network expansion.",
    tags: ["ConnectLH™", "Antennas & radios", "Turnkey rollouts"],
  },
  {
    icon: Shield,
    title: "Government & Public Safety",
    image: governmentImg,
    desc: "Police, smart cities, government networks, defense and emergency communications — mission-critical connectivity built for public service.",
    tags: ["Secure backhaul", "Smart city", "Surveillance"],
  },
  {
    icon: TrainFront,
    title: "Rail & Transportation",
    image: railImg,
    desc: "Railways, metro, highways, airports, ports and intelligent transportation systems stay connected with ruggedized radios and managed networks.",
    tags: ["Rail backhaul", "Onboard Wi-Fi", "ITS networks"],
  },
  {
    icon: Zap,
    title: "Energy & Utilities",
    image: energyImg,
    desc: "Power, renewable energy, electricity distribution and water utilities use our outdoor enclosures and 4G/5G routers for secure remote operations.",
    tags: ["Smart grid", "Substation backhaul", "Remote monitoring"],
  },
  {
    icon: Factory,
    title: "Enterprise & Industrial",
    image: enterpriseImg,
    desc: "Manufacturing, mining, logistics, oil & gas, warehouses and large campuses get redundant, high-capacity connectivity for automation and operations.",
    tags: ["Industrial Wi-Fi", "Private networks", "SD-WAN"],
  },
  {
    icon: Server,
    title: "Digital Infrastructure",
    image: digitalImg,
    desc: "Data centers, cloud infrastructure, edge computing and enterprise networks run on our structured cabling, PoE solutions and fiber/RF systems.",
    tags: ["Data center cabling", "Edge connectivity", "Fiber & RF"],
  },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="py-14 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-8 lg:mb-12"
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
            From telecom carriers and government networks to data centers and industrial campuses, we deliver integrated products and services for India's most demanding infrastructure.
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
