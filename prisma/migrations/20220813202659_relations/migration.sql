/*
  Warnings:

  - You are about to drop the column `verifyAccountToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyAccountUserId` on the `User` table. All the data in the column will be lost.
  - The required column `id` was added to the `VerifyAccount` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "VerifyAccount_token_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "verifyAccountToken",
DROP COLUMN "verifyAccountUserId";

-- AlterTable
ALTER TABLE "VerifyAccount" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "VerifyAccount_pkey" PRIMARY KEY ("id");
