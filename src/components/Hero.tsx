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
    kicker: "Design & project management",
    word: "designed",
    body: "Surveys, network and system design, and end-to-end project management for telecom, railway, power and transport programmes.",
    ctaLabel: "Explore our services",
    ctaHref: "/services",
    image: sectorDesign,
    imageAlt: "Engineers reviewing an infrastructure design on a tablet in a bright office",
  },
  {
    kicker: "Day-to-day operations",
    word: "operated",
    body: "24×7 monitoring, field response and SLA-backed operations across multiple verticals so your team stays focused on growth.",
    ctaLabel: "Explore managed services",
    ctaHref: "/managed-services",
    image: sectorOperations,
    imageAlt: "Operators monitoring dashboards inside a bright network operations centre",
  },
  {
    kicker: "ConnectLH™ product line",
    word: "connected",
    body: "Our own hardware line — connectivity, PoE and outdoor equipment deployed across telecom, railways, power, transportation and ports.",
    ctaLabel: "View products",
    ctaHref: "/products",
    image: sectorRailways,
    imageAlt: "Modern electric train at a station platform with trackside equipment cabinets",
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

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    onClick={startFilm}
                    className="group inline-flex items-center gap-4 text-left"
                    aria-label="Play the uConnect film"
                  >
                    <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-on-media/95 text-primary transition-transform duration-300 group-hover:scale-110">
                      <span className="absolute inset-0 rounded-full border border-on-media/50 animate-ping" />
                      <Play className="h-6 w-6 translate-x-[1px] fill-current" />
                    </span>
                    <span className="t-eyebrow text-on-media/85 group-hover:text-on-media">
                      Watch the film
                    </span>
                  </button>

                  <Link to="/services" className="sm:ml-4">
                    <Button variant="cta" size="xl" className="w-full sm:w-auto">
                      What we do
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

              </motion.div>
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
              India&apos;s networks,
              <br />
              <span className="relative inline-flex items-baseline">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={slide.word}
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="text-accent"
                  >
                    {slide.word}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              <span className="text-muted-foreground">end to end.</span>
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
              <Button
                size="xl"
                variant="outline"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Talk to an engineer
              </Button>
            </div>

            {/* Slide selector as labelled rails */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-6">
              {slides.map((s, i) => (
                <button
                  key={s.kicker}
                  onClick={() => setIndex(i)}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  className="group text-left flex-1"
                  aria-label={`Show ${s.kicker}`}
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
                    {s.kicker}
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

      {/* Stat ticker */}
      <div className="container mx-auto px-4">
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

      {/* Positioning statement */}
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
