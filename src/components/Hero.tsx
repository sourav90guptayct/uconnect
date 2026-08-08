import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { ArrowRight, ArrowUpRight, ChevronDown, Play } from "lucide-react";
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
  { image: sectorDesign, label: "Design & engineering", alt: "Engineers reviewing an infrastructure design together on screen" },
  { image: sectorRailways, label: "Railways", alt: "Commuter boarding a modern train at a busy platform" },
  { image: sectorPower, label: "Power", alt: "Engineer inspecting a solar array with a tablet" },
  { image: sectorPorts, label: "Ports & logistics", alt: "Port terminal with gantry cranes working a container vessel" },
  { image: sectorTransport, label: "Transportation", alt: "City expressway at golden hour with traffic flowing" },
  { image: sectorOperations, label: "Day-to-day operations", alt: "Colleagues walking and talking inside a bright operations facility" },
  { image: sectorAviation, label: "Aviation", alt: "Traveller crossing an airport boarding bridge" },
];




const slides = [
  {
    kicker: "Solutions we have implemented",
    word: "Ports",
    body: "High-throughput fibre, wireless backhaul and IP networks designed for port terminals, container yards and logistics hubs.",
    ctaLabel: "Explore our services",
    ctaHref: "/services",
    image: sectorPorts,
    imageAlt: "Container port with gantry cranes and connected operations",
  },
  {
    kicker: "Solutions we have implemented",
    word: "Railways",
    body: "Mission-critical telecom and signalling networks for metro, mainline and rail operations across India.",
    ctaLabel: "Explore our services",
    ctaHref: "/services",
    image: sectorRailways,
    imageAlt: "Modern railway platform with trackside connectivity equipment",
  },
  {
    kicker: "Solutions we have implemented",
    word: "Airports",
    body: "Converged wireless, wireline and CCTV infrastructure for passenger operations, baggage and security.",
    ctaLabel: "Explore our services",
    ctaHref: "/services",
    image: sectorAviation,
    imageAlt: "Airport terminal boarding bridge and connected systems",
  },
  {
    kicker: "Solutions we have implemented",
    word: "Wireless & Wireline",
    body: "Multi-gigabit wireless backhaul and structured fibre networks for campuses, cities and large enterprises.",
    ctaLabel: "Explore our services",
    ctaHref: "/networks",
    image: sectorDesign,
    imageAlt: "Engineers designing high-capacity network on screen",
  },
  {
    kicker: "Solutions we have implemented",
    word: "Smart CCTV",
    body: "End-to-end IP surveillance solutions with network design, cameras, storage and analytics for safe operations.",
    ctaLabel: "Explore our services",
    ctaHref: "/services",
    image: sectorOperations,
    imageAlt: "Operators monitoring CCTV and network dashboards",
  },
  {
    kicker: "Solutions we have implemented",
    word: "Skilled resources",
    body: "Certified engineers, technicians and project managers deployed across network, IT and infrastructure roles.",
    ctaLabel: "Explore our services",
    ctaHref: "/careers",
    image: sectorTransport,
    imageAlt: "Field team deploying connectivity across transport corridors",
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


const Hero = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  // Ambient sector montage — pauses while the film plays
  useEffect(() => {
    if (playing) return;
    const t = setInterval(() => setFrame((f) => (f + 1) % sectorFrames.length), 4200);
    return () => clearInterval(t);
  }, [playing]);

  const startFilm = () => setPlaying(true);
  const stopFilm = () => setPlaying(false);


  const slide = slides[index];
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

      {/* Soft light wash instead of a dark scrim */}
      <div
        className="pointer-events-none absolute -top-40 -right-24 h-[36rem] w-[36rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.18), transparent 70%)" }}
      />

      <div className="container mx-auto px-4 pt-10 pb-6 lg:pt-16 lg:pb-10 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Editorial headline column */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={slide.kicker}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="t-eyebrow text-accent"
                >
                  {slide.kicker}
                </motion.span>
              </AnimatePresence>
            </div>

            <h1 className="display-headline mt-6 text-foreground text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-7xl">
              We design <span className="text-accent">networks</span>
              <br />
              for seamless operations.
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={slide.body}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 t-body-lg text-muted-foreground max-w-xl"
              >
                {slide.body}
              </motion.p>
            </AnimatePresence>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to={slide.ctaHref}>
                <Button variant="cta" size="xl" className="w-full sm:w-auto">
                  {slide.ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Solution selector */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {slides.map((s, i) => (
                <button
                  key={s.word}
                  onClick={() => setIndex(i)}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  className="group text-left"
                  aria-label={`Show ${s.word}`}
                >
                  <span
                    className={`block h-[3px] rounded-full transition-colors duration-300 ${
                      i === index ? "bg-accent" : "bg-border group-hover:bg-foreground/25"
                    }`}
                  />
                  <span
                    className={`mt-2 block t-micro transition-colors ${
                      i === index ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.word}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Photo mosaic */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-5 grid-rows-6 gap-3 sm:gap-4 h-[380px] sm:h-[460px] lg:h-[560px]">
              {/* Featured tile — swaps with the slide */}
              <div className="col-span-3 row-span-6 relative rounded-[1.5rem] overflow-hidden bg-muted">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slide.image}
                    src={slide.image}
                    alt={slide.imageAlt}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    {...{ fetchpriority: "high" }}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Static supporting tiles */}
              <div className="col-span-2 row-span-3 rounded-[1.5rem] overflow-hidden bg-muted">
                <img
                  src={sectorPorts}
                  alt="Container port with gantry cranes loading a vessel"

                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-2 row-span-3 rounded-[1.5rem] border border-border bg-card p-5 flex flex-col justify-between">
                <div className="t-eyebrow text-muted-foreground">Since 2017</div>
                <div>
                  <div className="display-headline text-3xl lg:text-4xl text-foreground">
                    <AnimatedCounter to={15} suffix="+" />
                  </div>
                  <div className="mt-1 t-micro text-muted-foreground">Enterprise customers</div>

                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1 t-micro text-accent hover:underline"
                >
                  Our story <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Positioning statement */}
      <div className="bg-background py-10 lg:py-14">
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
          <div className="mt-8 lg:mt-12 pt-8 border-t border-border">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.18em]">
              Trusted by India's operators, integrators &amp; enterprises
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
