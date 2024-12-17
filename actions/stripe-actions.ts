/*
<ai_context>
Contains server actions related to Stripe.
</ai_context>
*/

import {
  updateProfileAction,
  updateProfileByStripeCustomerIdAction
} from "@/actions/db/profiles-actions"
import { SelectProfile } from "@/db/schema"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

type MembershipStatus = SelectProfile["membership"]

const getMembershipStatus = (
  status: Stripe.Subscription.Status,
  membership: MembershipStatus
): MembershipStatus => {
  switch (status) {
    case "active":
    case "trialing":
      return membership
    case "canceled":
    case "incomplete":
    case "incomplete_expired":
    case "past_due":
    case "paused":
    case "unpaid":
      return "free"
    default:
      return "free"
  }
}

const getSubscription = async (subscriptionId: string) => {
  return stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"]
  })
}

export const updateStripeCustomer = async (
  userId: string,
  subscriptionId: string,
  customerId: string
) => {
  try {
    if (!userId || !subscriptionId || !customerId) {
      throw new Error("Missing required parameters for updateStripeCustomer")
    }

    const subscription = await getSubscription(subscriptionId)

    const result = await updateProfileAction(userId, {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id
    })

    if (!result.isSuccess) {
      throw new Error("Failed to update customer profile")
    }

    return result.data
  } catch (error) {
    console.error("Error in updateStripeCustomer:", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to update Stripe customer")
  }
}

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  productId: string
): Promise<MembershipStatus> => {
  try {
    if (!subscriptionId || !customerId || !productId) {
      throw new Error(
        "Missing required parameters for manageSubscriptionStatusChange"
      )
    }

    const subscription = await getSubscription(subscriptionId)
    const product = await stripe.products.retrieve(productId)
    const membership = product.metadata.membership as MembershipStatus

    if (!["free", "pro"].includes(membership)) {
      throw new Error(
        `Invalid membership type in product metadata: ${membership}`
      )
    }

    const membershipStatus = getMembershipStatus(
      subscription.status,
      membership
    )

    const updateResult = await updateProfileByStripeCustomerIdAction(
      customerId,
      {
        stripeSubscriptionId: subscription.id,
        membership: membershipStatus
      }
    )

    if (!updateResult.isSuccess) {
      throw new Error("Failed to update subscription status")
    }

    return membershipStatus
  } catch (error) {
    console.error("Error in manageSubscriptionStatusChange:", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to update subscription status")
  }
}
