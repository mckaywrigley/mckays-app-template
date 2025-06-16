import { getBillingDataByUserId } from "@/actions/customers"
import { auth } from "@clerk/nextjs/server"
import { AlertCircle, CreditCard } from "lucide-react"

export default async function BillingPage() {
  const { userId } = await auth()

  if (!userId) {
    return (
      <div>
        <div className="bg-destructive/10 flex items-center gap-3 rounded-lg p-4">
          <AlertCircle className="text-destructive h-5 w-5" />
          <p className="text-foreground text-sm">
            Unable to load billing information. Please try again.
          </p>
        </div>
      </div>
    )
  }

  const customerResponse = await getBillingDataByUserId(userId)
  console.log(customerResponse)

  const customerData = customerResponse.customer

  if (!customerData) {
    return (
      <div>
        <div className="flex items-center gap-3 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Please complete your profile setup to access billing information.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <CreditCard className="text-muted-foreground h-8 w-8" />
          Billing
        </h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Subscription Details</h2>
        <p className="text-muted-foreground">
          Your current subscription plan is{" "}
          <span className="font-medium">{customerData.membership}</span>.
        </p>
      </div>
    </div>
  )
}
