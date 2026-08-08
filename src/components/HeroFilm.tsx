import { useEffect, useRef, useState } from "react";
import { X, Pause, Play } from "lucide-react";
import filmAsset from "@/assets/uconnect-hero-film.mp4.asset.json";

interface HeroFilmProps {
  onClose: () => void;
}

const HeroFilm = ({ onClose }: HeroFilmProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <div className="absolute inset-0 z-30 bg-primary">
      <video
        ref={videoRef}
        src={filmAsset.url}
        autoPlay
        muted
        playsInline
        onEnded={onClose}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress((v.currentTime / v.duration) * 100);
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Controls */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        <button
          onClick={toggle}
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

      {/* Progress */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-on-media/25">
        <div className="h-full bg-accent transition-[width] duration-200" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default HeroFilm;
