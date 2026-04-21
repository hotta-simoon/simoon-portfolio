"use client";

import { useState } from "react";
import type { Work, WorkCategory } from "@/types/work";
import { CAT_LABELS } from "@/types/work";

const FILTER_BUTTONS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "brand", label: "Brand Direction" },
  { key: "planning", label: "Planning" },
  { key: "direction", label: "Direction" },
  { key: "uiux", label: "UI/UX Design" },
  { key: "pm", label: "Project Management" },
  { key: "web", label: "Web" },
  { key: "movie", label: "Movie" },
  { key: "graphic", label: "Graphic" },
];

function WorkCard({ work, isFeatured }: { work: Work; isFeatured: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Tag = work.url ? "a" : "div";

  return (
    <Tag
      {...(work.url ? { href: work.url, target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        background: "var(--bg)",
        aspectRatio: isFeatured ? "auto" : "16/9",
        gridColumn: isFeatured ? "span 2" : undefined,
        gridRow: isFeatured ? "span 2" : undefined,
        position: "relative",
        overflow: "hidden",
        cursor: work.url ? "pointer" : "default",
        display: "block",
        textDecoration: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "var(--surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        {work.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={work.thumbnail}
            alt={work.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isFeatured ? "140px" : "80px",
                color: "var(--border)",
                userSelect: "none",
              }}
            >
              {String(work.id).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(12,12,12,0.92)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isFeatured ? "32px" : "24px",
        }}
      >
        <div
          style={{
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontWeight: 400,
            marginBottom: "8px",
          }}
        >
          {work.cats.map((c) => CAT_LABELS[c as WorkCategory]).join(" / ")}
        </div>
        <div
          style={{
            fontSize: isFeatured ? "20px" : "15px",
            fontWeight: 500,
            lineHeight: 1.4,
            color: "var(--text)",
          }}
        >
          {work.name}
        </div>
        <div style={{ display: "flex", gap: "12px", marginTop: "8px", alignItems: "baseline" }}>
          {work.client && (
            <span style={{ fontSize: "9px", color: "rgba(240,240,240,0.6)", letterSpacing: "0.1em" }}>
              {work.client}
            </span>
          )}
          <span style={{ fontSize: "9px", color: "var(--muted)", letterSpacing: "0.1em" }}>
            {work.year}
          </span>
        </div>
        {work.url && (
          <div style={{ marginTop: "12px", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(240,240,240,0.4)" }}>
            Visit →
          </div>
        )}
      </div>
    </Tag>
  );
}

export default function Works({ initialWorks }: { initialWorks: Work[] }) {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? initialWorks
      : initialWorks.filter((w) => w.cats.includes(filter as WorkCategory));

  return (
    <section
      id="works"
      style={{ padding: "120px 40px", borderTop: "1px solid var(--border)" }}
    >
      <div
        className="reveal"
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 8vw, 120px)",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          WORKS
        </h2>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "14px",
            color: "var(--muted)",
            letterSpacing: "0.1em",
          }}
        >
          {filtered.length}
        </span>
      </div>

      <div
        className="reveal"
        style={{
          display: "flex",
          gap: "4px",
          flexWrap: "wrap",
          marginBottom: "48px",
          paddingBottom: "24px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {FILTER_BUTTONS.map((btn) => {
          const isActive = filter === btn.key;
          return (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              style={{
                background: isActive ? "var(--text)" : "none",
                border: `1px solid ${isActive ? "var(--text)" : "transparent"}`,
                color: isActive ? "var(--bg)" : "var(--muted)",
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "8px 16px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontWeight: 400,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.borderColor = "transparent";
                }
              }}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoFlow: "dense",
          gap: "1px",
          background: filtered.length > 0 ? "var(--border)" : "transparent",
        }}
      >
        {filtered.map((work) => (
          <WorkCard
            key={work.id}
            work={work}
            isFeatured={work.featured && filter === "all"}
          />
        ))}
      </div>
    </section>
  );
}
