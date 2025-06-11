-- CreateEnum
CREATE TYPE "RewardType" AS ENUM ('Percentage', 'Fixed');

-- CreateTable
CREATE TABLE "RewardRule" (
    "id" TEXT NOT NULL,
    "ruleDescription" TEXT NOT NULL,
    "financeTxType" TEXT NOT NULL,
    "rewardType" "RewardType" NOT NULL,
    "rewardCurrencyCode" TEXT NOT NULL,
    "rewardPercentage" DECIMAL(10,2),
    "fixedReward" DECIMAL(10,2),
    "awardedXP" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardRule_pkey" PRIMARY KEY ("id")
);
