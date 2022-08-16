/*
  Warnings:

  - You are about to drop the `VerifyAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VerifyAccount" DROP CONSTRAINT "VerifyAccount_userId_fkey";

-- DropTable
DROP TABLE "VerifyAccount";

-- CreateTable
CREATE TABLE "ActivationToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "validatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivationToken_userId_key" ON "ActivationToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivationToken_token_key" ON "ActivationToken"("token");

-- AddForeignKey
ALTER TABLE "ActivationToken" ADD CONSTRAINT "ActivationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
