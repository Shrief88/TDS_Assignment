import IStudio from "@/models/studio";
import { useCallback, useEffect, useState } from "react";
import useAxiosToken from "./useAxiosToken";

const useStudio = (id: string) => {
  const [studio, setStudio] = useState<IStudio>();
  const [isloading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const axiosClient = useAxiosToken();

  const fetchData = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        const res = await axiosClient.get(`studio/${id}`);
        setStudio(res.data.data);
        setIsOpen(res.data.isOpen);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        console.log(err);
      }
    },
    [axiosClient]
  );

  useEffect(() => {
    fetchData(id);
  }, [fetchData, id]);

  return { studio, isloading, isError, isOpen };
};

export default useStudio;
