"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

export function RedirectToast() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const redirect = searchParams.get("redirect")

    if (redirect === "dashboard") {
      toast.info("Upgrade to Pro to access the dashboard", {
        duration: 5000
      })

      // Clean up the URL without causing a navigation
      const url = new URL(window.location.href)
      url.searchParams.delete("redirect")
      window.history.replaceState({}, "", url.pathname + url.hash)
    }
  }, [searchParams])

  return null
}
