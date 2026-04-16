"use client";

import { motion } from "framer-motion";
import { Loop } from "../types";

type Props = {
  loop: Loop;
  index: number;
  isActive: boolean;
  isClosing: boolean;
  closedCircleId: string | null;
  exitingId: string | null;
  releasingId: string | null;
  releasingCircleId: string | null;
  onSelect: () => void;
  onClose: () => void;
  onRelease: () => void;
  onEdit: () => void;
};

export default function LoopCard({
  loop,
  index,
  isActive,
  isClosing,
  closedCircleId,
  exitingId,
  releasingId,
  releasingCircleId,
  onSelect,
  onClose,
  onRelease,
  onEdit,
}: Props) {
  return (
    <motion.div
      key={loop.id}
      initial={{ opacity: 0, y: 20 }}
      animate={
        exitingId === loop.id
          ? { opacity: 0, scale: 0.95 }
          : releasingId === loop.id
            ? { opacity: 0, y: -20 }
            : { opacity: 1, scale: 1, y: 0 }
      }
      transition={
        releasingId === loop.id
          ? { duration: 1.0, ease: "easeOut", delay: 0.8 }
          : { duration: 0.4, ease: "easeInOut" }
      }
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      style={{
        width: "100%",
        minWidth: 250,
        maxWidth: 400,
        boxSizing: "border-box",
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 24,
        padding: "20px 22px",
        cursor: "pointer",
        boxShadow: isActive
          ? "0 12px 40px rgba(30,24,16,0.12), 0 2px 8px rgba(30,24,16,0.06)"
          : "0 2px 12px rgba(30,24,16,0.07), 0 1px 3px rgba(30,24,16,0.04)",
        border: "0.5px solid rgba(180,155,120,0.2)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
        {/* Circle */}
        <div
          style={{
            flexShrink: 0,
            marginTop: 2,
            width: 36,
            height: 36,
            position: "relative",
          }}
        >
          {closedCircleId === loop.id ? (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle
                cx="18"
                cy="18"
                r="14"
                stroke="#C4B4A0"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="88"
                strokeDashoffset="0"
                style={{ animation: "drawCircle 0.5s ease-out forwards" }}
              />
              <motion.path
                d="M12 18 L16 22 L24 14"
                stroke="#C4B4A0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </svg>
          ) : releasingCircleId === loop.id ? (
            <motion.svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -1, scale: 1.1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            >
              <circle
                cx="18"
                cy="18"
                r="14"
                stroke="#C4B4A0"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="88"
                strokeDashoffset="0"
                style={{ animation: "drawCircle 0.8s ease-out forwards" }}
              />
            </motion.svg>
          ) : (
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              className="spin-slow"
              style={{
                animationDuration: isClosing ? "0.8s" : `${10 + index * 3}s`,
              }}
            >
              <path
                d="M18 4 A14 14 0 1 0 32 18"
                stroke="#C4B4A0"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                fontSize: 15,
                fontWeight: 400,
                color: "#1E1810",
                margin: "0 0 5px",
                lineHeight: 1.4,
              }}
            >
              {loop.title}
            </p>
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0 0 0 8px",
                  color: "#D4C4B0",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            )}
          </div>
          <p
            style={{
              fontSize: 13,
              color: "#A89880",
              fontWeight: 300,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {loop.description}
          </p>
          {loop.why && (
            <p
              style={{
                fontSize: 12,
                color: "#C4B4A0",
                fontStyle: "italic",
                margin: "5px 0 0",
                fontWeight: 300,
              }}
            >
              {loop.why}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 18,
            paddingTop: 16,
            borderTop: "0.5px solid rgba(180,155,120,0.12)",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            style={{
              flex: 1,
              background: "#2C2018",
              color: "#F7F4F0",
              border: "none",
              borderRadius: 14,
              padding: "12px 0",
              fontSize: 13,
              fontWeight: 400,
              cursor: "pointer",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            close loop
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRelease();
            }}
            style={{
              flex: 1,
              background: "rgba(180,155,120,0.12)",
              color: "#A89880",
              border: "none",
              borderRadius: 14,
              padding: "12px 0",
              fontSize: 13,
              fontWeight: 400,
              cursor: "pointer",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            release
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
