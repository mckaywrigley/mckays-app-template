ALTER TABLE "customers" DROP CONSTRAINT "customers_stripe_customer_id_unique";--> statement-breakpoint
ALTER TABLE "customers" DROP CONSTRAINT "customers_stripe_subscription_id_unique";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "stripe_customer_id";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "stripe_subscription_id";