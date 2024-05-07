import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useStudios from "@/hooks/useStuidos";
import StudiosTab from "../tabs/StudiosTab";
import useReservations from "@/hooks/useReservation";
import ReservationTab from "../tabs/ReservationsTab";

const CustomerView = () => {
  const {
    studios,
    isloading: isStLoading,
    isError: isStError,
  } = useStudios("/studio");
  const {
    reservations,
    pastReservations,
    isError: isResError,
    isloading: isResLoading,
  } = useReservations("/reservation/me");

  return (
    <>
      <Tabs defaultValue="studios" className="font-Inter">
        <TabsList className="font-bold">
          <TabsTrigger value="studios">Studios</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="past_reservations">Past Reservations</TabsTrigger>
        </TabsList>
        <TabsContent value="studios">
          <StudiosTab
            studios={studios}
            isLoading={isStLoading}
            isError={isStError}
          />
        </TabsContent>
        <TabsContent value="reservations">
          <ReservationTab
            reservations={reservations}
            isloading={isResLoading}
            isError={isResError}
          />
        </TabsContent>
        <TabsContent value="past_reservations">
          <ReservationTab
            reservations={pastReservations}
            isloading={isResLoading}
            isError={isResError}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CustomerView;
