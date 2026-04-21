export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 40px 60px",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Background decoration */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          right: "40px",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(200px, 30vw, 500px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        CD
      </div>

      <p
        className="hero-tag"
        style={{
          fontSize: "11px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "16px",
          fontWeight: 400,
        }}
      />

      <h1
        className="hero-name"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(80px, 14vw, 210px)",
          lineHeight: 0.88,
          letterSpacing: "-0.01em",
          color: "var(--text)",
        }}
      >
        <span style={{ display: "block" }}>堀田 裕</span>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 7vw, 110px)",
            color: "var(--muted)",
            letterSpacing: "0.05em",
          }}
        >
          HOTTA YU
        </span>
      </h1>

      <div
        className="hero-bottom"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: "40px",
          paddingTop: "24px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontWeight: 400,
          }}
        >
          CREATIVE DIRECTOR &nbsp;/&nbsp; WEB DIRECTOR &nbsp;/&nbsp; FUKUOKA
        </span>
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            className="hero-scroll-line"
            style={{
              display: "block",
              height: "1px",
              background: "var(--muted)",
            }}
          />
          Scroll
        </span>
      </div>
    </section>
  );
}
