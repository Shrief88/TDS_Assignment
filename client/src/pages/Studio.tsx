import { axiosClient } from "@/api/axios";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import IStudio from "@/models/studio";
import { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MapPin, Star, Clock4 } from "lucide-react";
import workingDays from "@/models/workingDays";

const Studio = () => {
  const { id } = useParams();
  const [studio, setStudio] = useState<IStudio | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        const res = await axiosClient.get(`studio/${id}`);
        setStudio(res.data.data);
        setIsOpen(res.data.isOpen);
        setIsLoading(false);
      } catch (err) {
        navigate("/");
        console.log(err);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id, fetchData]);

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <Navbar />
      <div className="bg-muted flex-1 w-full px-7 lg:px-64 py-6 font-Inter">
        {!isloading && studio && (
          <>
            <div className="flex items-center text-muted-foreground gap-1 text-sm">
              <NavLink to="/">Home</NavLink>
              <p className="-mt-1.5">.</p>
              <p>{studio.name}</p>
            </div>
            <Card className="my-5">
              <CardHeader></CardHeader>
              <CardContent className="px-8 py-5">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-5">
                    <p className="font-bold text-xl">{studio.name}</p>
                    <div className="flex items-center">
                      <p className="font-semibold">5.0</p>
                      <div className="flex items-center gap-1 pl-1 pr-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} fill="#FFFFF" size="14" />
                        ))}
                      </div>
                      <p className="font-medium text-destructive-foreground">
                        (196)
                      </p>
                      {isOpen ? (
                        <p className="px-3 font-medium text-[#FFA101]">
                          Open Now
                        </p>
                      ) : (
                        <p className="px-3 font-medium text-[#FFA101]">
                          Closed
                        </p>
                      )}
                    </div>
                  </div>
                  <Button className="rounded-3xl font-semibold" size={"lg"}>
                    Book now
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="px-8 py-5 border-t">
                <div className="flex gap-8">
                  <div className="flex items-start gap-1">
                    <MapPin className="text-muted-foreground w-5 h-5" />
                    <div className="font-medium">
                      <p className="font-Inter">{studio.address}</p>
                      <p className="text-destructive-foreground">
                        Get Direction
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1">
                    <Clock4 className="text-muted-foreground w-5 h-5" />
                    <p>
                      {studio?.availableDays
                        .map((day) => workingDays[day])
                        .join(", ")}
                    </p>
                  </div>
                  <div>
                    <p>{isOpen ? "Open" : "Closed"}</p>
                    <p>
                      {studio?.startTime > 12
                        ? studio?.startTime - 12 + ":00 PM"
                        : studio?.startTime + ":00 AM"}
                      {" - "}
                      {studio?.endTime > 12
                        ? studio?.endTime - 12 + ":00 PM"
                        : studio?.endTime + ":00 AM"}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Studio;
