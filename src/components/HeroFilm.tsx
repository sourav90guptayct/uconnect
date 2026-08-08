import { useEffect, useRef, useState } from "react";
import { X, Pause, Play, Volume2, VolumeX } from "lucide-react";
import filmAsset from "@/assets/uconnect-hero-film.mp4.asset.json";

interface HeroFilmProps {
  onClose: () => void;
}

const HeroFilm = ({ onClose }: HeroFilmProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
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
    <div className="absolute inset-0 z-30 bg-primary flex items-center justify-center">
      <video
        ref={videoRef}
        src={filmAsset.url}
        autoPlay
        muted={muted}
        playsInline
        controls={false}
        onEnded={onClose}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress((v.currentTime / v.duration) * 100);
        }}
        className="h-full w-full max-w-full max-h-full object-contain sm:object-cover"
      />

      {/* Controls */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute film" : "Mute film"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur transition-transform hover:scale-105"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
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
