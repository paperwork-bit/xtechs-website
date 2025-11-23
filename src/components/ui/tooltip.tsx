"use client";

import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <RadixTooltip.Provider delayDuration={200}>
      {children}
    </RadixTooltip.Provider>
  );
}

export const Tooltip = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;
export const TooltipContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>>(
  ({ className = "", side = "top", children, ...props }, ref) => (
    <RadixTooltip.Content
      ref={ref}
      side={side}
      collisionPadding={8}
      className={
        "z-50 max-w-[320px] rounded-md border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md data-[state=delayed-open]:data-[side=top]:animate-in " +
        className
      }
      {...props}
    >
      {children}
      <RadixTooltip.Arrow className="fill-popover" />
    </RadixTooltip.Content>
  )
);
TooltipContent.displayName = "TooltipContent";


