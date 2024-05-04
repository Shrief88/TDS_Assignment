import { MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

interface CardDesktopProps {
  cover: string;
  name: string;
  address: string;
}

const CardDesktop = ({ cover, name, address }: CardDesktopProps) => {
  return (
    <Card className="rounded-3xl overflow-hidden">
      <CardHeader>
        <img
          src={import.meta.env.VITE_IMAGES_URI + "/" + cover}
          className="w-full"
        />
      </CardHeader>
      <CardContent className="px-4 py-7">
        <p className="font-Mulish font-semibold text-lg">{name}</p>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t w-full">
        <div className="flex w-full gap-1 justify-between flex-nowrap items-center">
          <div className="flex items-start gap-1">
            <MapPin className="text-muted-foreground w-5 h-5" />
            <p className="font-Inter">{address}</p>
          </div>
          <Button variant="default" className="rounded-3xl">
            Book Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardDesktop;
