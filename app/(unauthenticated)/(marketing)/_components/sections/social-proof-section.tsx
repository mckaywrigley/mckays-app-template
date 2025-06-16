"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { SectionWrapper } from "./section-wrapper"

const testimonials = [
  {
    name: "Alex Chen",
    role: "Indie Hacker",
    content:
      "This template saved me weeks of setup time. I went from idea to deployed MVP in just 2 days. The authentication and payment integration alone would have taken me a week to configure properly.",
    rating: 5
  },
  {
    name: "Sarah Williams",
    role: "Startup Founder",
    content:
      "As a non-technical founder, this template was a godsend. Clean code, great documentation, and everything just works out of the box. My developer was impressed with the code quality.",
    rating: 5
  },
  {
    name: "Mike Johnson",
    role: "Full Stack Developer",
    content:
      "I've tried many boilerplates, but this one hits different. Modern stack, best practices, and actually production-ready. It's now my go-to starting point for all client projects.",
    rating: 5
  }
]

export function SocialProofSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <motion.h2
            className="text-primary text-lg leading-8 font-semibold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Testimonials
          </motion.h2>
          <motion.p
            className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Loved by developers worldwide
          </motion.p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-card ring-border relative rounded-2xl p-8 shadow-md ring-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                <div className="flex items-center gap-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mt-6 text-base leading-7">
                  <p>"{testimonial.content}"</p>
                </blockquote>
                <figcaption className="text-foreground mt-6 text-base font-semibold">
                  <div>{testimonial.name}</div>
                  <div className="text-muted-foreground mt-1 text-sm">
                    {testimonial.role}
                  </div>
                </figcaption>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
