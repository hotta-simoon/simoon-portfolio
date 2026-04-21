export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          color: "var(--muted)",
          letterSpacing: "0.1em",
        }}
      >
        © simoon
      </span>
    </footer>
  );
}
