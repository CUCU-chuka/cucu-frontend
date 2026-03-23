import React, { useState, useEffect } from "react";

function SermonLibrary() {
  const [sermons, setSermons] = useState([]);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Faith",
    "Prayer",
    "Holy Spirit",
    "Healing",
    "Evangelism",
    "Provision",
     "leadership",
    "Youth",
  ];

  // Fetch sermons from JSON (change URL to your hosted file)
  useEffect(() => {
    const jsonUrl = "https://your-github-raw-url-here/sermons.json";

    fetch(jsonUrl)
      .then((res) => res.json())
      .then((data) => {
        setSermons(data);
        setFilteredSermons(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load sermons:", err);
        // Fallback sample data
        const fallback = [
          {
            id: 1,
            title: "The Power of Persistent Prayer",
            preacher: "Pastor John Mwangi",
            date: "March 9, 2026",
            category: "Prayer",
            duration: "42 min",
            audioUrl: "#",
          },
          {
            id: 2,
            title: "Walking in the Fire - Faith That Overcomes",
            preacher: "Rev. Mercy Wambui",
            date: "March 2, 2026",
            category: "Faith",
            duration: "55 min",
            audioUrl: "#",
          },
          {
            id: 3,
            title: "Filled with the Holy Spirit",
            preacher: "Bro. Kipngeno Ishmael",
            date: "Feb 23, 2026",
            category: "Holy Spirit",
            duration: "38 min",
            audioUrl: "#",
          },
          {
            id: 4,
            title: "Jehovah Jireh - God Our Provider",
            preacher: "Pastor Esther Kamau",
            date: "Feb 16, 2026",
            category: "Provision",
            duration: "47 min",
            audioUrl: "#",
          },
        ];
        setSermons(fallback);
        setFilteredSermons(fallback);
        setLoading(false);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    let result = sermons;

    if (selectedCategory !== "All") {
      result = result.filter((s) => s.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.preacher.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredSermons(result);
  }, [searchTerm, selectedCategory, sermons]);

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
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            background:
              "linear-gradient(rgba(0, 48, 135, 0.85), rgba(0, 48, 135, 0.92)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: "120px 20px 80px",
            textAlign: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="CU Logo"
            style={{
              maxWidth: "180px",
              marginBottom: "20px",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
            }}
          />
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3.2rem",
              fontWeight: 700,
              margin: "0 0 16px 0",
              color: "#D4AF37", // Gold
            }}
          >
            Sermon Library
          </h1>
          <p
            style={{
              fontSize: "1.35rem",
              maxWidth: "700px",
              margin: "0 auto",
              opacity: 0.95,
            }}
          >
            Timeless messages that will ignite your faith and draw you closer to
            God
          </p>
        </div>

        {/* Filters */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "-40px auto 40px",
            padding: "0 20px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              boxShadow: "0 15px 40px rgba(0, 48, 135, 0.12)",
              padding: "30px 35px",
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {/* Search */}
            <input
              type="text"
              placeholder="Search sermons or preachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: "1",
                minWidth: "280px",
                padding: "14px 20px",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "1.05rem",
                outline: "none",
              }}
            />

            {/* Category Filter */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "10px 22px",
                    borderRadius: "999px",
                    border: "none",
                    background:
                      selectedCategory === cat ? "#003087" : "#f1f5f9",
                    color: selectedCategory === cat ? "#fff" : "#003087",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sermons Grid */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 20px 80px",
          }}
        >
          {loading ? (
            <p
              style={{ textAlign: "center", fontSize: "1.3rem", color: "#555" }}
            >
              Loading powerful sermons...
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "28px",
              }}
            >
              {filteredSermons.map((sermon) => (
                <div
                  key={sermon.id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 48, 135, 0.1)",
                    transition: "transform 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-8px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, #003087, #00A1E0)",
                      padding: "18px 22px",
                      color: "white",
                    }}
                  >
                    <div style={{ fontSize: "0.95rem", opacity: 0.9 }}>
                      {sermon.date}
                    </div>
                    <div
                      style={{
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        lineHeight: "1.3",
                        marginTop: "6px",
                      }}
                    >
                      {sermon.title}
                    </div>
                  </div>

                  <div style={{ padding: "24px" }}>
                    <p
                      style={{
                        color: "#003087",
                        fontWeight: 600,
                        marginBottom: "12px",
                      }}
                    >
                      {sermon.preacher}
                    </p>
                    <p
                      style={{
                        color: "#555",
                        fontSize: "0.97rem",
                        lineHeight: "1.55",
                      }}
                    >
                      {sermon.category} • {sermon.duration}
                    </p>

                    <a
                      href={sermon.audioUrl}
                      target="_blank"
                      style={{
                        display: "inline-block",
                        marginTop: "20px",
                        background: "#D4AF37",
                        color: "#003087",
                        padding: "12px 28px",
                        borderRadius: "999px",
                        fontWeight: 700,
                        textDecoration: "none",
                        fontSize: "1.02rem",
                      }}
                    >
                      ▶ Listen Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredSermons.length === 0 && !loading && (
            <p
              style={{
                textAlign: "center",
                fontSize: "1.4rem",
                color: "#777",
                marginTop: "60px",
              }}
            >
              No sermons found matching your search.
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            padding: "50px 20px",
            color: "#666",
            background: "#f8f9fa",
            borderTop: "6px solid #D4AF37",
          }}
        >
          <p style={{ fontSize: "1.1rem" }}>
            Chuka University Christian Union • Sermon Library
          </p>
          <p style={{ marginTop: "8px", fontWeight: 500 }}>
            #ChukaCU #HearTheWord #GrowingInChrist
          </p>
        </div>
      </div>
    </>
  );
}

export default SermonLibrary;
