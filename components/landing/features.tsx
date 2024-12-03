"use client"

import { motion } from "framer-motion"
import {
  AppWindow,
  Database,
  DollarSign,
  LucideIcon,
  Shield
} from "lucide-react"

interface FeatureProps {
  title: string
  description: string
  icon: LucideIcon
}

const features: FeatureProps[] = [
  {
    title: "Frontend",
    description: "Next.js, Tailwind, Shadcn, Framer Motion",
    icon: AppWindow
  },
  {
    title: "Backend",
    description: "Postgres, Supabase, Drizzle ORM, Server Actions",
    icon: Database
  },
  {
    title: "Auth",
    description: "Clerk",
    icon: Shield
  },
  {
    title: "Payments",
    description: "Stripe",
    icon: DollarSign
  }
]

const FeatureCard = ({ title, description, icon: Icon }: FeatureProps) => (
  <motion.div
    className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="mb-4 size-12 text-blue-500" />
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
)

export const FeaturesSection = () => {
  return (
    <section className="mt-20 bg-gray-100 py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">Tech Stack</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
