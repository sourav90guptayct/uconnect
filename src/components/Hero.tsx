import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/networks-hero.jpg";

const slides = [
  {
    eyebrow: "Managed services",
    titleA: "Your network,",
    titleB: "our watch.",
    body: "24×7 monitoring, field response and SLA-backed operations so your team stays focused on growth, not troubleshooting.",
    ctaLabel: "Explore managed services",
    ctaHref: "/managed-services",
  },
  {
    eyebrow: "ConnectLH™ product line",
    titleA: "Carrier-grade radios,",
    titleB: "built for the field.",
    body: "Dish and sector antennas, PoE injectors and outdoor accessories — 10,000+ Links already deployed across India.",
    ctaLabel: "View products",
    ctaHref: "/products",
  },
  {
    eyebrow: "Network deployment",
    titleA: "Towers, fiber, rollout —",
    titleB: "one partner.",
    body: "200+ Tier-1 engineers across 18 circles, backed by 5 regional warehouses for rapid pan-India deployment.",
    ctaLabel: "See our networks work",
    ctaHref: "/networks",
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

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + slides.length) % slides.length);

  const slide = slides[index];

  return (
    <section id="home" className="relative">
      {/* Full-bleed photographic band */}
      <div
        className="relative min-h-[620px] lg:min-h-[720px] flex items-center overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <img
          src={heroImg}
          alt="Telecom tower and microwave links deployed by uConnect Technologies at sunset"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Legibility scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40" />

        <div className="container mx-auto px-4 relative z-10 py-24 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Rotating message card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="rounded-3xl border border-primary-foreground/15 bg-primary/30 backdrop-blur-xl p-7 lg:p-10 shadow-2xl max-w-2xl"
                >
                  <div className="text-xs lg:text-sm font-semibold text-accent uppercase tracking-[0.18em]">
                    {slide.eyebrow}
                  </div>
                  <h1 className="display-headline mt-4 text-primary-foreground text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                    {slide.titleA}
                    <br />
                    <span className="text-primary-foreground/70">{slide.titleB}</span>
                  </h1>
                  <p className="mt-5 text-sm lg:text-base text-primary-foreground/75 leading-relaxed max-w-xl">
                    {slide.body}
                  </p>
                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <Link to={slide.ctaHref}>
                      <Button variant="cta" size="xl" className="w-full sm:w-auto">
                        {slide.ctaLabel}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      size="xl"
                      variant="ghost"
                      className="text-primary-foreground border border-primary-foreground/25 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Talk to an engineer
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slide controls */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Show slide ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index
                          ? "w-8 bg-accent"
                          : "w-3 bg-primary-foreground/35 hover:bg-primary-foreground/60"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Previous slide"
                    onClick={() => go(-1)}
                    className="h-9 w-9 rounded-full border border-primary-foreground/25 text-primary-foreground/80 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="Next slide"
                    onClick={() => go(1)}
                    className="h-9 w-9 rounded-full border border-primary-foreground/25 text-primary-foreground/80 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Credibility panel */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="lg:col-span-5 hidden lg:block"
            >
              <div className="ml-auto max-w-sm rounded-3xl border border-primary-foreground/15 bg-primary/25 backdrop-blur-xl p-8">
                <div className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-[0.18em]">
                  Since 2017
                </div>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
                  {[
                    { value: 200, suffix: "+", label: "Tier-1 engineers" },
                    { value: 10000, suffix: "+", label: "Links deployed" },
                    { value: 18, suffix: "", label: "Circles served" },
                    { value: 5, suffix: "", label: "Warehouses" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="display-headline text-3xl xl:text-4xl text-primary-foreground">
                        <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="mt-1.5 text-[11px] text-primary-foreground/60 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
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
            Single-window partner for enterprise telecom &amp; IT infrastructure
          </motion.h2>
          <p className="mt-5 text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
            Carrier-grade products. Pan-India deployment. Operations that never sleep.
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
  );
};
export default Hero;
