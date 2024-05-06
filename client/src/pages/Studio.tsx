import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Star, Clock4 } from "lucide-react";
import { Gallery, Image } from "react-grid-gallery";

import { Days } from "@/models/calendar";
import { useTypedSelector } from "@/store";
import { DeleteStudio } from "@/components/studio/DeleteStudio";
import Error from "@/components/Error";
import useStudio from "@/hooks/useStudio";

const Studio = () => {
  const { id } = useParams();
  const { studio, isloading, isError, statusCode, isOpen } = useStudio(
    id as string
  );
  const [images, setImages] = useState<Image[]>([]);
  const navigate = useNavigate();
  const user = useTypedSelector((state) => state.authState.user);

  useEffect(() => {
    if (studio) {
      const tmp: Image[] = studio.images.map((image) => {
        return {
          src: import.meta.env.VITE_IMAGES_URI + "/" + image,
          width: 340,
          height: 190,
        } as Image;
      });
      setImages(tmp);
    }
  }, [studio]);

  if (statusCode === 404 || statusCode === 400) {
    navigate("/NotFoundPage");
  }

  return (
    <div className="font-Inter xl:px-24">
      {isError && <Error />}
      {!isloading && !isError && studio && (
        <>
          <div className="flex items-center text-muted-foreground gap-1 text-sm pb-5">
            <NavLink to="/" className={"hover:underline"}>
              Home
            </NavLink>
            <p className="-mt-1.5">.</p>
            <p>{studio.name}</p>
          </div>

          <Gallery images={images} maxRows={2} />

          <Card className="my-5">
            <CardContent className="px-3 lg:px-8 py-5">
              <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                <div className="flex flex-col gap-2 md:gap-5">
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
                      <p className="px-3 font-medium text-[#FFA101]">Closed</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-center gap-4 md:flex-col md:justify-start">
                  {user?.type === "STUDIO_OWNER" &&
                  user.id === studio.ownerId ? (
                    <>
                      <Button className="rounded-3xl font-semibold w-28">
                        Edit
                      </Button>
                      <DeleteStudio id={studio.id} />
                    </>
                  ) : (
                    <Button
                      className="rounded-3xl font-semibold"
                      size={"lg"}
                      onClick={() => navigate(`/reservation/${id}`)}
                    >
                      Book now
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-3 lg:px-8 py-5">
              <div className="grid gap-y-6 gap-x-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="lg:col-span-1 flex items-start gap-1">
                  <MapPin className="text-muted-foreground w-5 h-5" />
                  <div className="font-medium">
                    <p className="font-Inter">{studio.address}</p>
                    <p className="text-destructive-foreground">Get Direction</p>
                  </div>
                </div>
                <div className="lg:col-span-1 flex items-start gap-1">
                  <Clock4 className="text-muted-foreground w-5 h-5" />
                  <p>
                    {studio?.availableDays.map((day) => Days[day]).join(", ")}
                  </p>
                </div>
                <div className="lg:col-span-1">
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
  );
};

export default Studio;
