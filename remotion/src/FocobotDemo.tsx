import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Chat } from "./scenes/Chat";
import { CTA } from "./scenes/CTA";
import { Intro } from "./scenes/Intro";
import { Stats } from "./scenes/Stats";

// 15s at 30fps = 450 frames
// Intro:   0  - 90  (3s)
// Chat:    70 - 300 (7.7s, overlaps intro exit)
// Stats:   270- 390 (4s, overlaps chat exit)
// CTA:     360- 450 (3s)

const Background = () => {
  const frame = useCurrentFrame();

  // Slowly shift bg color over time
  const orangeOpacity = interpolate(frame, [0, 200, 450], [0.03, 0.08, 0.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0a",
      }}
    >
      {/* Subtle radial glow that follows the action */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,122,26,${orangeOpacity}) 0%, transparent 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

const SceneFade = ({
  from,
  duration,
  children,
}: {
  from: number;
  duration: number;
  children: React.ReactNode;
}) => {
  const frame = useCurrentFrame();
  const FADE = 15;

  const opacity = interpolate(
    frame,
    [0, FADE, duration - FADE, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <Sequence from={from} durationInFrames={duration} premountFor={FADE}>
      <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>
    </Sequence>
  );
};

export const FocobotDemo = () => {
  return (
    <AbsoluteFill>
      <Background />
      <SceneFade from={0} duration={110}>
        <Intro />
      </SceneFade>
      <SceneFade from={90} duration={220}>
        <Chat />
      </SceneFade>
      <SceneFade from={280} duration={130}>
        <Stats />
      </SceneFade>
      <SceneFade from={375} duration={75}>
        <CTA />
      </SceneFade>
    </AbsoluteFill>
  );
};
