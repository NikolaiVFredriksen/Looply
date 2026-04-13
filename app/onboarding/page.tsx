"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    id: 0,
    graphic: null,
    eyebrow: null,
    title: "you know that thing\nyou keep putting off?",
    body: null,
    sub: "yeah. that one.",
  },
  {
    id: 1,
    graphic: (
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        className="spin-slow"
        style={{ animationDuration: "12s" }}
      >
        <path
          d="M60 12 A48 48 0 1 0 108 60"
          stroke="#C4B4A0"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
    eyebrow: null,
    title: "that's an open loop.",
    body: null,
    sub: null,
  },
  {
    id: 2,
    graphic: (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
        {[48, 64, 40].map((size, i) => (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            className="spin-slow"
            style={{ animationDuration: `${10 + i * 4}s` }}
          >
            <path
              d={`M${size / 2} ${size * 0.1} A${size * 0.4} ${size * 0.4} 0 1 0 ${size * 0.9} ${size / 2}`}
              stroke="#C4B4A0"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ))}
      </div>
    ),
    eyebrow: null,
    title: "what's an open loop?",
    body: "anything unfinished that lives in your mind. not your grocery list — the harder stuff. the conversation you're avoiding. the decision you keep postponing. the thing you've been meaning to do for months.",
    sub: null,
  },
  {
    id: 3,
    graphic: (
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="#C4B4A0"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M20 32 L29 41 L44 24"
              stroke="#C4B4A0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p
            style={{
              fontSize: 12,
              color: "#C4B4A0",
              fontWeight: 300,
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            close it
          </p>
        </div>
        <p
          style={{ fontSize: 13, color: "#D4C4B0", fontWeight: 300, margin: 0 }}
        >
          or
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="#C4B4A0"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 3"
            />
          </svg>
          <p
            style={{
              fontSize: 12,
              color: "#C4B4A0",
              fontWeight: 300,
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            release it
          </p>
        </div>
      </div>
    ),
    eyebrow: null,
    title: "every loop ends\none of two ways.",
    body: "close it when you've done the thing. release it when you consciously choose to let it go.",
    sub: null,
  },
  {
    id: 4,
    graphic: null,
    eyebrow: null,
    title: "you already know\nwhat's on your mind.",
    body: null,
    sub: null,
  },
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem("onboarded", "true");
      router.push("/?newloop=true");
    }
  };

  const slide = slides[current];

  return (
    <main
      style={{
        minHeight: "100vh",
        maxWidth: 480,
        margin: "0 auto",
        paddingLeft: 28,
        paddingRight: 28,
        paddingTop: 80,
        paddingBottom: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {slide.graphic && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {slide.graphic}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {slide.eyebrow && (
            <p
              style={{
                fontSize: 13,
                color: "#B8A898",
                fontWeight: 300,
                margin: 0,
              }}
            >
              {slide.eyebrow}
            </p>
          )}
          {slide.title && (
            <h1
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 30,
                fontWeight: 300,
                color: "#1E1810",
                margin: 0,
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                whiteSpace: "pre-line",
              }}
            >
              {slide.title}
            </h1>
          )}
          {slide.body && (
            <p
              style={{
                fontSize: 15,
                color: "#8A7A6A",
                fontWeight: 300,
                margin: 0,
                lineHeight: 1.8,
              }}
            >
              {slide.body}
            </p>
          )}
          {slide.sub && (
            <p
              style={{
                fontSize: 17,
                color: "#B8A898",
                fontWeight: 300,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {slide.sub}
            </p>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 32,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === current ? "#2C2018" : "#D4C4B0",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          style={{
            background: "#2C2018",
            color: "#F7F4F0",
            border: "none",
            borderRadius: 20,
            padding: "12px 28px",
            fontSize: 14,
            fontWeight: 400,
            cursor: "pointer",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {current === slides.length - 1 ? "open your first loop" : "next"}
        </button>
      </div>
    </main>
  );
}
