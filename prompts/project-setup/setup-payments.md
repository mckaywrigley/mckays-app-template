# Payments Setup Instructions

Use this guide to setup the payments for this project.

It uses Stripe for payments.

Write the complete code for every step. Do not get lazy. Write everything that is needed.

Your goal is to completely finish the payments setup.

## Helpful Links

If the user gets stuck, refer them to the following links:

- [Stripe](https://stripe.com/)
- [Stripe Docs](https://stripe.com/docs)

## Required Environment Variables

Make sure the user knows to set the following environment variables:

```bash
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PORTAL_LINK=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY=
```

## Install Libraries

Make sure the user knows to install the following libraries:

```bash
npm i stripe
```

## Setup Steps

- Create a `lib/stripe.ts` file with the following code:

```ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  appInfo: {
    name: "Todo App",
    version: "0.1.0"
  }
});
```

- Create a `actions/stripe-actions.ts` file with the following code:

````ts
import {
  updateProfile,
  updateProfileByCustomerId
} from "@/db/queries/profiles-queries"
import { Membership } from "@/types/membership"
import Stripe from "stripe"
import { stripe } from "./stripe"

const getMembershipStatus = (
  status: Stripe.Subscription.Status,
  membership: Membership
): Membership => {
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

export const updateStripeCustomer = async (
  profileId: string,
  subscriptionId: string,
  customerId: string
) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"]
  })

  const updatedProfile = await updateProfile(profileId, {
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscription.id
  })

  if (!updatedProfile) {
    throw new Error("Failed to update customer")
  }
}

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  productId: string
) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"]
  })

  const product = await stripe.products.retrieve(productId)
  const membership = product.metadata.membership as Membership

  const membershipStatus = getMembershipStatus(subscription.status, membership)

  await updateProfileByCustomerId(customerId, {
    stripeSubscriptionId: subscription.id,
    membership: membershipStatus
  })
}
```

- Create a `app/api/stripe/webhooks/route.ts` file with the following code:

```
import { stripe } from "@/lib/utils/stripe/stripe"
import {
  manageSubscriptionStatusChange,
  updateStripeCustomer
} from "@/lib/utils/stripe/stripe-db"
import { headers } from "next/headers"
import Stripe from "stripe"

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted"
])

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get("Stripe-Signature") as string
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET
  let event: Stripe.Event

  try {
    if (!sig || !webhookSecret) {
      throw new Error("Webhook secret or signature missing")
    }

    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          const subscription = event.data.object as Stripe.Subscription
          const productId = subscription.items.data[0].price.product as string

          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            productId
          )

          break

        case "checkout.session.completed":
          const checkoutSession = event.data.object as Stripe.Checkout.Session
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription

            await updateStripeCustomer(
              checkoutSession.client_reference_id as string,
              subscriptionId as string,
              checkoutSession.customer as string
            )

            const subscription = await stripe.subscriptions.retrieve(
              subscriptionId as string,
              {
                expand: ["default_payment_method"]
              }
            )

            const productId = subscription.items.data[0].price.product as string

            await manageSubscriptionStatusChange(
              subscription.id,
              subscription.customer as string,
              productId
            )
          }

          break

        default:
          throw new Error("Unhandled relevant event!")
      }
    } catch (error) {
      return new Response(
        "Webhook handler failed. View your nextjs function logs.",
        {
          status: 400
        }
      )
    }
  }

  return new Response(JSON.stringify({ received: true }))
}
```

- The payments system is now setup.
````
