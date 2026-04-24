import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const STATS = [
  { value: "500+", label: "Businesses Automated", icon: "🏪" },
  { value: "< 1s", label: "Reply Time", icon: "⚡" },
  { value: "AR / EN", label: "Bilingual Support", icon: "🌍" },
];

const StatCard = ({ stat, delay }: { stat: (typeof STATS)[0]; delay: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const y = interpolate(progress, [0, 1], [60, 0]);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,122,26,0.3)",
        borderRadius: 20,
        padding: "32px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        minWidth: 220,
        transform: `translateY(${y}px)`,
        opacity,
        boxShadow: "0 0 40px rgba(255,122,26,0.08)",
      }}
    >
      <div style={{ fontSize: 40 }}>{stat.icon}</div>
      <div
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: "#ff7a1a",
          fontFamily: "system-ui, -apple-system, sans-serif",
          lineHeight: 1,
        }}
      >
        {stat.value}
      </div>
      <div
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.6)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
};

export const Stats = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
      }}
    >
      <div
        style={{
          fontSize: 36,
          color: "rgba(255,255,255,0.5)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 300,
          letterSpacing: "4px",
          textTransform: "uppercase",
          opacity: titleOpacity,
        }}
      >
        Why businesses choose Focobot
      </div>

      <div style={{ display: "flex", gap: 32 }}>
        {STATS.map((stat, i) => (
          <StatCard key={stat.value} stat={stat} delay={i * 12} />
        ))}
      </div>
    </div>
  );
};
