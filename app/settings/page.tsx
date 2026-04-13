"use client";

export default function SettingsPage() {
  const resetAll = () => {
    localStorage.removeItem("loops");
    localStorage.removeItem("closedLoops");
    window.location.href = "/";
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        maxWidth: 480,
        margin: "0 auto",
        padding: "72px 24px 140px",
      }}
    >
      <div style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 32,
            color: "#1E1810",
            fontWeight: 300,
            margin: "0 0 6px",
            letterSpacing: "-0.02em",
          }}
        >
          settings
        </h1>
      </div>

      {/* About */}
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#C4B4A0",
          marginBottom: 10,
          fontWeight: 400,
        }}
      >
        about
      </p>
      <div
        style={{
          background: "rgba(255,255,255,0.75)",
          borderRadius: 20,
          overflow: "hidden",
          border: "0.5px solid rgba(180,155,120,0.2)",
          marginBottom: 32,
        }}
      >
        {[
          { label: "how it works", action: () => {} },
          { label: "terms of use", action: () => {} },
          { label: "privacy policy", action: () => {} },
        ].map((item, i, arr) => (
          <div
            key={item.label}
            onClick={item.action}
            style={{
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom:
                i < arr.length - 1
                  ? "0.5px solid rgba(180,155,120,0.12)"
                  : "none",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 14, color: "#1E1810", fontWeight: 300 }}>
              {item.label}
            </span>
            <span style={{ color: "#C4B4A0", fontSize: 16 }}>›</span>
          </div>
        ))}
      </div>

      {/* Danger zone */}
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#C4B4A0",
          marginBottom: 10,
          fontWeight: 400,
        }}
      >
        danger zone
      </p>
      <div
        style={{
          background: "rgba(255,255,255,0.75)",
          borderRadius: 20,
          overflow: "hidden",
          border: "0.5px solid rgba(180,155,120,0.2)",
          marginBottom: 48,
        }}
      >
        <div
          onClick={resetAll}
          style={{
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 14,
                color: "#C0392B",
                fontWeight: 400,
                margin: "0 0 2px",
              }}
            >
              reset app
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#C4B4A0",
                fontWeight: 300,
                margin: 0,
              }}
            >
              erases all loops and history
            </p>
          </div>
          <span style={{ color: "#C4B4A0", fontSize: 16 }}>›</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: 13,
            color: "#C4B4A0",
            fontWeight: 300,
            margin: "0 0 4px",
          }}
        >
          made with ○ by nikolai
        </p>
        <p
          style={{ fontSize: 12, color: "#D4C4B0", fontWeight: 300, margin: 0 }}
        >
          version 0.1.0
        </p>
      </div>
    </main>
  );
}
