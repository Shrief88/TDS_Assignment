/*
  Warnings:

  - You are about to drop the column `day` on the `Reservations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservations" DROP COLUMN "day",
ADD COLUMN     "days" INTEGER[];
