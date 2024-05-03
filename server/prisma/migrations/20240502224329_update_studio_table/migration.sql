/*
  Warnings:

  - Added the required column `EndTime` to the `Studio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartTime` to the `Studio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Studio` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkingDay" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "Studio" ADD COLUMN     "EndTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "StartTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "availableDays" "WorkingDay"[],
ADD COLUMN     "images" TEXT[];
