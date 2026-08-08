import { interpolate, useCurrentFrame } from "remotion";
import { display, body } from "../fonts";
import { COLORS } from "../theme";

export const Eyebrow: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 6,
}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame - delay, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const w = interpolate(frame - delay, [0, 26], [0, 64], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: o }}>
      <div style={{ height: 2, width: w, background: COLORS.accent }} />
      <span
        style={{
          fontFamily: body,
          color: "rgba(255,255,255,0.82)",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        {children}
      </span>
    </div>
  );
};

/** Word-by-word blur-up reveal. */
export const Headline: React.FC<{
  text: string;
  delay?: number;
  size?: number;
  accentFrom?: number;
  maxWidth?: number;
}> = ({ text, delay = 14, size = 116, accentFrom, maxWidth = 1180 }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  return (
    <h1
      style={{
        fontFamily: display,
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: "-0.03em",
        color: COLORS.onMedia,
        margin: 0,
        marginTop: 26,
        maxWidth,
        fontWeight: 700,
        display: "flex",
        flexWrap: "wrap",
        columnGap: "0.28em",
      }}
    >
      {words.map((word, i) => {
        const f = frame - delay - i * 4;
        const o = interpolate(f, [0, 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(f, [0, 22], [46, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const blur = interpolate(f, [0, 20], [12, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              opacity: o,
              transform: `translateY(${y}px)`,
              filter: `blur(${blur}px)`,
              color:
                accentFrom !== undefined && i >= accentFrom
                  ? COLORS.accent
                  : undefined,
            }}
          >
            {word}
          </span>
        );
      })}
    </h1>
  );
};
