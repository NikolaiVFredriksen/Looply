"use client";

import { usePathname, useRouter } from "next/navigation";
import { Circle, CheckCircle, Settings } from "lucide-react";

const tabs = [
  { label: "Loops", icon: Circle, href: "/" },
  { label: "Closed", icon: CheckCircle, href: "/closed" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "12px 0 28px",
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "0.5px solid rgba(180,155,120,0.3)",
        zIndex: 40,
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
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 24px",
            }}
          >
            <Icon
              size={22}
              style={{
                color: active ? "#1E1810" : "#C4B4A0",
                transition: "color 0.2s",
                strokeWidth: active ? 2 : 1.5,
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: active ? 500 : 400,
                color: active ? "#1E1810" : "#C4B4A0",
                fontFamily: "var(--font-dm-sans)",
                transition: "color 0.2s",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
