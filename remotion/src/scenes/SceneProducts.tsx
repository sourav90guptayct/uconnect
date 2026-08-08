import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Eyebrow, Headline } from "../components/Type";
import { NAVY_GRADIENT, COLORS } from "../theme";
import { body, display } from "../fonts";

const products = [
  { label: "ConnectLH™ Routers", src: "products/clh500-router.jpg" },
  { label: "Managed Switches", src: "products/clh304-switch.jpg" },
  { label: "Dish & Sector Antennas", src: "products/dish-antenna-32dbi.jpg" },
  { label: "PoE & Power", src: "products/category-poe.png" },
  { label: "Fiber & RF Cables", src: "products/fiber-optic-hero.webp" },
  { label: "Racks & Enclosures", src: "products/data-centre-rack.jpg" },
];

export const SceneProducts: React.FC<{ span: number }> = ({ span }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Final lock-up takes over the last ~2.5s
  const outro = interpolate(frame, [span - 92, span - 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: NAVY_GRADIENT }}>
      <AbsoluteFill style={{ padding: "64px 100px 96px", opacity: 1 - outro }}>
        <Eyebrow>Products</Eyebrow>
        <Headline
          text="Kept moving by uConnect industrial-grade products."
          delay={12}
          size={64}
          maxWidth={980}
          accentFrom={3}
        />

        <div
          style={{
            marginTop: 30,
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 20,
            height: 560,
          }}
        >
          {products.map((p, i) => {
            const start = 44 + i * 7;
            const enter = spring({
              frame: frame - start,
              fps,
              config: { damping: 18, stiffness: 140 },
              durationInFrames: 34,
            });
            const float = Math.sin((frame - start) / 26 + i) * 6;
            return (
              <div
                key={p.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 50 + float}px)`,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    borderRadius: 18,
                    background: "rgba(255,255,255,0.94)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 18,
                  }}
                >
                  <Img
                    src={staticFile(p.src)}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <div
                  style={{
                    marginTop: 14,
                    fontFamily: body,
                    fontSize: 19,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.25,
                  }}
                >
                  {p.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Outro lock-up */}
      <AbsoluteFill
        style={{
          opacity: outro,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: display,
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: "-0.035em",
            color: "#fff",
            transform: `translateY(${(1 - outro) * 26}px)`,
            textAlign: "center",
          }}
        >
          Putting Imagination{" "}
          <span style={{ color: COLORS.accent }}>to work.</span>
        </div>
        <div
          style={{
            marginTop: 30,
            height: 2,
            width: interpolate(frame, [span - 62, span - 20], [0, 300], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            background: COLORS.accent,
          }}
        />
        <div
          style={{
            marginTop: 28,
            fontFamily: body,
            fontSize: 26,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.78)",
          }}
        >
          uConnect Technologies
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
