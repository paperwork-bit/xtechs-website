"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) return defaultValue
    return window.matchMedia(query).matches
  }
  const [matches, setMatches] = useState<boolean>(() => (initializeWithValue ? getMatches(query) : defaultValue))
  const handleChange = () => setMatches(getMatches(query))

  useIsomorphicLayoutEffect(() => {
    const mm = window.matchMedia(query)
    handleChange()
    mm.addEventListener("change", handleChange)
    return () => mm.removeEventListener("change", handleChange)
  }, [query])

  return matches
}

export type CarouselImage = { src: string; alt?: string }

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(function Carousel({
  handleClick,
  controls,
  cards,
  isCarouselActive,
}: {
  handleClick: (imgUrl: string, index: number) => void
  controls: any
  cards: CarouselImage[]
  isCarouselActive: boolean
}) {
  const isSm = useMediaQuery("(max-width: 640px)")
  const cylinderWidth = isSm ? 900 : 1600
  const faceCount = cards.length
  const faceWidth = cylinderWidth / Math.max(faceCount, 1)
  const radius = cylinderWidth / (2 * Math.PI)
  const rotation = useMotionValue(0)
  const transform = useTransform(rotation, (v) => `rotate3d(0, 1, 0, ${v}deg)`)

  return (
    <div
      className="flex h-full items-center justify-center bg-transparent"
      style={{ perspective: "1000px", transformStyle: "preserve-3d", willChange: "transform" }}
      aria-label="3D product image carousel"
    >
      <motion.div
        drag={isCarouselActive ? "x" : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{ transform, rotateY: rotation, width: cylinderWidth, transformStyle: "preserve-3d" }}
        onDrag={(_, info) => isCarouselActive && rotation.set(rotation.get() + info.offset.x * 0.05)}
        onDragEnd={(_, info) =>
          isCarouselActive &&
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.05,
            transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
          })
        }
        animate={controls}
      >
        {cards.map((img, i) => (
          <motion.div
            key={`key-${img.src}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-background p-2 shadow-sm"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
            onClick={() => handleClick(img.src, i)}
            role="button"
            aria-label={`Open image ${i + 1} of ${faceCount}`}
            tabIndex={0}
          >
            <motion.img
              src={img.src}
              alt={img.alt ?? `Product photo ${i + 1}`}
              className="pointer-events-none w-full rounded-xl object-cover aspect-square"
              initial={{ filter: "blur(4px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={transition}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
})

const ThreeDPhotoCarousel = ({ images }: { images: CarouselImage[] }) => {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  const cards = useMemo(() => images, [images])

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Carousel images:", cards)
  }, [cards])

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }

  // Escape to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            layoutId={`img-container-${activeImg}`}
            onClick={handleClose}
            className="fixed inset-0 z-50 m-4 md:m-24 bg-black/50 flex items-center justify-center rounded-3xl"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
            aria-modal="true"
            role="dialog"
          >
            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl object-contain"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              alt="Expanded product photo"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[460px] w-full overflow-hidden">
        <Carousel handleClick={handleClick} controls={controls} cards={cards} isCarouselActive={isCarouselActive} />
      </div>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel }
export type { CarouselImage }


