/*
  Warnings:

  - The primary key for the `Reservations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `endDate` on the `Reservations` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Reservations` table. All the data in the column will be lost.
  - The `day` column on the `Reservations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The required column `id` was added to the `Reservations` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Reservations" DROP CONSTRAINT "Reservations_pkey",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "id" TEXT NOT NULL,
DROP COLUMN "day",
ADD COLUMN     "day" INTEGER[],
ADD CONSTRAINT "Reservations_pkey" PRIMARY KEY ("id");
