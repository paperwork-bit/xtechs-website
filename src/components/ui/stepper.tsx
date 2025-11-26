"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

type Step = { id: string; label: string };

export function Stepper({
  steps,
  activeId,
  onChange,
  orientation = "auto",
}: {
  steps: Step[];
  activeId: string;
  onChange: (id: string) => void;
  orientation?: "vertical" | "horizontal" | "auto";
}) {
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches;
  const dir = orientation === "auto" ? (isMobile ? "horizontal" : "vertical") : orientation;
  const listRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    // ensure active pill stays in view on mobile
    if (dir !== "horizontal") {
      hasMounted.current = false;
      return;
    }

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const el = listRef.current?.querySelector<HTMLButtonElement>(`[data-id="${activeId}"]`);
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeId, dir]);

  const base =
    dir === "horizontal"
      ? "flex gap-2 overflow-x-auto no-scrollbar py-2"
      : "flex flex-col gap-2";

  return (
    <div role="tablist" aria-orientation={dir === "horizontal" ? "horizontal" : "vertical"}>
      <div ref={listRef} className={cn(base)}>
        {steps.map((s, i) => {
          const active = s.id === activeId;
          return (
            <Button
              key={s.id}
              data-id={s.id}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(s.id)}
              variant={active ? "default" : "ghost"}
              className={cn(
                "justify-start rounded-xl transition-all duration-200 h-auto py-3",
                dir === "horizontal" ? "shrink-0 px-4" : "w-full px-4",
                active && "ring-2 ring-primary/20 shadow-sm",
                !active && "hover:bg-muted/50"
              )}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  e.preventDefault();
                  const nextIndex = (i + 1) % steps.length;
                  onChange(steps[nextIndex].id);
                } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const prevIndex = (i - 1 + steps.length) % steps.length;
                  onChange(steps[prevIndex].id);
                }
              }}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                  active 
                    ? "bg-primary-foreground text-primary" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {i + 1}
                </div>
                <span className="text-sm md:text-base font-medium">{s.label}</span>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}