"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextType {
  type: "single" | "multiple";
  collapsible: boolean;
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);

interface AccordionItemContextType {
  itemValue: string;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = React.createContext<AccordionItemContextType | null>(null);

function toDomId(input: string) {
  // Keep IDs stable, safe-ish, and readable. (Best effort; caller should still pass unique values.)
  const normalized = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-_:.]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || "accordion-item";
}

export function Accordion({
  type = "single",
  collapsible = false,
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: {
  type?: "single" | "multiple";
  collapsible?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    defaultValue || (type === "multiple" ? [] : "")
  );

  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string | string[]) => {
      if (onValueChange) {
        onValueChange(newValue);
      } else {
        setInternalValue(newValue);
      }
    },
    [onValueChange]
  );

  const contextValue = React.useMemo(
    () => ({
      type,
      collapsible,
      value: currentValue,
      onValueChange: handleValueChange,
    }),
    [type, collapsible, currentValue, handleValueChange]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className,
  ...props
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const baseId = React.useMemo(() => toDomId(value), [value]);
  const itemCtx = React.useMemo<AccordionItemContextType>(
    () => ({
      itemValue: value,
      triggerId: `accordion-trigger-${baseId}`,
      contentId: `accordion-content-${baseId}`,
    }),
    [value, baseId]
  );

  return (
    <AccordionItemContext.Provider value={itemCtx}>
      <div className={cn("border-b", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className,
  onClick,
  onKeyDown,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionTrigger must be used within an Accordion");
  }

  const itemContext = React.useContext(AccordionItemContext);
  if (!itemContext) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }

  const { type, collapsible, value, onValueChange } = context;
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  // Determine if this item is open
  React.useEffect(() => {
    if (type === "multiple") {
      setIsOpen(Array.isArray(value) && value.includes(itemContext.itemValue));
    } else {
      setIsOpen(value === itemContext.itemValue);
    }
  }, [value, type, itemContext.itemValue]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const itemValue = itemContext.itemValue;
    
    if (type === "multiple") {
      const currentArray = Array.isArray(value) ? value : [];
      const newValue = currentArray.includes(itemValue)
        ? currentArray.filter((v) => v !== itemValue)
        : [...currentArray, itemValue];
      onValueChange(newValue);
    } else {
      if (isOpen && collapsible) {
        onValueChange("");
      } else {
        onValueChange(itemValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    if (e.key === "Escape" && isOpen) {
      onValueChange("");
      triggerRef.current?.focus();
    }
  };

  return (
    <button
      {...props}
      ref={triggerRef}
      type="button"
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      id={itemContext.triggerId}
      aria-expanded={isOpen}
      aria-controls={itemContext.contentId}
      data-state={isOpen ? "open" : "closed"}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  );
}

export function AccordionContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionContent must be used within an Accordion");
  }

  const itemContext = React.useContext(AccordionItemContext);
  if (!itemContext) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }

  const { type, value } = context;
  const [isOpen, setIsOpen] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  // Determine if this content is open
  React.useEffect(() => {
    if (type === "multiple") {
      setIsOpen(Array.isArray(value) && value.includes(itemContext.itemValue));
    } else {
      setIsOpen(value === itemContext.itemValue);
    }
  }, [value, type, itemContext.itemValue]);

  // Calculate height for smooth animation
  const updateHeight = React.useCallback(() => {
    if (innerRef.current) {
      const newHeight = innerRef.current.scrollHeight;
      setHeight(newHeight);
    }
  }, []);

  React.useEffect(() => {
    updateHeight();
  }, [isOpen, children, updateHeight]);

  // Handle window resize and content changes
  React.useEffect(() => {
    if (!isOpen) return;

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    if (innerRef.current) {
      resizeObserver.observe(innerRef.current);
    }

    const handleResize = () => {
      updateHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, updateHeight]);

  return (
    <div
      {...props}
      ref={contentRef}
      className={cn(
        "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
        isOpen ? "opacity-100" : "opacity-0",
        className
      )}
      style={{ ...(props.style ?? {}), maxHeight: isOpen ? `${height}px` : "0px" }}
      role="region"
      id={itemContext.contentId}
      aria-labelledby={itemContext.triggerId}
      data-state={isOpen ? "open" : "closed"}
    >
      <div ref={innerRef} className="pb-4 pt-0">{children}</div>
    </div>
  );
}