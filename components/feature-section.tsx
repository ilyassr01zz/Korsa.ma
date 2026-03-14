"use client"

import Image from "next/image"
import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

interface FeatureSectionProps {
  id: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  reverse?: boolean
}

export function FeatureSection({
  id,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
}: FeatureSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.2 })

  return (
    <section
      id={id}
      ref={ref}
      className="korsa-section overflow-hidden"
    >
      <div className="korsa-container">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          {/* Image */}
          <div
            className={cn(
              "relative",
              reverse && "md:order-2",
              isInView
                ? "animate-in fade-in slide-in-from-left-8 duration-700"
                : "opacity-0",
            )}
          >
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 top-4 -left-4 w-full h-full rounded-2xl bg-primary/10" />
          </div>

          {/* Content */}
          <div
            className={cn(
              "space-y-6",
              reverse && "md:order-1",
              isInView
                ? "animate-in fade-in slide-in-from-right-8 duration-700 delay-150"
                : "opacity-0",
            )}
          >
            <h2 className="korsa-section-title">
              {title}
            </h2>
            <p className="korsa-section-text">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
