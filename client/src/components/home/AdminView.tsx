import { useCallback, useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useAxiosToken from "@/hooks/useAxiosToken";
import IReservation from "@/models/reservation";
import CardReservation from "./CardReservation";

const AdminView = () => {
  const axiosClient = useAxiosToken();
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [pastReservations, setPastReservations] = useState<IReservation[]>([]);

  const fetchReservations = useCallback(async () => {
    try {
      const res = await axiosClient.get("reservation");

      const past_reservations: IReservation[] = [];
      const current_reservations: IReservation[] = [];
      (res.data.data as IReservation[]).map((reservation) => {
        if (new Date(reservation.endDate).getTime() < new Date().getTime()) {
          past_reservations.push(reservation);
        } else {
          current_reservations.push(reservation);
        }
      });

      setReservations(current_reservations);
      setPastReservations(past_reservations);
    } catch (err) {
      console.log(err);
    }
  }, [axiosClient]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return (
    <Tabs defaultValue="reservations" className="font-Inter">
      <TabsList className="font-bold">
        <TabsTrigger value="reservations">Reservations</TabsTrigger>
        <TabsTrigger value="past_reservations">Past Reservations</TabsTrigger>
      </TabsList>
      <TabsContent value="reservations">
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
    </Tabs>
  );
};

export default AdminView;
