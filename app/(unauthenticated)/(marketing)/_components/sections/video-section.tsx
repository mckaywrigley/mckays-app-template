"use client"

import { motion } from "framer-motion"
import { Play, Timer, Zap } from "lucide-react"
import { useState } from "react"
import { SectionWrapper } from "./section-wrapper"

export function VideoSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            See it in action
          </motion.h2>
          <motion.p
            className="text-muted-foreground mt-4 text-lg leading-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Watch how quickly you can go from clone to deployed app
          </motion.p>
        </div>

        <motion.div
          className="mx-auto mt-16 max-w-4xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="group bg-foreground relative aspect-video cursor-pointer overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Video Preview Background */}
            <div className="from-brand-primary via-brand-secondary to-brand-accent absolute inset-0 bg-gradient-to-br opacity-20" />

            {/* Code Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-muted-foreground text-left font-mono text-sm select-none"
                animate={{
                  opacity: isHovered ? 0.3 : 0.6
                }}
                transition={{ duration: 0.3 }}
              >
                <pre className="overflow-hidden">
                  <code>{`$ git clone github.com/mckaywrigley/template
$ cd template
$ npm install
$ cp .env.example .env.local
$ npm run dev

✓ Ready in 3s
○ Compiling / ...
✓ Compiled successfully
✓ Ready at http://localhost:3000`}</code>
                </pre>
              </motion.div>
            </div>

            {/* Play Button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                className="bg-background/90 text-foreground flex h-20 w-20 items-center justify-center rounded-full shadow-2xl backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Play className="ml-1 h-8 w-8" fill="currentColor" />
              </motion.button>
            </motion.div>

            {/* Video Stats */}
            <div className="from-foreground absolute right-0 bottom-0 left-0 bg-gradient-to-t to-transparent p-6">
              <div className="text-background flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Quick Start Demo</h3>
                  <p className="text-background/80 mt-1 text-sm">
                    From clone to deploy in minutes
                  </p>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Timer className="h-4 w-4" />
                    <span>5 min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    <span>Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature badges */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              "TypeScript",
              "Next.js 15",
              "Tailwind CSS",
              "Clerk Auth",
              "Stripe"
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="bg-muted text-muted-foreground inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: 0.5 + index * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
