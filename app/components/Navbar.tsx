"use client";

import { usePathname, useRouter } from "next/navigation";
import { Circle, CheckCircle, Settings } from "lucide-react";

const tabs = [
  { label: "loops", icon: Circle, href: "/" },
  { label: "closed", icon: CheckCircle, href: "/closed" },
  { label: "settings", icon: Settings, href: "/settings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 40,
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "rgba(30,24,16,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 100,
          padding: "8px 8px",
        }}
      >
        {tabs.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                background: active ? "rgba(255,255,255,0.12)" : "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 20px",
                borderRadius: 100,
                transition: "all 0.2s ease",
              }}
            >
              <Icon
                size={18}
                style={{
                  color: active ? "#F7F4F0" : "#8A7A6A",
                  strokeWidth: active ? 2 : 1.5,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: active ? 400 : 300,
                  color: active ? "#F7F4F0" : "#8A7A6A",
                  fontFamily: "var(--font-dm-sans)",
                  letterSpacing: "0.02em",
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
