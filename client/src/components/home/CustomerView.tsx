import { useEffect, useState } from "react";

import { axiosClient } from "@/api/axios";
import IStudio from "@/models/studio";
import CardStudio from "./CardStudio";

const CustomerView = () => {
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
    <>
      <div>
        <p className="font-Inter font-semibold text-xl mb-8 lg:mb-11">Home</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14 md:gap-x-14">
        {studios.map((studio) => (
          <CardStudio
            id={studio.id}
            key={studio.id}
            cover={studio.images[0]}
            name={studio.name}
            address={studio.address}
          />
        ))}
      </div>
    </>
  );
};

export default CustomerView;
