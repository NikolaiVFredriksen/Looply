"use client";

import { AnimatePresence } from "framer-motion";
import { Loop } from "../types";
import LoopCard from "./LoopCard";

type Props = {
  loops: Loop[];
  activeId: string | null;
  closingId: string | null;
  closedCircleId: string | null;
  exitingId: string | null;
  releasingId: string | null;
  releasingCircleId: string | null;
  onSelect: (id: string) => void;
  onClose: (loop: Loop) => void;
  onRelease: (id: string) => void;
  onEdit: (loop: Loop) => void;
};

export default function LoopList({
  loops,
  activeId,
  closingId,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        alignItems: "center",
      }}
    >
      <AnimatePresence>
        {loops.map((loop, index) => (
          <LoopCard
            key={loop.id}
            loop={loop}
            index={index}
            isActive={activeId === loop.id}
            isClosing={closingId === loop.id}
            closedCircleId={closedCircleId}
            exitingId={exitingId}
            releasingId={releasingId}
            releasingCircleId={releasingCircleId}
            onSelect={() => onSelect(loop.id)}
            onClose={() => onClose(loop)}
            onRelease={() => onRelease(loop.id)}
            onEdit={() => onEdit(loop)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
