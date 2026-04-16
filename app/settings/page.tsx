"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TERMS, PRIVACY } from "../data/legal";

type ModalType = "terms" | "privacy" | null;

export default function SettingsPage() {
  const [modal, setModal] = useState<"terms" | "privacy" | null>(null);
  const router = useRouter();

  const resetAll = () => {
    localStorage.removeItem("loops");
    localStorage.removeItem("closedLoops");
    localStorage.removeItem("onboarded");
    window.location.href = "/onboarding";
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
          { label: "how it works", action: () => router.push("/onboarding") },
          { label: "terms of use", action: () => setModal("terms") },
          { label: "privacy policy", action: () => setModal("privacy") },
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

      {/* Modal */}
      {modal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(30,24,16,0.25)",
            backdropFilter: "blur(8px)",
            zIndex: 50,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#F7F4F0",
              width: "100%",
              maxWidth: 480,
              height: "85vh",
              borderRadius: "28px 28px 0 0",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 -8px 48px rgba(30,24,16,0.12)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 24px",
                borderBottom: "0.5px solid rgba(180,155,120,0.15)",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#1E1810",
                  margin: 0,
                }}
              >
                {modal === "terms" ? "terms of use" : "privacy policy"}
              </p>
              <button
                onClick={() => setModal(null)}
                style={{
                  background: "rgba(180,155,120,0.15)",
                  border: "none",
                  borderRadius: 20,
                  padding: "6px 16px",
                  fontSize: 13,
                  color: "#8A7A6A",
                  fontWeight: 400,
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                done
              </button>
            </div>

            {/* Content */}
            <div
              style={{
                overflowY: "auto",
                padding: "24px 24px 48px",
                flex: 1,
              }}
            >
              <pre
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  color: "#5A4A3A",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                  margin: 0,
                }}
              >
                {modal === "terms" ? TERMS : PRIVACY}
              </pre>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
