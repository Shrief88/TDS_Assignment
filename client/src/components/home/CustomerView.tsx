import useStudios from "@/hooks/useStuidos";
import CardStudio from "./CardStudio";
import SkeletonCard from "./SkeletonCard";
import Error from "../Error";
import EmptyList from "../EmptyList";

const CustomerView = () => {
  const { studios, isloading, isError } = useStudios("/studio");

  return (
    <>
      <div>
        <p className="font-Inter font-semibold text-xl mb-8 lg:mb-11">Home</p>
      </div>
      {isloading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14 md:gap-x-14">
          {[1, 2, 3].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      {isError && <Error />}
      {studios.length === 0 && !isloading && !isError && <EmptyList />}
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
