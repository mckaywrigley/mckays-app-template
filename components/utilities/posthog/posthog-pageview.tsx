/*
<ai_context>
This client component tracks pageviews in PostHog.
</ai_context>
*/

"use client"

import { usePathname } from "next/navigation"
import posthog from "posthog-js"
import { useEffect } from "react"

export function PostHogPageview() {
  const pathname = usePathname()

  useEffect(() => {
    // Track a pageview whenever the pathname changes
    if (pathname) {
      posthog.capture("$pageview", { path: pathname })
    }
  }, [pathname])

  return null
}
