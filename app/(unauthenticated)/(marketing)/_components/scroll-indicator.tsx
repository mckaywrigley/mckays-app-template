"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface ScrollIndicatorProps {
  enabledPaths?: string[]
  showFade?: boolean
  showButton?: boolean
}

export function ScrollIndicator({
  enabledPaths = ["/", "/about", "/features", "/pricing"],
  showFade = true,
  showButton = true
}: ScrollIndicatorProps) {
  const [showIndicator, setShowIndicator] = useState(false)
  const pathname = usePathname()

  // Check if current path is enabled
  const isEnabled = enabledPaths.includes(pathname)

  useEffect(() => {
    if (!isEnabled) {
      setShowIndicator(false)
      return
    }

    const checkScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      // Show indicator if there's more content below and we're not at the bottom
      const hasMoreContent = documentHeight > windowHeight
      const notAtBottom = scrollTop + windowHeight < documentHeight - 500

      setShowIndicator(hasMoreContent && notAtBottom)
    }

    // Check on mount
    checkScroll()

    // Check on scroll and resize
    window.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)

    return () => {
      window.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [isEnabled])

  const handleScroll = () => {
    const scrollAmount = window.innerHeight / 2
    window.scrollBy({
      top: scrollAmount,
      behavior: "smooth"
    })
  }

  if (!isEnabled) return null

  return (
    <>
      {/* Fade indicator */}
      {showFade && (
        <AnimatePresence>
          {showIndicator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none fixed right-0 bottom-0 left-0 z-40 hidden h-32 sm:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, transparent 50%, var(--background) 100%)"
              }}
            />
          )}
        </AnimatePresence>
      )}

      {/* Button indicator */}
      {showButton && (
        <AnimatePresence>
          {showIndicator && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-8 left-1/2 z-50 hidden -translate-x-1/2 sm:block"
            >
              <motion.button
                animate={{
                  y: [0, 8, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                onClick={handleScroll}
                className="group flex cursor-pointer flex-col items-center gap-2"
                aria-label="Scroll down"
              >
                <div className="bg-background/80 group-hover:bg-background rounded-full border p-3 shadow-lg backdrop-blur-sm transition-all group-hover:shadow-xl">
                  <ChevronDown className="text-muted-foreground group-hover:text-foreground h-5 w-5 transition-colors" />
                </div>
                <span className="text-muted-foreground group-hover:text-foreground text-xs font-medium transition-colors">
                  Scroll for more
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  )
}
