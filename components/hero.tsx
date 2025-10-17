import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="flex-1 flex items-center justify-center bg-background min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Texto y CTAs - Lado izquierdo */}
          <div className="text-left">
            <div className="mb-4">
              <img
                src="/assets/logos/logo-peakstudy.svg"
                alt="Peak Study Logo"
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-[oklch(0.795_0.184_86.047)] leading-tight">
              Peak Study: <span className="block">Your AI-Powered Study Copilot</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-1 text-muted-foreground max-w-2xl">
              From chaotic recordings to perfect notes. Turn your classes into smart flashcards, clear summaries, and proven retention systems.
            </p>
            <div className="mb-8">
              <img
                src="/assets/badges/google-play-badge-logo-svgrepo-com.svg"
                alt="Get it on Google Play"
                className="h-36 w-auto hover:opacity-80 transition-opacity cursor-pointer"
              />
            </div>
          </div>

          {/* Imagen real - Lado derecho */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/images/andrew-neel-9moikpaufvg-unsplash-2.jpg"
                alt="Student studying"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}