import { useEffect, useMemo, useRef, useState } from "react";

interface AnimatedCounterProps {
  to: number;
  duration?: number; // ms
  suffix?: string;
  prefix?: string;
  className?: string;
}

// Simple, dependency-free animated number counter
export default function AnimatedCounter({ to, duration = 1500, suffix = "", prefix = "", className }: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const formatted = useMemo(() => `${prefix}${Math.round(value).toLocaleString()}${suffix}`,[prefix, suffix, value]);

  useEffect(() => {
    const start = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - (startRef.current ?? 0);
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(to * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(start);
      }
    };

    rafRef.current = requestAnimationFrame(start);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [to, duration]);

  return <span className={className}>{formatted}</span>;
}
