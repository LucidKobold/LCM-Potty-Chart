/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `VerifyAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VerifyAccount_token_key" ON "VerifyAccount"("token");
