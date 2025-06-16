import { RedirectToast } from "@/components/payments/redirect-toast"
import { Footer } from "./_components/footer"
import { HeaderWrapper } from "./_components/header-wrapper"
import { ScrollIndicator } from "./_components/scroll-indicator"
import { SiteBanner } from "./_components/site-banner"
import { StickyCTA } from "./_components/sticky-cta"

export default async function MarketingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteBanner />
      <HeaderWrapper />
      {children}
      <Footer />
      <StickyCTA />
      <ScrollIndicator />
      <RedirectToast />
    </>
  )
}
