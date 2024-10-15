"use client"

import { motion } from "framer-motion"
import { Headphones, LucideIcon, Shield, Smartphone, Zap } from "lucide-react"

interface FeatureProps {
  title: string
  description: string
  icon: LucideIcon
}

const features: FeatureProps[] = [
  {
    title: "Lightning Fast",
    description: "Experience blazing speeds with our optimized platform.",
    icon: Zap
  },
  {
    title: "Secure",
    description: "Your data is protected with state-of-the-art encryption.",
    icon: Shield
  },
  {
    title: "Mobile Friendly",
    description: "Access your account seamlessly on any device.",
    icon: Smartphone
  },
  {
    title: "24/7 Support",
    description: "Our dedicated team is always here to help you.",
    icon: Headphones
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
    <section className="bg-gray-100 py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">Our Features</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
