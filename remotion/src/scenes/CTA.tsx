import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const headlineY = interpolate(
    spring({ frame, fps, config: { damping: 18, stiffness: 100 } }),
    [0, 1],
    [40, 0]
  );

  const subOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

  const btnScale = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const btnOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });

  // Pulsing glow on button
  const glowPulse = Math.sin(frame * 0.12) * 0.4 + 0.6;

  // URL fade in last
  const urlOpacity = interpolate(frame, [55, 70], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
      }}
    >
      {/* Orange glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,122,26,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-2px",
          textAlign: "center",
          lineHeight: 1.1,
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        Start automating
        <br />
        <span style={{ color: "#ff7a1a" }}>today.</span>
      </div>

      <div
        style={{
          fontSize: 22,
          color: "rgba(255,255,255,0.5)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          opacity: subOpacity,
        }}
      >
        Setup takes 2 minutes. No technical skills needed.
      </div>

      {/* CTA Button */}
      <div
        style={{
          marginTop: 12,
          opacity: btnOpacity,
          transform: `scale(${btnScale})`,
        }}
      >
        <div
          style={{
            background: "#ff7a1a",
            color: "#fff",
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "system-ui, -apple-system, sans-serif",
            padding: "18px 52px",
            borderRadius: 100,
            boxShadow: `0 0 ${40 * glowPulse}px rgba(255,122,26,${0.6 * glowPulse}), 0 8px 32px rgba(255,122,26,0.3)`,
            letterSpacing: "0.3px",
          }}
        >
          Get Started Free →
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          fontSize: 18,
          color: "rgba(255,255,255,0.3)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "2px",
          opacity: urlOpacity,
          marginTop: 8,
        }}
      >
        focobot.com
      </div>
    </div>
  );
};
