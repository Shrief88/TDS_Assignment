import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useReservations from "@/hooks/useReservation";
import useStudios from "@/hooks/useStuidos";
import ReservationTab from "../tabs/ReservationsTab";
import StudiosTab from "../tabs/StudiosTab";

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
    <Tabs defaultValue="reservations" className="font-Inter">
      <TabsList className="font-bold">
        <TabsTrigger value="reservations">Reservations</TabsTrigger>
        <TabsTrigger value="past_reservations">Past Reservations</TabsTrigger>
        <TabsTrigger value="studios">Studios</TabsTrigger>
      </TabsList>
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
      <TabsContent value="studios">
        <StudiosTab
          studios={studios}
          isLoading={isStLoading}
          isError={isStError}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AdminView;
