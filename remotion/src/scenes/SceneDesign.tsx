import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { KenBurns } from "../components/KenBurns";
import { Eyebrow, Headline } from "../components/Type";
import { SCRIM, COLORS } from "../theme";
import { body } from "../fonts";

const steps = ["Survey", "Design", "Engineer", "Validate"];

export const SceneDesign: React.FC<{ span: number }> = ({ span }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#071324" }}>
      <KenBurns src="images/sector-design.jpg" span={span} from={1.2} to={1.04} panY={-14} />
      <AbsoluteFill style={{ background: SCRIM }} />
      <AbsoluteFill
        style={{
          padding: "0 130px 132px",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Eyebrow>Solutioning</Eyebrow>
        <Headline
          text="By designing beyond what is expected."
          delay={14}
          size={112}
          maxWidth={1120}
        />
        <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
          {steps.map((s, i) => {
            const f = frame - 46 - i * 8;
            const o = interpolate(f, [0, 16], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const y = interpolate(f, [0, 20], [22, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={s}
                style={{
                  opacity: o,
                  transform: `translateY(${y}px)`,
                  padding: "14px 26px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.28)",
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.92)",
                  fontFamily: body,
                  fontSize: 24,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                <span style={{ color: COLORS.accent, marginRight: 12 }}>
                  0{i + 1}
                </span>
                {s}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
