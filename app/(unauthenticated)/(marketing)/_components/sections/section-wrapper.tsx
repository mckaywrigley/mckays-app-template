import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({
  children,
  className,
  id
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("px-4 py-16", className)}>
      {children}
    </section>
  )
}
