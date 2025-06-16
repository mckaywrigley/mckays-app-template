import { Mail } from "lucide-react"

export default async function SupportPage() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          Support
        </h1>
        <p className="text-muted-foreground">
          Get help with your account and learning experience
        </p>
      </div>

      {/* Content */}
      <div className="max-w-2xl space-y-6">
        {/* Contact Card */}
        <div className="bg-card rounded-lg p-6 shadow">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Mail className="text-primary h-6 w-6" />
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-foreground text-xl font-semibold">
                Email Support
              </h2>
              <p className="text-muted-foreground">
                Have questions or need assistance? Our support team is here to
                help!
              </p>
              <div className="flex items-center gap-2">
                <span className="text-foreground">Contact us at:</span>
                <a
                  href="mailto:support@example.com"
                  className="text-primary hover:text-primary/80 font-medium underline"
                >
                  support@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
