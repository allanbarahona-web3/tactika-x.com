-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('saas_full', 'crm_only', 'billing_only');

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN "subscriptionType" "SubscriptionType" NOT NULL DEFAULT 'saas_full';
