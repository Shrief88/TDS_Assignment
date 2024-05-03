/*
  Warnings:

  - You are about to drop the column `EndTime` on the `Studio` table. All the data in the column will be lost.
  - You are about to drop the column `StartTime` on the `Studio` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Studio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Studio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Studio" DROP COLUMN "EndTime",
DROP COLUMN "StartTime",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
