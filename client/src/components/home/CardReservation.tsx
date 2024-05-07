import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { useTypedSelector } from "@/store";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import useAxiosToken from "@/hooks/useAxiosToken";
import { toast } from "sonner";

interface CardReservationProps {
  id: string;
  studioName: string;
  customerName: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

const CardReservation = ({
  id,
  studioName,
  customerName,
  startDate,
  endDate,
  createdAt,
}: CardReservationProps) => {
  const user = useTypedSelector((state) => state.authState.user);
  const [isAllowedToCancel, setIsAllowedToCancel] = useState(false);
  const axiosToken = useAxiosToken();

  useEffect(() => {
    if (user && user.type === "CUSTOMER") {
      const diff =
        (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60);
      if (diff < 15) setIsAllowedToCancel(true);
    }
  }, [user, createdAt]);

  const handlecancellation = async () => {
    try {
      toast.loading("Cancelling reservation...", { duration: Infinity });
      await axiosToken.delete(`/reservation/${id}`);
      toast.dismiss();
      toast.success("Reservation cancelled successfully");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      toast.dismiss();
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col px-5 pt-5">
        <p className="font-bold pb-3">{studioName}</p>
        <p className="text-muted-foreground text-sm font-bold pb-2">
          Customer Name
        </p>
        <p className="text-sm font-bold">{customerName}</p>
      </CardHeader>
      <CardContent className="py-5 px-5 flex gap-14 text-sm font-bold text-[#354052]">
        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground">Date</p>
          <p>
            {new Date(startDate).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground">Number of Days</p>
          <p>
            {(new Date(endDate).getTime() - new Date(startDate).getTime()) /
              (1000 * 60 * 60 * 24) +
              1}
          </p>
        </div>
      </CardContent>
      {isAllowedToCancel && (
        <CardFooter className="py-3 border-t px-0">
          <Button
            variant={"ghost"}
            className="text-primary mx-3"
            onClick={handlecancellation}
          >
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CardReservation;
