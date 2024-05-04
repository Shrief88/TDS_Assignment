/*
  Warnings:

  - The primary key for the `Reservations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `day` to the `Reservations` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startDate` on the `Reservations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endDate` on the `Reservations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Reservations" DROP CONSTRAINT "Reservations_pkey",
ADD COLUMN     "day" INTEGER NOT NULL,
DROP COLUMN "startDate",
ADD COLUMN     "startDate" INTEGER NOT NULL,
DROP COLUMN "endDate",
ADD COLUMN     "endDate" INTEGER NOT NULL,
ADD CONSTRAINT "Reservations_pkey" PRIMARY KEY ("customerId", "studioId", "startDate", "endDate");
