import { NavLink, useNavigate } from "react-router-dom";

import { MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

interface CardStudioProps {
  id: string;
  cover: string;
  name: string;
  address: string;
}

const CardStudio = ({ id, cover, name, address }: CardStudioProps) => {
  const navigate = useNavigate();

  return (
    <Card className="rounded-3xl overflow-hidden">
      <div className="flex flex-col h-full">
        <CardHeader>
          <img
            src={import.meta.env.VITE_IMAGES_URI + "/studio/" + cover}
            className="w-full"
          />
        </CardHeader>
        <CardContent className="px-4 py-7 flex-grow">
          <NavLink to={`/studio/${id}`} className="hover:underline">
            <p className="font-Mulish font-semibold text-lg">{name}</p>
          </NavLink>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t">
          <div className="flex w-full gap-1 justify-between flex-nowrap items-center">
            <div className="flex items-start gap-1">
              <MapPin className="text-muted-foreground w-5 h-5" />
              <p className="font-Inter">{address}</p>
            </div>
            <Button
              variant="default"
              className="rounded-3xl"
              onClick={() => {
                navigate(`/studio/${id}`);
              }}
            >
              Book Now
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CardStudio;
