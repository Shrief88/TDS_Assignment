import { useCallback, useEffect, useState } from "react";

import IReservation from "@/models/reservation";
import useAxiosToken from "./useAxiosToken";

const useReservations = (path: string) => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [pastReservations, setPastReservations] = useState<IReservation[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const axiosClient = useAxiosToken();

  const fetchData = useCallback(
    async (path: string) => {
      try {
        setIsLoading(true);
        const res = await axiosClient.get(path);
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
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
        console.log(err);
      }
    },
    [axiosClient]
  );

  useEffect(() => {
    fetchData(path);
  }, [fetchData, path]);

  return { reservations, pastReservations, isloading, isError };
};

export default useReservations;
