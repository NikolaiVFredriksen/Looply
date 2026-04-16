export default function EmptyState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 0",
        gap: 16,
      }}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        className="spin-slow"
      >
        <path
          d="M32 8 A24 24 0 1 0 56 32"
          stroke="#D4C4B0"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <p
        style={{
          color: "#C4B4A0",
          fontSize: 14,
          fontWeight: 300,
          textAlign: "center",
        }}
      >
        no open loops
      </p>
      <p style={{ color: "#D4C4B0", fontSize: 13, fontWeight: 300 }}>nice.</p>
    </div>
  );
}
