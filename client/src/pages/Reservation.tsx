import { useEffect, useState } from "react";

import { DateRange, DayPicker, Matcher } from "react-day-picker";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import "react-day-picker/dist/style.css";
import { Button } from "@/components/ui/button";

import useAxiosToken from "@/hooks/useAxiosToken";
import useStudio from "@/hooks/useStudio";
import IReservation from "@/models/reservation";
import Error from "@/components/Error";
import { useTypedSelector } from "@/store";

const Reservation = () => {
  const [selected, setSelected] = useState<DateRange | undefined>();
  const [totalDaysSelected, setTotalDaysSelected] = useState(0);
  const { id } = useParams();
  const axiosClient = useAxiosToken();
  const user = useTypedSelector((state) => state.authState.user);
  const { studio, isloading, isError, statusCode } = useStudio(id as string);
  const navigate = useNavigate();
  const [disabledDays, setDisabledDays] = useState<Matcher[]>([
    { before: new Date() },
  ]);

  if (statusCode === 404 || statusCode === 400) {
    navigate("/NotFoundPage");
  }

  useEffect(() => {
    if (studio) {
      const workingDays = studio.availableDays;
      const restDays = [0, 1, 2, 3, 4, 5, 6].filter(
        (day) => !workingDays.includes(day)
      );
      const takenDays = studio.reservations.map((reservation) => {
        return {
          from: new Date(reservation.startDate),
          to: new Date(reservation.endDate),
        };
      });
      setDisabledDays((prev) => [
        ...prev,
        { dayOfWeek: restDays },
        ...takenDays,
      ]);
    }
  }, [studio]);

  useEffect(() => {
    if (selected) {
      if (!selected.to && selected.from) {
        setTotalDaysSelected(1);
      } else {
        const diff =
          (selected.to?.getTime() || 0) - (selected.from?.getTime() || 0);
        setTotalDaysSelected(Math.ceil(diff / (1000 * 3600 * 24)) + 1);
      }
    }
  }, [selected]);

  const handleSubmit = async () => {
    try {
      if (!user) {
        toast.error("Please login first");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }

      if (!selected?.from) {
        toast.error("Please select a date range");
        return;
      }

      if (!selected.to) {
        selected.to = selected.from;
      }

      toast.loading("Reserving...", { duration: Infinity });
      const res = await axiosClient.post(`reservation`, {
        studioId: id,
        startDate: selected?.from,
        endDate: selected?.to,
      });

      const { startDate, endDate } = res.data.data as IReservation;

      toast.dismiss();
      toast.success("Reservation created successfully");
      setSelected(undefined);
      setDisabledDays((prev) => [...prev, { from: startDate, to: endDate }]);
    } catch (err) {
      toast.dismiss();
      if (err instanceof AxiosError) {
        if (
          err.response?.status === 409 ||
          err.response?.status === 404 ||
          err.response?.status === 400
        ) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };

  return (
    <div className="font-Inter xl:px-24">
      {isError && <Error />}
      {!isloading && !isError && studio && (
        <>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Step 2 of 2</p>
            <p className="font-semibold text-xl">Availability</p>
          </div>
          <div className="flex justify-center py-6">
            <Card>
              <DayPicker
                mode="range"
                selected={selected}
                onSelect={setSelected}
                disabled={disabledDays}
              />
            </Card>
          </div>

          <Card className="my-5">
            <CardContent className="p-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg overflow-hidden w-fit">
                  <img
                    src={
                      import.meta.env.VITE_IMAGES_URI + "/" + studio.images[0]
                    }
                    className="h-16 w-20 md:h-20"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <p className="font-bold">{studio.name}</p>
                  </div>
                  <div className="flex">
                    <p className="text-muted-foreground">{studio.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-2 py-5 border-t">
              <div className="flex flex-col font-semibold">
                <p>
                  Total Days Selected:
                  {totalDaysSelected === 0 ? "" : totalDaysSelected}
                </p>
                <div>
                  <p>
                    Dates:
                    <span>
                      {selected?.from &&
                        ` ${selected.from.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })}`}
                      {" - "}
                    </span>
                    <span>
                      {selected?.to &&
                        `${selected.to.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })}`}
                    </span>
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
          <div className="flex justify-end">
            <Button className="rounded-3xl w-20" onClick={handleSubmit}>
              Book
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Reservation;
