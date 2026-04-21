const careers = [
  {
    year: "2021 — Present",
    company: "フリーランス",
    role: "Creative Director",
    desc: "STUDIO DETAILS、SHIFTBRAINなどの案件に携わる。2025年に Gallery&Shop を糸島市にOPEN。",
  },
  {
    year: "2013 — 2020",
    company: "株式会社ソニックジャム",
    role: "Web Director / Planner",
    desc: "大手コンビニエンスストアのブランドサイト運用からキャリアスタート。企業のプロモーションの企画・制作を担当。電通、博報堂などの大手広告代理店案件が多め。",
  },
  {
    year: "2011 — 2013",
    company: "株式会社コードスリー",
    role: "Brand Director",
    desc: "ハイブランドのウエディングドレス・アクセサリーのレンタルを提案するWedding Salon「Cli'O mariage（クリオマリアージュ）」のブランド立ち上げに従事。右も左もわからないままブランドローンチまで爆走。",
  },
  {
    year: "2006 — 2008",
    company: "株式会社カルチャーオブエイジア",
    role: "PA",
    desc: "渋谷のライブハウス・クラブハウス「asia」「VUENOS」「asia P」「Lounge Neo」のPAとして従事。テキーラが効かない体に。",
  },
];

export default function Career() {
  return (
    <section
      id="career"
      style={{ padding: "120px 40px", borderTop: "1px solid var(--border)" }}
    >
      <div
        className="reveal"
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "60px",
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
          CAREER
        </h2>
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
          経歴
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
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {careers.map((item, i) => (
          <div
            key={i}
            className="reveal"
            style={{
              padding: "36px 0",
              borderTop: "1px solid var(--border)",
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "32px",
              alignItems: "start",
              ...(i % 2 === 1
                ? { paddingLeft: "60px", borderLeft: "1px solid var(--border)" }
                : {}),
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "13px",
                letterSpacing: "0.1em",
                color: "var(--muted)",
                paddingTop: "4px",
              }}
            >
              {item.year}
            </div>
            <div>
              <div
                style={{ fontSize: "16px", fontWeight: 500, marginBottom: "4px", color: "var(--text)" }}
              >
                {item.company}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  fontWeight: 400,
                }}
              >
                {item.role}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(240,240,240,0.5)",
                  marginTop: "8px",
                  lineHeight: 1.7,
                }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
