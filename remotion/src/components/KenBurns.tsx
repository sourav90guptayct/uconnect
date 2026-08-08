import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

type Props = {
  src: string;
  /** total frames the scene lasts, used to pace the drift */
  span: number;
  from?: number;
  to?: number;
  panX?: number;
  panY?: number;
  opacity?: number;
};

export const KenBurns: React.FC<Props> = ({
  src,
  span,
  from = 1.06,
  to = 1.18,
  panX = 0,
  panY = 0,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, span], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(p, [0, 1], [from, to]);
  const x = interpolate(p, [0, 1], [0, panX]);
  const y = interpolate(p, [0, 1], [0, panY]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", opacity }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${x}px, ${y}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
