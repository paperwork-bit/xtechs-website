"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

export function StepPanel({
  activeKey,
  items,
}: {
  activeKey: string;
  items: { key: string; node: React.ReactNode }[];
}) {
  const map = useMemo(() => new Map(items.map(i => [i.key, i.node])), [items]);
  const node = map.get(activeKey);

  return (
    <div className="relative h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          className="absolute inset-0"
          initial={{ opacity: 0, y: 8, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.995 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {node}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

