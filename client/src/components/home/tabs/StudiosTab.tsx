import EmptyList from "@/components/EmptyList";
import Error from "@/components/Error";
import SkeletonCard from "../SkeletonCard";
import CardStudio from "../CardStudio";

import IStudio from "@/models/studio";

interface StudiosTabProps {
  studios: IStudio[];
  isLoading: boolean;
  isError: boolean;
}

const StudiosTab = ({ studios, isLoading, isError }: StudiosTabProps) => {
  return (
    <>
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14 md:gap-x-14">
          {[1, 2, 3].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      {isError && <Error />}
      {studios.length === 0 && !isLoading && !isError && <EmptyList />}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14 md:gap-x-14 py-10">
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

export default StudiosTab;
