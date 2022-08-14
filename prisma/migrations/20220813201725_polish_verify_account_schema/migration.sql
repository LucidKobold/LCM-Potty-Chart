/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `VerifyAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `VerifyAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `verifyAccountToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifyAccountUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "VerifyAccount" DROP CONSTRAINT "VerifyAccount_userId_fkey";

-- DropIndex
DROP INDEX "VerifyAccount_userId_token_key";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verifyAccountToken" TEXT NOT NULL,
ADD COLUMN     "verifyAccountUserId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "VerificationToken" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "VerifyAccount" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "VerifyAccount_userId_key" ON "VerifyAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerifyAccount_token_key" ON "VerifyAccount"("token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifyAccount" ADD CONSTRAINT "VerifyAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
