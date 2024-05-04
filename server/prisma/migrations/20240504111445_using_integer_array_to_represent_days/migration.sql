/*
  Warnings:

  - The `availableDays` column on the `Studio` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Studio" DROP COLUMN "availableDays",
ADD COLUMN     "availableDays" INTEGER[];

-- DropEnum
DROP TYPE "WorkingDay";
