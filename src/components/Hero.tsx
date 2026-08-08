import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Play,
  Activity,
  Radio,
  Users,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import HeroFilm from "@/components/HeroFilm";
import sectorDesign from "@/assets/film-design.jpg";
import sectorRailways from "@/assets/film-rail.jpg";
import sectorPower from "@/assets/film-power.jpg";
import sectorPorts from "@/assets/film-ports.jpg";
import sectorTransport from "@/assets/film-transport.jpg";
import sectorOperations from "@/assets/film-operations.jpg";
import sectorAviation from "@/assets/film-aviation.jpg";

const sectorFrames = [
  {
    image: sectorDesign,
    label: "Design & engineering",
    alt: "Engineers reviewing an infrastructure design together on screen",
  },
  {
    image: sectorRailways,
    label: "Railways",
    alt: "Commuter boarding a modern train at a busy platform",
  },
  {
    image: sectorPower,
    label: "Power",
    alt: "Engineer inspecting a solar array with a tablet",
  },
  {
    image: sectorPorts,
    label: "Ports & logistics",
    alt: "Port terminal with gantry cranes working a container vessel",
  },
  {
    image: sectorTransport,
    label: "Transportation",
    alt: "City expressway at golden hour with traffic flowing",
  },
  {
    image: sectorOperations,
    label: "Day-to-day operations",
    alt: "Colleagues walking and talking inside a bright operations facility",
  },
  {
    image: sectorAviation,
    label: "Aviation",
    alt: "Traveller crossing an airport boarding bridge",
  },
];

const serviceCards = [
  {
    icon: Activity,
    title: "Managed services",
    desc: "24×7 NOC monitoring, SLA-backed incident response and field maintenance that keeps enterprise networks running.",
    href: "/managed-services",
  },
  {
    icon: Radio,
    title: "Network deployment",
    desc: "RF planning, I&C, UBR, fiber and switching rollouts — commissioned and handed over with acceptance reports.",
    href: "/networks",
  },
  {
    icon: Users,
    title: "Resources management",
    desc: "Dedicated or project-based Tier-1 engineering teams deployed, managed and scaled by uConnect.",
    href: "/resource-management",
  },
  {
    icon: Building2,
    title: "Infra solutions",
    desc: "Tower and pole erection, civil and electrical works, and passive infrastructure built to carrier standards.",
    href: "/infra-installation",
  },
];

const logos = [
  { src: "/clients/airtel.jpg", name: "Airtel" },
  { src: "/clients/jio.png", name: "Jio" },
  { src: "/clients/vi.jpg", name: "Vi" },
  { src: "/clients/bsnl.png", name: "BSNL" },
  { src: "/clients/railtel.jpg", name: "RailTel" },
  { src: "/clients/wipro.webp", name: "Wipro" },
  { src: "/clients/siemens.jpg", name: "Siemens" },
  { src: "/clients/alstom.jpg", name: "Alstom" },
];

const stats = [
  { value: 200, suffix: "+", label: "Tier-1 engineers" },
  { value: 10000, suffix: "+", label: "Links deployed" },
  { value: 18, suffix: "", label: "Circles served" },
  { value: 5, suffix: "", label: "Warehouses" },
];

