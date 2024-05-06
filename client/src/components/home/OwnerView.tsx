import { useNavigate } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";

import CardStudio from "./CardStudio";
import CardReservation from "./CardReservation";
import SkeletonCard from "./SkeletonCard";
import EmptyList from "../EmptyList";
import Error from "../Error";
import useStudios from "@/hooks/useStuidos";
import useReservations from "@/hooks/useReservation";

const CustomerView = () => {
  const {
    studios,
    isloading: isStLoading,
    isError: isStError,
  } = useStudios("/studio/me");

  const {
    reservations,
    pastReservations,
    isloading: isResLoading,
    isError: isResError,
  } = useReservations("/reservation/me");

  const navigate = useNavigate();

  return (
    <Tabs defaultValue="reservations" className="font-Inter">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <TabsList className="font-bold flex justify-center md:justify-start">
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="past_reservations">Past Reservations</TabsTrigger>
          <TabsTrigger value="studios">My Studios</TabsTrigger>
        </TabsList>
        <Button
          className="rounded-3xl"
          onClick={() => navigate("/create-studio")}
        >
          Add New Studio
        </Button>
      </div>

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

export default CustomerView;
