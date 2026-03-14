"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="korsa-hero">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-taxis.jpg"
          alt="Moroccan grand taxis in a city street"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="korsa-container relative z-10 pt-20 text-center text-white">
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            Experience seamless intercity travel with Korsa, your trusted platform 
            for booking grand taxis across Morocco.
          </p>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-balance">
            Book Your Grand Taxi Now
          </h1>
          
          <div className="pt-4">
            <Button
              asChild
              size="cta"
              className="korsa-cta-button"
            >
              <Link href="#booking">
                Book Now
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Link href="#user-friendly" className="text-white/60 hover:text-white transition-colors">
            <ChevronDown className="w-8 h-8" />
            <span className="sr-only">Scroll down</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