const Hero = () => {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Ambient sector montage — pauses while the film plays
  useEffect(() => {
    if (playing) return;
    const t = setInterval(() => setFrame((f) => (f + 1) % sectorFrames.length), 4200);
    return () => clearInterval(t);
  }, [playing]);

  const startFilm = () => setPlaying(true);
  const stopFilm = () => setPlaying(false);

  const sector = sectorFrames[frame];

  return (
    <>
      {/* Cinematic hero — ambient sector montage with a play-to-watch film */}
      <section className="relative h-[88svh] min-h-[520px] w-full overflow-hidden bg-primary">
        {/* Ambient still montage (Ken Burns) */}
        <AnimatePresence mode="sync">
          {!playing && (
            <motion.img
              key={sector.image}
              src={sector.image}
              alt={sector.alt}
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: "linear" } }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </AnimatePresence>

        {/* Legibility scrim */}
        {!playing && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, hsl(222 47% 8% / 0.55) 0%, hsl(222 47% 8% / 0.25) 40%, hsl(222 47% 8% / 0.75) 100%)",
            }}
          />
        )}

        {/* The film — real photography with Arcadis-style on-screen titles */}
        {playing && <HeroFilm onClose={stopFilm} />}

        <AnimatePresence>
          {!playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16 lg:pb-24"
            >
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="max-w-4xl"
              >
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-accent" />
                  <span className="t-eyebrow text-on-media/80">uConnect Technologies</span>
                </div>
                <h1 className="display-headline mt-6 text-on-media text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-8xl">
                  Putting Imagination
                  <br />
                  to <span className="text-accent">work</span>
                </h1>
                <p className="mt-6 t-body-lg text-on-media/80 max-w-xl">
                  Design, project management and day-to-day operations — plus our own ConnectLH™
                  product line — across telecom, railways, power, transportation and ports.
                </p>
              </motion.div>

              <button
                onClick={startFilm}
                className="group absolute bottom-16 right-4 lg:bottom-24 lg:right-8 inline-flex items-center gap-4 text-left"
                aria-label="Play the uConnect film"
              >
                <span className="t-eyebrow text-on-media/85 group-hover:text-on-media">
                  Watch the film
                </span>
                <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-on-media/95 text-primary transition-transform duration-300 group-hover:scale-110">
                  <span className="absolute inset-0 rounded-full border border-on-media/50 animate-ping" />
                  <Play className="h-6 w-6 translate-x-[1px] fill-current" />
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!playing && (
          <button
            onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Scroll to content"
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-on-media/70 hover:text-on-media transition-colors"
          >
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </button>
        )}
      </section>

      <section id="home" className="relative bg-background overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 -right-24 h-[36rem] w-[36rem] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.18), transparent 70%)" }}
        />

        <div className="container mx-auto px-4 pt-16 pb-10 lg:pt-24 lg:pb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="t-eyebrow text-accent">What we do</span>
              <span className="h-px w-10 bg-accent" />
            </div>
            <h2 className="t-display mt-6 text-foreground">
              One partner for India&apos;s
              <br />
              <span className="text-accent">network infrastructure</span>
            </h2>
            <p className="mt-6 t-body-lg text-muted-foreground max-w-2xl mx-auto">
              We design, deploy, operate and maintain enterprise networks — supplying our own
              ConnectLH™ hardware and backing it with 200+ Tier-1 engineers across 18 circles.
            </p>
          </motion.div>

          <div className="mt-12 grid md:grid-cols-2 gap-4 lg:gap-5">
            {serviceCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
              >
                <Link
                  to={card.href}
                  className="group flex items-start gap-5 rounded-2xl border border-border bg-card p-6 lg:p-8 hover:border-accent/40 hover:shadow-lg transition-all"
                >
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center transition-colors group-hover:bg-accent/15">
                    <card.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="t-h3 text-foreground group-hover:text-accent transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-2 t-body-sm text-muted-foreground">{card.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-1 t-micro text-accent font-semibold">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ConnectLH integrator banner */}
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-primary text-primary-foreground p-6 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10"
          >
            <div className="flex-1">
              <div className="t-eyebrow text-primary-foreground/70 mb-3">The product side</div>
              <h3 className="t-h2 text-primary-foreground">
                ConnectLH™ — our own hardware line
              </h3>
              <p className="mt-4 text-primary-foreground/80 text-sm lg:text-base leading-relaxed max-w-2xl">
                Dish and sector antennas, PoE injectors, RF accessories and outdoor enclosures,
                stocked in regional warehouses and installed by the same team that supplies them.
                That is what makes us an integrator rather than a reseller or a labour vendor.
              </p>
            </div>
            <Link to="/products" className="flex-shrink-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold text-sm">
                Browse products <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Stat ticker */}
        <div className="container mx-auto px-4 mt-10 lg:mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border border-y border-border">
            {stats.map((s) => (
              <div key={s.label} className="px-5 py-6 lg:py-8">
                <div className="display-headline text-2xl lg:text-3xl text-foreground">
                  <AnimatedCounter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1.5 t-micro text-muted-foreground uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Positioning statement and client trust */}
        <div className="bg-background py-14 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="display-headline text-foreground text-2xl sm:text-3xl lg:text-5xl max-w-4xl mx-auto"
            >
              A product &amp; services integrator for enterprise networks
            </motion.h2>
            <p className="mt-5 text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
              We supply our own ConnectLH™ hardware and integrate it with four service lines —
              managed services, network deployment, resources management and infra solutions —
              under one contract and one accountable team.
            </p>

            {/* Client trust strip */}
            <div className="mt-12 lg:mt-16 pt-10 border-t border-border">
              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.18em]">
                Trusted by India&apos;s operators, integrators &amp; enterprises
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-8 items-center">
                {logos.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={`${logo.name} — uConnect Technologies client`}
                    loading="lazy"
                    decoding="async"
                    className="h-8 lg:h-10 w-full object-contain opacity-55 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Hero;
