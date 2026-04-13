"use client";

import { useState } from "react";

type ModalType = "terms" | "privacy" | null;

const TERMS = `Terms of Use

Last updated: April 2026

1. Acceptance of Terms
By using Looply ("the App"), you agree to be bound by these Terms of Use. If you do not agree, do not use the App.

2. Description of Service
Looply is a personal productivity application designed to help users manage open mental loops. The App allows users to capture, act on, or release thoughts and tasks. All data is stored locally on your device.

3. User Responsibilities
You agree to use the App only for lawful, personal purposes. You may not reverse-engineer, decompile, or disassemble the App.

4. Intellectual Property
All content, design, code, and branding within Looply are the intellectual property of the developer. You may not copy, reproduce, or create derivative works from the App.

5. Disclaimer of Warranties
The App is provided "as is" without warranties of any kind. We do not guarantee that the App will be error-free or uninterrupted. Looply is not a substitute for professional mental health support, therapy, or medical advice.

6. Limitation of Liability
To the fullest extent permitted by law, the developer shall not be liable for any indirect, incidental, or consequential damages arising from use of the App.

7. Changes to Terms
We may update these Terms from time to time. Continued use of the App after changes constitutes acceptance of the updated Terms.

8. Contact
If you have questions, contact us at hello@looply.app.`;

const PRIVACY = `Privacy Policy

Last updated: April 2026

1. Introduction
Looply is committed to protecting your privacy. This Privacy Policy explains what data we collect, how we use it, and your rights.

2. Data We Collect
Looply stores all data locally on your device using your browser's localStorage. We do not collect, transmit, or store any personal data on external servers.

Specifically:
- Loop content (text you enter) — stored locally on your device only
- Closed loop history — stored locally on your device only
- App preferences — stored locally on your device only

3. Data We Do Not Collect
- We do not collect your name, email address, or contact information
- We do not use analytics, tracking, or third-party SDKs
- We do not collect device identifiers or usage data
- We do not use cookies or similar tracking technologies
- We do not share any data with third parties

4. Data Storage & Security
All data is stored locally on your device. If you use the "Reset App" feature in Settings, all data is permanently erased. We do not back up your data to any cloud service.

5. Children's Privacy
Looply is not directed at children under 13. We do not knowingly collect data from children.

6. Your Rights
Since all data is stored locally on your device, you have full control:
- To delete all data, use the "Reset App" feature in Settings
- No account creation is required
- No data is stored externally

7. Changes to This Policy
We may update this Privacy Policy from time to time.

8. Contact
If you have questions, contact us at hello@looply.app.`;

export default function SettingsPage() {
  const [modal, setModal] = useState<ModalType>(null);

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
