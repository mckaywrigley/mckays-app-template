"use server"

import { FeaturesSection } from "@/components/landing/features"
import { HeroSection } from "@/components/landing/hero"

export default async function HomePage() {
  return (
    <div className="pb-20">
      <HeroSection />
      {/* social proof */}
      <FeaturesSection />
      {/* pricing */}
      {/* faq */}
      {/* blog */}
      {/* footer */}
    </div>
  )
}
