import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface CardReservationProps {
  studioName: string;
  customerName: string;
  startDate: Date;
  endDate: Date;
}

const CardReservation = ({
  studioName,
  customerName,
  startDate,
  endDate,
}: CardReservationProps) => {
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
      <CardFooter className="px-5 py-3 border-t">
        <p className="text-primary">Cancel</p>
      </CardFooter>
    </Card>
  );
};

export default CardReservation;
