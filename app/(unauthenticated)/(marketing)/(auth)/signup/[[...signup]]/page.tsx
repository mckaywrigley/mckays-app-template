"use client"

import { SignUp } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Star, Users, BookOpen, Trophy, CheckCircle } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SignUpPage() {
  const { theme } = useTheme()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left side - Benefits */}
        <motion.div
          className="hidden space-y-8 lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <motion.h1
              className="text-4xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Build your next big idea
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get instant access to a production-ready app template with
              everything you need to launch quickly.
            </motion.p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: BookOpen,
                title: "Full Stack Ready",
                desc: "Complete setup included"
              },
              {
                icon: Users,
                title: "Authentication",
                desc: "Clerk pre-configured"
              },
              {
                icon: Trophy,
                title: "Production Ready",
                desc: "Launch immediately"
              },
              {
                icon: Star,
                title: "Modern Stack",
                desc: "Next.js 15 + TypeScript"
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="bg-card rounded-lg border p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                }}
              >
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.4 + i * 0.1
                  }}
                >
                  <feature.icon className="text-primary mb-2 h-8 w-8" />
                </motion.div>
                <p className="text-sm font-semibold">{feature.title}</p>
                <p className="text-muted-foreground text-xs">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Social proof */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                      delay: 0.8 + i * 0.05
                    }}
                  >
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm font-medium">4.9/5</span>
              <span className="text-muted-foreground text-sm">
                (1,200+ developers)
              </span>
            </div>
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="border-background bg-muted h-8 w-8 rounded-full border-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + i * 0.05 }}
                  whileHover={{ y: -2 }}
                />
              ))}
              <motion.div
                className="border-background bg-muted flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.1 }}
                whileHover={{ y: -2 }}
              >
                +2k
              </motion.div>
            </div>
          </motion.div>

          {/* Money-back guarantee */}
          <motion.div
            className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 15px rgba(34, 197, 94, 0.2)"
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </motion.div>
            <p className="text-sm font-medium">100% Free & Open Source</p>
          </motion.div>
        </motion.div>

        {/* Right side - Sign up form */}
        <motion.div
          className="mx-auto w-full max-w-md lg:mx-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="mb-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="mb-2 text-2xl font-semibold">Create account</h2>
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Link
                  href="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Sign in here
                </Link>
              </motion.span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SignUp
              forceRedirectUrl="/dashboard"
              signInUrl="/login"
              appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
