"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

type SliderImage = { src: string; alt?: string }

type Props = {
  images: SliderImage[]
  speedSec?: number
  size?: "sm" | "md" | "lg"
  direction?: "left" | "right"
  maskEdges?: boolean
  className?: string
}

export function ImageAutoSlider({
  images,
  speedSec = 20,
  size = "md",
  direction = "left",
  maskEdges = true,
  className = "",
}: Props) {
  const [selectedImage, setSelectedImage] = React.useState<{ src: string; alt?: string } | null>(null)
  const track = React.useMemo(() => [...images, ...images], [images])

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleImageClick = (img: { src: string; alt?: string }) => {
    setSelectedImage(img)
  }

  const boxClass =
    size === "sm"
      ? "w-40 h-40 md:w-52 md:h-52"
      : size === "lg"
      ? "w-72 h-72 md:w-80 md:h-80"
      : "w-56 h-56 md:w-64 md:h-64"

  const animName = direction === "right" ? "ias-scroll-right" : "ias-scroll-left"
  const duration = `${speedSec}s`

  return (
    <>
      <style>{`
        html, body { overflow-x: hidden; }
        @keyframes ias-scroll-left { 0% {transform: translateX(0);} 100% {transform: translateX(-50%);} }
        @keyframes ias-scroll-right { 0% {transform: translateX(-50%);} 100% {transform: translateX(0);} }
        .ias-track { animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform; }
        .group:hover .ias-track { animation-play-state: paused; }
        .ias-mask { mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%); -webkit-mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%); }
        .ias-item { transition: transform .3s ease, filter .3s ease; }
        .ias-item:hover { transform: translateY(-2px) scale(1.03); filter: brightness(1.05); }
        .ias-item { cursor: pointer; }
      `}</style>

      <div
        className={["relative w-full overflow-hidden bg-background group", maskEdges ? "ias-mask" : "", className].join(
          " "
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

        <div className="relative z-10 w-full mx-auto py-6">
          <div className="w-full">
            <div
              className="ias-track flex gap-6 w-max"
              style={{ animationName: animName as any, animationDuration: duration }}
              aria-label="Product image slider"
              role="region"
            >
              {track.map((img, i) => {
                // Get the original image from the first half of the track to ensure correct image reference
                const originalImageIndex = i % images.length
                const originalImage = images[originalImageIndex]
                
                return (
                  <div
                    key={`${img.src}-${i}`}
                    className={["ias-item flex-shrink-0 rounded-xl overflow-hidden shadow-sm border border-border bg-card relative", boxClass].join(
                      " "
                    )}
                    onClick={() => handleImageClick(originalImage)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View full size image: ${originalImage.alt ?? `Gallery image ${originalImageIndex + 1}`}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleImageClick(originalImage)
                      }
                    }}
                  >
                    <img src={img.src} alt={img.alt ?? `Gallery image ${originalImageIndex + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    {/* Click hint overlay */}
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                      <div className="text-white text-xs px-2 py-1 bg-black/50 rounded-full">
                        Click to view
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Full-size Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Full-size product image"
          >
            <motion.div
              className="relative w-full h-full max-w-7xl max-h-[90vh]"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt ?? "Full-size product image"}
                className="w-full h-full object-contain rounded-lg shadow-2xl bg-white"
              />
              
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-sm px-4 py-2 rounded-full bg-white/90 text-slate-800 shadow-lg hover:bg-white transition-colors"
                onClick={() => setSelectedImage(null)}
                aria-label="Close full-size image"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export type { SliderImage as ImageAutoSliderImage }


