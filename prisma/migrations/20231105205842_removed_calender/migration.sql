/*
  Warnings:

  - You are about to drop the `Calendar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_userId_fkey";

-- DropTable
DROP TABLE "Calendar";
