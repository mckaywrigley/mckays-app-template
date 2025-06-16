"use client"

import { createCheckoutUrl } from "@/actions/stripe"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function CheckoutRedirect() {
  const { isSignedIn } = useAuth()
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    const handlePendingCheckout = async () => {
      // Only run once per mount and if signed in
      if (!isSignedIn || hasChecked) return

      setHasChecked(true)

      const pendingCheckout = sessionStorage.getItem("pendingCheckout")
      if (!pendingCheckout) return

      // Clear the pending checkout immediately to prevent loops
      sessionStorage.removeItem("pendingCheckout")

      try {
        const result = await createCheckoutUrl(pendingCheckout)

        if (result.error) {
          toast.error(result.error)
          return
        }

        if (result.url) {
          // Redirect to Stripe checkout
          window.location.href = result.url
        }
      } catch (error) {
        console.error("Checkout redirect error:", error)
        toast.error("Failed to redirect to checkout")
      }
    }

    handlePendingCheckout()
  }, [isSignedIn, hasChecked])

  return null
}
