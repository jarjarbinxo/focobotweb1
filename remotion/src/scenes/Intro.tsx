import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const taglineOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [20, 45], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dotScale = spring({ frame: frame - 10, fps, config: { damping: 10, stiffness: 200 } });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        {/* Orange dot / logo mark */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#ff7a1a",
            transform: `scale(${dotScale})`,
            boxShadow: "0 0 40px rgba(255,122,26,0.6)",
          }}
        />
        <span
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-2px",
          }}
        >
          Focobot
        </span>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: 28,
          color: "rgba(255,255,255,0.6)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 400,
          letterSpacing: "0.5px",
        }}
      >
        Your WhatsApp, On Autopilot
      </div>
    </div>
  );
};
