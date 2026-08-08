import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { SceneOpen } from "./scenes/SceneOpen";
import { SceneDesign } from "./scenes/SceneDesign";
import { SceneConnected } from "./scenes/SceneConnected";
import { SceneSectors } from "./scenes/SceneSectors";
import { SceneProducts } from "./scenes/SceneProducts";
import { COLORS } from "./theme";

const T = 20;
const D = [158, 158, 158, 248, 258]; // sums to 980; 4 transitions x 20 = 80 -> 900 frames

const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const w = interpolate(frame, [0, durationInFrames], [0, 100]);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end" }}>
      <div style={{ height: 4, background: "rgba(255,255,255,0.16)" }}>
        <div style={{ height: "100%", width: `${w}%`, background: COLORS.accent }} />
      </div>
    </AbsoluteFill>
  );
};

const Grain: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background:
        "radial-gradient(120% 90% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.42) 100%)",
    }}
  />
);

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#071324" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={D[0]}>
          <SceneOpen span={D[0]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={D[1]}>
          <SceneDesign span={D[1]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={D[2]}>
          <SceneConnected span={D[2]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={D[3]}>
          <SceneSectors span={D[3]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={D[4]}>
          <SceneProducts span={D[4]} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Grain />
      <Progress />
    </AbsoluteFill>
  );
};
