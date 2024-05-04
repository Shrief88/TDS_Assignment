import Navbar from "@/components/layout/Navbar";
import { useEffect, useState } from "react";
import { axiosClient } from "@/api/axios";
import IStudio from "@/models/studio";
import CardDesktop from "@/components/home/CardDesktop";

const Home = () => {
  const [studios, setStudios] = useState<IStudio[]>([]);

  const fetchData = async () => {
    try {
      const res = await axiosClient.get("studio");
      setStudios(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <Navbar />
      <div className="bg-muted flex-1 w-full px-7 lg:px-36 py-8 lg:py-14">
        <div>
          <p className="font-Inter font-semibold text-xl mb-8 lg:mb-11">Home</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 md:gap-x-14">
          {studios.map((studio) => (
            <CardDesktop
              key={studio.id}
              cover={studio.images[0]}
              name={studio.name}
              address={studio.address}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
