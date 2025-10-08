"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Trigger = "hover" | "always" | "inview";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  trigger?: Trigger;
  thickness?: string;
  offset?: string;
  colorClass?: string;
  from?: "left" | "center";
}

export function AnimatedUnderline({
  children,
  className,
  trigger = "hover",
  thickness = "0.18em",
  offset = "0.14em",
  colorClass = "text-gray-900",
  from = "left",
  ...rest
}: Props) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = React.useState(trigger === "always");

  React.useEffect(() => {
    if (trigger !== "inview") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  const shouldShow = visible || trigger === "always";

  return (
    <span
      ref={ref}
      {...rest}
      className={cn(
        "relative inline-block group",
        colorClass,
        className
      )}
      style={{
        paddingBottom: offset,
        "--thickness": thickness,
      } as React.CSSProperties}
    >
      {children}
      <span
        className={cn(
          "absolute left-0 bottom-0 w-full rounded-full transition-transform duration-300 ease-in-out",
          from === "center" ? "origin-center" : "origin-left",
          // Show based on trigger type
          trigger === "always" && "scale-x-100",
          trigger === "inview" && (shouldShow ? "scale-x-100" : "scale-x-0"),
          trigger === "hover" && "scale-x-0 group-hover:scale-x-100"
        )}
        style={{
          height: thickness,
          backgroundColor: "currentColor",
          opacity: 0.7,
        }}
      />
    </span>
  );
}
