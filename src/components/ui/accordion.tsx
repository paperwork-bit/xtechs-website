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
  return (
    <div className={cn("border-b", className)} {...props}>
      {children}
    </div>
  );
}

export function AccordionTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionTrigger must be used within an Accordion");
  }

  const { type, collapsible, value, onValueChange } = context;
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  // Determine if this item is open
  React.useEffect(() => {
    if (type === "multiple") {
      setIsOpen(Array.isArray(value) && value.includes(props.id || ""));
    } else {
      setIsOpen(value === props.id);
    }
  }, [value, type, props.id]);

  const handleClick = () => {
    const itemValue = props.id || "";
    
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      onValueChange("");
      triggerRef.current?.focus();
    }
  };

  return (
    <button
      ref={triggerRef}
      type="button"
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      aria-expanded={isOpen}
      aria-controls={`content-${props.id}`}
      data-state={isOpen ? "open" : "closed"}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
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

  const { type, value } = context;
  const [isOpen, setIsOpen] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  // Determine if this content is open
  React.useEffect(() => {
    if (type === "multiple") {
      setIsOpen(Array.isArray(value) && value.includes(props.id || ""));
    } else {
      setIsOpen(value === props.id);
    }
  }, [value, type, props.id]);

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
      ref={contentRef}
      className={cn(
        "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
        isOpen ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        maxHeight: isOpen ? `${height}px` : "0px",
      }}
      role="region"
      aria-labelledby={`trigger-${props.id}`}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div ref={innerRef} className="pb-4 pt-0">{children}</div>
    </div>
  );
}