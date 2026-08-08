import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { KenBurns } from "../components/KenBurns";
import { Eyebrow, Headline } from "../components/Type";
import { SCRIM, COLORS } from "../theme";
import { body } from "../fonts";

export const SceneConnected: React.FC<{ span: number }> = ({ span }) => {
  const frame = useCurrentFrame();
  const second = interpolate(frame, [span * 0.5, span * 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line = interpolate(frame, [24, 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#071324" }}>
      <KenBurns src="images/hero-tile-noc.jpg" span={span} from={1.06} to={1.2} panX={22} />
      <KenBurns
        src="images/networks-datacenter.png"
        span={span}
        from={1.16}
        to={1.03}
        opacity={second}
      />
      <AbsoluteFill style={{ background: SCRIM }} />

      {/* Signal sweep */}
      <AbsoluteFill style={{ justifyContent: "center" }}>
        <div
          style={{
            height: 2,
            width: `${line * 100}%`,
            background:
              "linear-gradient(90deg, rgba(249,115,22,0) 0%, #F97316 60%, rgba(255,255,255,0.9) 100%)",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          padding: "0 130px 132px",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Eyebrow>Deployment &amp; managed operations</Eyebrow>
        <Headline text="Keeping everything connected." delay={14} size={122} maxWidth={1060} />
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 64,
            opacity: interpolate(frame, [56, 82], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {[
            ["18", "Telecom circles"],
            ["200+", "Tier-1 engineers"],
            ["24×7", "NOC operations"],
          ].map(([k, v]) => (
            <div key={v}>
              <div
                style={{
                  fontFamily: body,
                  fontSize: 54,
                  fontWeight: 600,
                  color: COLORS.accent,
                  lineHeight: 1,
                }}
              >
                {k}
              </div>
              <div
                style={{
                  fontFamily: body,
                  fontSize: 22,
                  color: "rgba(255,255,255,0.78)",
                  marginTop: 8,
                  letterSpacing: "0.06em",
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
