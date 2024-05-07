import { useNavigate } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../../ui/button";

import useStudios from "@/hooks/useStuidos";
import useReservations from "@/hooks/useReservation";
import ReservationTab from "../tabs/ReservationsTab";
import StudiosTab from "../tabs/StudiosTab";

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

export default CustomerView;
