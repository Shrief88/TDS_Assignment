import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";

import useAxiosToken from "@/hooks/useAxiosToken";
import IStudio from "@/models/studio";
import CardStudio from "./CardStudio";
import IReservation from "@/models/reservation";
import CardReservation from "./CardReservation";

const CustomerView = () => {
  const axiosClient = useAxiosToken();
  const [studios, setStudios] = useState<IStudio[]>([]);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [pastReservations, setPastReservations] = useState<IReservation[]>([]);
  const navigate = useNavigate();

  const fetchStudios = useCallback(async () => {
    try {
      const res = await axiosClient.get("studio/me");
      setStudios(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [axiosClient]);

  const fetchReservations = useCallback(async () => {
    try {
      const res = await axiosClient.get("reservation/me");

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
    fetchStudios();
    fetchReservations();
  }, [fetchStudios, fetchReservations]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 md:gap-x-8 py-4 md:py-10">
          {reservations.map((reservation) => (
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
      <TabsContent value="studios">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14 md:gap-x-14 py-4 md:py-10">
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
