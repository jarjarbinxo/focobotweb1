import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const CUSTOMER_MSG = "كم سعر الوجبة؟";
const BOT_LINES = [
  "مرحباً! 🍽️ قائمتنا:",
  "• برغر: 2.5 KD",
  "• بيتزا: 3.5 KD",
  "• سندويش: 1.5 KD",
  "",
  "رد برقم طلبك لتأكيده ✅",
];
const BOT_MSG = BOT_LINES.join("\n");

const TypingDots = ({ frame }: { frame: number }) => {
  const dot1 = Math.sin(frame * 0.3) * 0.5 + 0.5;
  const dot2 = Math.sin(frame * 0.3 - 1) * 0.5 + 0.5;
  const dot3 = Math.sin(frame * 0.3 - 2) * 0.5 + 0.5;

  const dotStyle = (opacity: number): React.CSSProperties => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#888",
    opacity: 0.4 + opacity * 0.6,
  });

  return (
    <div
      style={{
        alignSelf: "flex-start",
        background: "#fff",
        borderRadius: "18px 18px 18px 4px",
        padding: "10px 14px",
        display: "flex",
        gap: 5,
        alignItems: "center",
        boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
      }}
    >
      <div style={dotStyle(dot1)} />
      <div style={dotStyle(dot2)} />
      <div style={dotStyle(dot3)} />
    </div>
  );
};

export const Chat = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone slides up
  const phoneY = interpolate(
    spring({ frame, fps, config: { damping: 18, stiffness: 100 } }),
    [0, 1],
    [300, 0]
  );
  const phoneOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Customer message appears at frame 30
  const CUSTOMER_START = 30;
  const CUSTOMER_DURATION = 40; // frames for typewriter
  const customerChars = Math.floor(
    interpolate(frame, [CUSTOMER_START, CUSTOMER_START + CUSTOMER_DURATION], [0, CUSTOMER_MSG.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const customerVisible = frame >= CUSTOMER_START;

  // Typing indicator at frame 80
  const TYPING_START = 80;
  const TYPING_END = 115;
  const typingVisible = frame >= TYPING_START && frame < TYPING_END;

  // Bot reply at frame 115
  const BOT_START = 115;
  const botOpacity = interpolate(frame, [BOT_START, BOT_START + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const botScale = spring({
    frame: frame - BOT_START,
    fps,
    config: { damping: 20, stiffness: 180 },
  });
  const botVisible = frame >= BOT_START;

  // Orange glow pulse when bot replies
  const glowOpacity = botVisible
    ? interpolate(frame, [BOT_START, BOT_START + 30], [0.8, 0.2], {
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Orange glow behind phone */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,122,26,0.4) 0%, transparent 70%)",
          opacity: glowOpacity,
          pointerEvents: "none",
        }}
      />

      {/* iPhone frame */}
      <div
        style={{
          width: 320,
          height: 620,
          background: "#1a1a1a",
          borderRadius: 44,
          border: "2px solid #333",
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)",
          transform: `translateY(${phoneY}px)`,
          opacity: phoneOpacity,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Notch */}
        <div
          style={{
            height: 32,
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 100, height: 24, background: "#0a0a0a", borderRadius: 12 }} />
        </div>

        {/* WhatsApp header */}
        <div
          style={{
            background: "#075E54",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#ff7a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 800,
              color: "#fff",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            F
          </div>
          <div>
            <div
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Focobot
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 11,
                fontFamily: "system-ui, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4CAF50",
                  display: "inline-block",
                }}
              />
              Online
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div
          style={{
            flex: 1,
            background: "#e5ddd5",
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            overflow: "hidden",
          }}
        >
          {/* Customer message */}
          {customerVisible && (
            <div
              style={{
                alignSelf: "flex-end",
                background: "#dcf8c6",
                borderRadius: "18px 4px 18px 18px",
                padding: "8px 12px",
                maxWidth: "80%",
                boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  color: "#111",
                  fontFamily: "system-ui, sans-serif",
                  direction: "rtl",
                  lineHeight: 1.4,
                }}
              >
                {CUSTOMER_MSG.slice(0, customerChars)}
                {customerChars < CUSTOMER_MSG.length && (
                  <span style={{ opacity: frame % 30 < 15 ? 1 : 0, borderRight: "1px solid #111" }}>
                    &nbsp;
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#888",
                  textAlign: "right",
                  marginTop: 2,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                9:41 ✓✓
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {typingVisible && <TypingDots frame={frame} />}

          {/* Bot reply */}
          {botVisible && (
            <div
              style={{
                alignSelf: "flex-start",
                background: "#fff",
                borderRadius: "4px 18px 18px 18px",
                padding: "10px 12px",
                maxWidth: "88%",
                boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
                opacity: botOpacity,
                transform: `scale(${botScale})`,
                transformOrigin: "bottom left",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "#111",
                  fontFamily: "system-ui, sans-serif",
                  direction: "rtl",
                  lineHeight: 1.6,
                  whiteSpace: "pre-line",
                }}
              >
                {BOT_MSG}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#888",
                  textAlign: "left",
                  marginTop: 4,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                9:41
              </div>
            </div>
          )}
        </div>

        {/* Home indicator */}
        <div
          style={{
            height: 28,
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 100, height: 4, background: "#444", borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
};
