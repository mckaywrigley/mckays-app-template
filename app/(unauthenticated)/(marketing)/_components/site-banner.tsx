"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function SiteBanner() {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.2 }}
          className="bg-brand-primary text-brand-primary-foreground relative"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-center py-3">
              <div className="flex items-center gap-3">
                <Link
                  href="https://github.com/mckaywrigley/mckays-app-template"
                  className="inline-flex items-center text-sm font-semibold underline-offset-2 hover:underline"
                >
                  <span className="mr-1">🎉</span> Template V2 is live!{" "}
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
              <button
                onClick={handleDismiss}
                className="absolute right-0 rounded p-1 transition-colors hover:bg-white/10"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
