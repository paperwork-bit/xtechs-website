// components/MapFrame.tsx
import React from "react";

type MapFrameProps = {
  src: string;
  title?: string;
  className?: string;
  aspectPercent?: number;
};

export function MapFrame({
  src,
  title = "Google Map",
  className = "",
  aspectPercent = 56.25, // 16:9
}: MapFrameProps) {
  return (
    <div className={`w-full overflow-hidden rounded-lg border ${className}`}>
      <div className="relative w-full" style={{ paddingBottom: `${aspectPercent}%` }}>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute left-0 top-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}