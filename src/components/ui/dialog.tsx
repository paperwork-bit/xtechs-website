"use client";

import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogPortal = RadixDialog.Portal;
export const DialogOverlay = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>>(
  ({ className = "", ...props }, ref) => (
    <RadixDialog.Overlay
      ref={ref}
      className={"fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out " + className}
      {...props}
    />
  )
);
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof RadixDialog.Content>>(
  ({ className = "", children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <RadixDialog.Content
        ref={ref}
        className={"fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-md border bg-background p-6 shadow-lg " + className}
        {...props}
      >
        {children}
      </RadixDialog.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = "DialogContent";

export const DialogTitle = RadixDialog.Title;
export const DialogDescription = RadixDialog.Description;
export const DialogClose = RadixDialog.Close;


