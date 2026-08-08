import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Pause, Play } from "lucide-react";
import filmDesign from "@/assets/film-design.jpg";
import filmRail from "@/assets/film-rail.jpg";
import filmPower from "@/assets/film-power.jpg";
import filmPorts from "@/assets/film-ports.jpg";
import filmTransport from "@/assets/film-transport.jpg";
import filmOperations from "@/assets/film-operations.jpg";
import filmHighway from "@/assets/film-highway.jpg";
import filmLogistics from "@/assets/film-logistics.jpg";

export type FilmScene = {
  image: string;
  alt: string;
  line1: string;
  line2?: string;
  caption?: string;
  duration: number;
};

const scenes: FilmScene[] = [
  {
    image: filmDesign,
    alt: "Two engineers reviewing network design on a screen in a bright studio",
    line1: "It starts with",
    line2: "an idea.",
    caption: "Design & engineering",
    duration: 4200,
  },
  {
    image: filmHighway,
    alt: "Aerial view of a highway corridor cutting through green landscape",
    line1: "We plan the",
    line2: "routes that connect.",
    caption: "Surveys & planning",
    duration: 4200,
  },
  {
    image: filmRail,
    alt: "Commuter boarding a modern train at a busy platform",
    line1: "We keep people",
    line2: "moving.",
    caption: "Railways & metro",
    duration: 4200,
  },
  {
    image: filmPower,
    alt: "Engineer inspecting a solar array with a tablet",
    line1: "We keep the",
    line2: "power flowing.",
    caption: "Power & utilities",
    duration: 4200,
  },
  {
    image: filmPorts,
    alt: "Port terminal with gantry cranes working a container vessel",
    line1: "We keep trade",
    line2: "on schedule.",
    caption: "Ports & logistics",
    duration: 4200,
  },
  {
    image: filmTransport,
    alt: "City expressway at golden hour with traffic flowing",
    line1: "We keep cities",
    line2: "running.",
    caption: "Transportation",
    duration: 4200,
  },
  {
    image: filmOperations,
    alt: "Colleagues walking and talking inside a bright operations facility",
    line1: "200+ engineers.",
    line2: "18 circles. Every day.",
    caption: "Managed services & resources",
    duration: 4200,
  },
  {
    image: filmLogistics,
    alt: "Automated container yard with equipment and stacked containers",
    line1: "Putting Imagination",
    line2: "to work.",
    caption: "uConnect Technologies",
    duration: 5200,
  },
];

interface HeroFilmProps {
  onClose: () => void;
}

const HeroFilm = ({ onClose }: HeroFilmProps) => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  // Preload the next frame so cuts stay seamless
  useEffect(() => {
    const next = scenes[i + 1];
    if (!next) return;
    const img = new Image();
    img.src = next.image;
  }, [i]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      if (i === scenes.length - 1) onClose();
      else setI((v) => v + 1);
    }, scenes[i].duration);
    return () => clearTimeout(t);
  }, [i, paused, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const scene = scenes[i];

  return (
    <div className="absolute inset-0 z-30 bg-primary">
      {/* Frames */}
      <AnimatePresence mode="sync">
        <motion.img
          key={scene.image}
          src={scene.image}
          alt={scene.alt}
          initial={{ opacity: 0, scale: 1.14 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.1, ease: "easeInOut" },
            scale: { duration: scene.duration / 1000 + 1.4, ease: "linear" },
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Cinematic grade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 8% / 0.5) 0%, hsl(222 47% 8% / 0.15) 45%, hsl(222 47% 8% / 0.82) 100%)",
        }}
      />

      {/* Captions */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-20 lg:pb-28">
        <AnimatePresence mode="wait">
          <motion.div key={scene.line1} className="max-w-3xl">
            {scene.caption && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-8 bg-accent" />
                <span className="t-eyebrow text-on-media/80">{scene.caption}</span>
              </motion.div>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
              transition={{ duration: 0.85, ease: "easeOut", delay: 0.25 }}
              className="display-headline mt-4 text-on-media text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {scene.line1}
              {scene.line2 && (
                <>
                  <br />
                  <span className={i === scenes.length - 1 ? "text-accent" : ""}>{scene.line2}</span>
                </>
              )}
            </motion.h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Resume film" : "Pause film"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur transition-transform hover:scale-105"
        >
          {paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
        </button>
        <button
          onClick={onClose}
          aria-label="Close film"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur transition-transform hover:scale-105"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chapter progress */}
      <div className="absolute bottom-6 left-0 right-0 z-10 container mx-auto px-4">
        <div className="flex items-center gap-1.5">
          {scenes.map((s, idx) => (
            <button
              key={s.line1}
              onClick={() => setI(idx)}
              aria-label={`Chapter ${idx + 1}`}
              className="h-[3px] flex-1 overflow-hidden rounded-full bg-on-media/25"
            >
              <motion.span
                className="block h-full bg-on-media"
                initial={{ width: idx < i ? "100%" : "0%" }}
                animate={{ width: idx < i ? "100%" : idx === i ? "100%" : "0%" }}
                transition={
                  idx === i
                    ? { duration: s.duration / 1000, ease: "linear" }
                    : { duration: 0.2 }
                }
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroFilm;
