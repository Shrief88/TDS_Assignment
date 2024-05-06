import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Error from "../Error";
import EmptyList from "../EmptyList";
import SkeletonCard from "./SkeletonCard";
import CardReservation from "./CardReservation";
import CardStudio from "./CardStudio";
import useReservations from "@/hooks/useReservation";
import useStudios from "@/hooks/useStuidos";

const AdminView = () => {
  const {
    reservations,
    pastReservations,
    isloading: isResLoading,
    isError: isResError,
  } = useReservations("/reservation");

  const {
    studios,
    isloading: isStLoading,
    isError: isStError,
  } = useStudios("/studio");

  return (
    <Tabs defaultValue="studios" className="font-Inter">
      <TabsList className="font-bold">
        <TabsTrigger value="reservations">Reservations</TabsTrigger>
        <TabsTrigger value="past_reservations">Past Reservations</TabsTrigger>
        <TabsTrigger value="studios">Studios</TabsTrigger>
      </TabsList>
      <TabsContent value="reservations">
        {isResLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14 md:gap-x-14">
            {[1, 2, 3, 4].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
        {isResError && <Error />}
        {reservations.length === 0 && !isResLoading && !isResError && (
          <EmptyList />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 md:gap-x-8 py-4 md:py-10">
          {reservations.map((reservation) => (
            <CardReservation
              key={reservation.id}
              studioName={reservation.studio.name}
              customerName={reservation.customer.fullName}
              startDate={reservation.startDate}
              endDate={reservation.endDate}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="past_reservations">
        {isResLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14 md:gap-x-14">
            {[1, 2, 3, 4].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
        {isResError && <Error />}
        {reservations.length === 0 && !isResLoading && !isResError && (
          <EmptyList />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 md:gap-x-8 py-4 md:py-10">
          {pastReservations.map((reservation) => (
            <CardReservation
              key={reservation.id}
              studioName={reservation.studio.name}
              customerName={reservation.customer.fullName}
              startDate={new Date(reservation.startDate)}
              endDate={new Date(reservation.endDate)}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="studios">
        {isStLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14 md:gap-x-14">
            {[1, 2, 3].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
        {isStError && <Error />}
        {studios.length === 0 && !isStLoading && !isStError && <EmptyList />}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14 md:gap-x-14">
          {studios.map((studio) => (
            <CardStudio
              id={studio.id}
              key={studio.id}
              cover={studio.images[0]}
              name={studio.name}
              address={studio.address}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AdminView;
