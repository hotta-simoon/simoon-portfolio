"use client";

export default function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 40px",
        mixBlendMode: "difference",
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: "0.08em",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        simoon
      </a>
      <ul
        style={{
          display: "flex",
          gap: "32px",
          listStyle: "none",
        }}
      >
        {["About", "Career", "Works", "Contact"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 400,
                opacity: 0.7,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
