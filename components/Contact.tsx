"use client";
import { useState } from "react";

export default function Contact() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="contact"
      style={{
        padding: "120px 40px",
        borderTop: "1px solid var(--border)",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-30px",
          left: "40px",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(100px, 18vw, 300px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.05)",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        CONTACT
      </div>

      <div className="reveal" style={{ position: "relative" }}>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "60px",
          }}
        >
          Contact
          <span
            style={{
              flex: 1,
              maxWidth: "60px",
              height: "1px",
              background: "var(--border)",
              display: "block",
            }}
          />
        </p>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 9vw, 130px)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            marginBottom: "48px",
          }}
        >
          LET&apos;S
          <br />
          <span style={{ color: "var(--muted)" }}>WORK</span>
          <br />
          TOGETHER
        </h2>

        <a
          href="mailto:hotta@simooon.jp"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "20px",
            background: hovered ? "transparent" : "var(--text)",
            color: hovered ? "var(--text)" : "var(--bg)",
            textDecoration: "none",
            padding: "18px 40px",
            fontSize: "12px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: 500,
            transition: "all 0.3s",
            border: "1px solid var(--text)",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          お問い合わせはこちら
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              transform: hovered ? "translateX(6px)" : "translateX(0)",
              transition: "transform 0.3s",
              display: "inline-block",
            }}
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}
