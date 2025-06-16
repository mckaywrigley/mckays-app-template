"use client"

import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function StickyCTA() {
  const [dismissed, setDismissed] = useState(false)
  return (
    <AnimatePresence>
      {!dismissed && (
        <>
          {/* Mobile version - bottom bar */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="border-border bg-background/80 fixed right-0 bottom-0 left-0 z-50 border-t p-4 backdrop-blur-lg md:hidden"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-muted-foreground text-xs font-medium">
                  Love this template?
                </p>
                <p className="text-foreground text-sm font-semibold">
                  Star us on GitHub!
                </p>
              </div>
              <Button size="sm" asChild className="group">
                <Link
                  href="https://github.com/mckaywrigley/mckays-app-template"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Building
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              {/* Close button */}
              <button
                aria-label="Dismiss"
                onClick={() => setDismissed(true)}
                className="hover:bg-accent ml-2 rounded-full p-1"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4l8 8m0-8l-8 8"
                  />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Desktop version - bottom right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="border-border bg-card fixed right-6 bottom-6 z-50 hidden max-w-sm min-w-[300px] rounded-lg border p-6 shadow-xl md:block"
          >
            <button
              aria-label="Dismiss"
              onClick={() => setDismissed(true)}
              className="hover:bg-accent absolute top-3 right-3 rounded-full p-1"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5l8 8m0-8l-8 8"
                />
              </svg>
            </button>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Love this template?
                </p>
                <p className="text-foreground text-lg font-bold">
                  Star us on GitHub!
                </p>
              </div>
              <Button asChild className="group w-full">
                <Link
                  href="https://github.com/mckaywrigley/mckays-app-template"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <p className="text-muted-foreground text-center text-xs">
                The #1 Full Stack App Template
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
