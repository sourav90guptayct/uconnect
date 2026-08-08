import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Eyebrow, Headline } from "../components/Type";
import { NAVY_GRADIENT, COLORS } from "../theme";
import { body } from "../fonts";

const sectors = [
  { label: "Telecom", src: "images/hero-tile-tower.jpg" },
  { label: "Railways & Metro", src: "images/film-rail.jpg" },
  { label: "Power & Utilities", src: "images/film-power.jpg" },
  { label: "Transportation", src: "images/film-transport.jpg" },
  { label: "Ports & Logistics", src: "images/film-ports.jpg" },
  { label: "Aviation", src: "images/film-aviation.jpg" },
];

export const SceneSectors: React.FC<{ span: number }> = ({ span }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: NAVY_GRADIENT }}>
      <AbsoluteFill
        style={{
          opacity: 0.14,
          backgroundImage: `url(${staticFile("images/networks-station.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <AbsoluteFill style={{ padding: "70px 110px 70px" }}>
        <Eyebrow>Industries we serve</Eyebrow>
        <Headline text="Serving multiple sectors." delay={12} size={76} maxWidth={860} />

        <div
          style={{
            marginTop: 36,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "1fr 1fr",
            gap: 20,
            flex: 1,
            minHeight: 0,
          }}
        >
          {sectors.map((s, i) => {
            const start = 48 + i * 10;
            const enter = spring({
              frame: frame - start,
              fps,
              config: { damping: 200 },
              durationInFrames: 30,
            });
            const zoom = interpolate(frame, [start, span], [1.04, 1.16], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={s.label}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 20,
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 44}px)`,
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Img
                  src={staticFile(s.src)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${zoom})`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(7,19,36,0) 40%, rgba(7,19,36,0.88) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 26,
                    bottom: 22,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: COLORS.accent,
                      display: "block",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: body,
                      fontSize: 30,
                      fontWeight: 600,
                      color: "#fff",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
