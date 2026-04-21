"use client";
import Image from "next/image";
import { useState } from "react";

const skills = [
  "Brand Direction",
  "Planning",
  "Direction",
  "UI/UX Design",
  "Project Management",
  "Web",
  "Movie",
  "Graphic",
];

export default function About() {
  const [colored, setColored] = useState(false);

  return (
    <section
      id="about"
      className="reveal"
      style={{
        padding: "120px 40px",
        borderTop: "1px solid var(--border)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "start",
      }}
    >
      {/* Left column */}
      <div>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: 0,
          }}
        >
          Profile
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
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(22px, 2.4vw, 38px)",
            lineHeight: 1.5,
            fontStyle: "italic",
            marginTop: "40px",
            color: "var(--text)",
          }}
        >
          企業と消費者の両視点から
          <br />
          最適なバランスを見つける
          <br />
          <em>てんびん座</em>
        </h2>

        <div
          style={{ marginTop: "40px", position: "relative", overflow: "hidden" }}
          onMouseEnter={() => setColored(true)}
          onMouseLeave={() => setColored(false)}
        >
          <Image
            src="/profile.png"
            alt="堀田 裕 / simoon"
            width={600}
            height={750}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "4/5",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
              filter: colored
                ? "grayscale(0%) contrast(1)"
                : "grayscale(100%) contrast(1.05)",
              transition: "filter 0.5s",
            }}
          />
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginTop: "12px",
              fontWeight: 400,
            }}
          >
            Hotta Yu / simoon
          </p>
        </div>
      </div>

      {/* Right column */}
      <div className="reveal" style={{ paddingTop: "80px" }}>
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.9,
            color: "rgba(240,240,240,0.75)",
            marginBottom: "32px",
            fontWeight: 300,
          }}
        >
          2013年よりSONICJAMでWebディレクターとして、広告や体験装置系の案件に多く携わる。その後2020年にAID-DCCと外部社員契約を結び、デジタルマーケティング支援などのプロデューサー、ディレクターとしてキャリアを積む。
        </p>
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.9,
            color: "rgba(240,240,240,0.75)",
            marginBottom: "32px",
            fontWeight: 300,
          }}
        >
          2021年よりフリーランスとして活動。STUDIO DETAILS、SHIFTBRAINなどの案件に携わる。
          <br />
          2025年にGallery&amp;Shopを糸島市にOPEN。
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "32px" }}>
          {skills.map((skill) => (
            <span
              key={skill}
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--muted)",
                border: "1px solid var(--border)",
                padding: "6px 14px",
                fontWeight: 400,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
