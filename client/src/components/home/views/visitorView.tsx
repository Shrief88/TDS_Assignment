import useStudios from "@/hooks/useStuidos";
import StudiosTab from "../tabs/StudiosTab";

const VisitorView = () => {
  const { studios, isloading, isError } = useStudios("/studio");

  return (
    <>
      <div>
        <p className="font-Inter font-semibold text-xl mb-8 lg:mb-11">Home</p>
      </div>
      <StudiosTab studios={studios} isLoading={isloading} isError={isError} />
    </>
  );
};

export default VisitorView;
