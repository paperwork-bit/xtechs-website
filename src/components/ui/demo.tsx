"use client"

import { ThreeDPhotoCarousel, type CarouselImage } from "@/components/ui/3d-carousel"

const productImages: CarouselImage[] = [
  { src: "/products/solarfold/1.jpg", alt: "SolarFold — container view" },
  { src: "/products/solarfold/2.jpg", alt: "SolarFold — deployed angle" },
  { src: "/products/solarfold/3.jpg", alt: "SolarFold — field deployment" },
  { src: "/products/solarfold/4.jpg", alt: "SolarFold — detail" },

  // Fallbacks (comment above and uncomment below if you don't have local images yet)
  // { src: "https://source.unsplash.com/800x800/?solar,panels&sig=1", alt: "Solar panels — rooftop array" },
  // { src: "https://source.unsplash.com/800x800/?inverter,energy&sig=2", alt: "Solar inverter — close-up" },
  // { src: "https://source.unsplash.com/800x800/?battery,storage&sig=3", alt: "Battery storage — wall mounted" },
  // { src: "https://source.unsplash.com/800x800/?ev,charger&sig=4", alt: "EV charger — driveway install" },
]

export function ThreeDPhotoCarouselDemo() {
  return (
    <div className="w-full">
      <div className="min-h-[520px] flex flex-col justify-center rounded-2xl border border-dashed">
        <div className="p-3">
          <ThreeDPhotoCarousel images={productImages} />
        </div>
      </div>
    </div>
  )
}

// Export alias expected by timeline demo page
export const XTechsTimelineDemo = ThreeDPhotoCarouselDemo;