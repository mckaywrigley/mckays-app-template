"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { useState } from "react"
import { SectionWrapper } from "./section-wrapper"

const faqs = [
  {
    question: "What's included in the template?",
    answer:
      "Everything you need to build a production app: Next.js 15 with App Router, TypeScript, Tailwind CSS v4, shadcn/ui components, Clerk authentication, Stripe payments, PostgreSQL with Drizzle ORM, and PostHog analytics. All pre-configured and ready to use."
  },
  {
    question: "How do I get started?",
    answer:
      "Simply clone the repository from GitHub, copy the .env.example to .env.local, add your API keys, run npm install, and you're ready to go. The whole process takes less than 5 minutes."
  },
  {
    question: "Is this really free?",
    answer:
      "Yes! This template is 100% free and open source under the MIT license. You can use it for personal projects, commercial applications, or anything else. No hidden costs or premium features."
  },
  {
    question: "Can I customize everything?",
    answer:
      "Absolutely! You have full access to all the source code. Modify the components, change the styling, add or remove features - it's your codebase now. The template is designed to be a starting point that you can build upon."
  },
  {
    question: "What about deployment?",
    answer:
      "The template works with any hosting provider that supports Next.js. Deploy to Vercel, Netlify, Railway, or any other platform. Database can be hosted on Supabase, Neon, or any PostgreSQL provider."
  },
  {
    question: "How do I get help if I'm stuck?",
    answer:
      "Open an issue on GitHub for bugs or feature requests. For general questions, the community is active in discussions. If you need dedicated support, consider becoming a sponsor or reaching out for custom development."
  }
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (question: string) => {
    setOpenItems(prev =>
      prev.includes(question)
        ? prev.filter(item => item !== question)
        : [...prev, question]
    )
  }

  return (
    <SectionWrapper id="faq">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="text-foreground text-2xl leading-10 font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently asked questions
          </motion.h2>
          <motion.p
            className="text-muted-foreground mt-6 text-base leading-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to know about the template. Can't find what
            you're looking for? Open an issue on GitHub.
          </motion.p>
          <dl className="mt-10 space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Collapsible
                  open={openItems.includes(faq.question)}
                  onOpenChange={() => toggleItem(faq.question)}
                >
                  <CollapsibleTrigger className="flex w-full items-start justify-between text-left">
                    <span className="text-foreground text-base leading-7 font-semibold">
                      {faq.question}
                    </span>
                    <motion.span
                      className="ml-6 flex h-7 items-center"
                      animate={{
                        rotate: openItems.includes(faq.question) ? 45 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus
                        className="text-muted-foreground h-6 w-6"
                        aria-hidden="true"
                      />
                    </motion.span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 pr-12">
                    <motion.p
                      className="text-muted-foreground text-base leading-7"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.p>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </SectionWrapper>
  )
}
