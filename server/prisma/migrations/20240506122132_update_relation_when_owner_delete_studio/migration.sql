-- DropForeignKey
ALTER TABLE "Reservations" DROP CONSTRAINT "Reservations_studioId_fkey";

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
