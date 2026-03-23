import React, { useState, useEffect } from "react";

function Devotional() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [devotional, setDevotional] = useState({
    verse: "",
    reference: "",
    reflection: "Loading today's word from the Bible...",
    prayer: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // === VERSE API INTEGRATION ===
    fetch("https://beta.ourmanna.com/api/v1/get?format=json&order=daily")
      .then((res) => res.json())
      .then((data) => {
        const verseText = data.verse.details.text;
        const reference = `${data.verse.details.reference} (${data.verse.details.version})`;

        setDevotional({
          verse: `"${verseText}"`,
          reference: `— ${reference}`,
          reflection:
            "Let this powerful word from God speak to your heart today. May it strengthen your faith and draw you closer to Him.",
          prayer:
            "Lord, thank You for Your living Word. Help me hide this verse in my heart and live it out today. In Jesus' name, Amen.",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Verse API failed:", err);
        // Fallback to the previous hardcoded verse
        setDevotional({
          verse:
            '"For everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith."',
          reference: "— 1 John 5:4 (NIV)",
          reflection:
            "No matter what challenges or darkness the world throws at us, our faith in Christ gives us the ultimate victory.",
          prayer:
            "Heavenly Father, thank You for the victory You've already won for me through Jesus. Strengthen my faith today.",
        });
        setLoading(false);
      });
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e6f0ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 15px 40px rgba(0, 48, 135, 0.12)",
            padding: "45px 35px",
            maxWidth: "740px",
            width: "100%",
            borderTop: "6px solid #D4AF37",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <img
              src="/logo.png"
              alt=" Chuka University Christian Union,Kenya"
              style={{
                maxWidth: "260px",
                height: "auto",
                marginBottom: "20px",
              }}
            />
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#003087",
                fontSize: "2.8rem",
                fontWeight: 700,
                margin: "0 0 10px 0",
              }}
            >
              Daily Devotional
            </h1>
            <p
              style={{ color: "#00A1E0", fontSize: "1.15rem", fontWeight: 600 }}
            >
              Chuka University Christian Union
            </p>
            <p style={{ color: "#555", fontSize: "1.05rem" }}>{today}</p>
          </div>

          {loading ? (
            <p
              style={{ textAlign: "center", color: "#777", fontSize: "1.2rem" }}
            >
              Fetching today's verse from the Bible...
            </p>
          ) : (
            <>
              <section style={{ marginBottom: "45px" }}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#003087",
                    fontSize: "2.1rem",
                    fontWeight: 700,
                    marginBottom: "18px",
                    borderBottom: "3px solid #D4AF37",
                    paddingBottom: "12px",
                  }}
                >
                  Today's Verse
                </h2>
                <blockquote
                  style={{
                    fontSize: "1.45rem",
                    fontStyle: "italic",
                    color: "#1f2937",
                    lineHeight: "1.6",
                    margin: "0 0 20px 0",
                    padding: "0 0 0 28px",
                    borderLeft: "6px solid #00A1E0",
                    fontWeight: 500,
                  }}
                >
                  {devotional.verse}
                </blockquote>
                <p
                  style={{
                    textAlign: "right",
                    color: "#D4AF37",
                    fontWeight: 700,
                    fontSize: "1.15rem",
                  }}
                >
                  {devotional.reference}
                </p>
              </section>

              <section style={{ marginBottom: "45px" }}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#003087",
                    fontSize: "2.1rem",
                    fontWeight: 700,
                    marginBottom: "18px",
                    borderBottom: "3px solid #D4AF37",
                    paddingBottom: "12px",
                  }}
                >
                  Reflection
                </h2>
                <p
                  style={{
                    lineHeight: "1.85",
                    color: "#2d3748",
                    fontSize: "1.12rem",
                  }}
                >
                  {devotional.reflection}
                </p>
              </section>

              <section>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#003087",
                    fontSize: "2.1rem",
                    fontWeight: 700,
                    marginBottom: "18px",
                    borderBottom: "3px solid #D4AF37",
                    paddingBottom: "12px",
                  }}
                >
                  Prayer
                </h2>
                <p
                  style={{
                    lineHeight: "1.85",
                    color: "#2d3748",
                    fontSize: "1.12rem",
                  }}
                >
                  {devotional.prayer}
                </p>
              </section>
            </>
          )}

          <footer
            style={{
              marginTop: "55px",
              paddingTop: "25px",
              borderTop: "1px solid #eee",
              textAlign: "center",
              color: "#666",
              fontSize: "0.95rem",
            }}
          >
            <p>Chuka University Christian Union • #ChukaCU #DailyBread</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Devotional;







