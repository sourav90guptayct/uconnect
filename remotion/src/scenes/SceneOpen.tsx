import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { KenBurns } from "../components/KenBurns";
import { Eyebrow, Headline } from "../components/Type";
import { SCRIM } from "../theme";

export const SceneOpen: React.FC<{ span: number }> = ({ span }) => {
  const frame = useCurrentFrame();
  const second = interpolate(frame, [span * 0.55, span * 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#071324" }}>
      <KenBurns src="images/film-design.jpg" span={span} from={1.08} to={1.2} panX={-26} />
      <KenBurns
        src="images/film-highway.jpg"
        span={span}
        from={1.14}
        to={1.02}
        opacity={second}
      />
      <AbsoluteFill style={{ background: SCRIM }} />
      <AbsoluteFill
        style={{
          padding: "0 130px 132px",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Eyebrow>uConnect Technologies</Eyebrow>
        <Headline text="We put imagination to work." delay={16} size={132} maxWidth={1080} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
