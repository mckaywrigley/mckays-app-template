"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight, Rocket } from "lucide-react"
import Link from "next/link"
import AnimatedGradientText from "../magicui/animated-gradient-text"
import HeroVideoDialog from "../magicui/hero-video-dialog"

export const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center px-8 pt-32 text-center">
      <div className="flex items-center justify-center">
        <Link href="https://github.com/mckaywrigley/mckays-app-template">
          <AnimatedGradientText>
            🚀 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
            <span
              className={cn(
                `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              View the code on GitHub
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>
      </div>

      <div className="mt-8 flex max-w-2xl flex-col items-center justify-center gap-6">
        <div className="text-balance text-6xl font-bold">
          Save time and start building.
        </div>

        <div className="max-w-xl text-balance text-xl">
          Use Mckay's app template to save time and get started with your next
          project.
        </div>

        <Link href="/pricing">
          <Button className="bg-blue-500 text-lg hover:bg-blue-600">
            <Rocket className="mr-2 size-5" />
            Get Started &rarr;
          </Button>
        </Link>
      </div>

      <div className="mx-auto mt-20 flex w-full max-w-screen-lg items-center justify-center rounded-lg border shadow-lg">
        <HeroVideoDialog
          animationStyle="top-in-bottom-out"
          videoSrc="https://www.youtube.com/embed/9yS0dR0kP-s"
          thumbnailSrc="hero.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </div>
  )
}