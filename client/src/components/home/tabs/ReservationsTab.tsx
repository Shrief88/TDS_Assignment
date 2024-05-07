import EmptyList from "@/components/EmptyList";
import Error from "@/components/Error";
import SkeletonCard from "../SkeletonCard";
import CardReservation from "../CardReservation";

import IReservation from "@/models/reservation";

interface ReservationTabProps {
  reservations: IReservation[];
  isloading: boolean;
  isError: boolean;
}

const ReservationTab = ({
  reservations,
  isloading,
  isError,
}: ReservationTabProps) => {
  return (
    <>
      {isloading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14 md:gap-x-14">
          {[1, 2, 3, 4].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      {isError && <Error />}
      {reservations.length === 0 && !isloading && !isError && <EmptyList />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 md:gap-x-8 py-4 md:py-10">
        {reservations.map((reservation) => (
          <CardReservation
            id={reservation.id}
            key={reservation.id}
            studioName={reservation.studio.name}
            customerName={reservation.customer.fullName}
            startDate={reservation.startDate}
            endDate={reservation.endDate}
            createdAt={reservation.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default ReservationTab;
