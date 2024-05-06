import { useCallback, useEffect, useState } from "react";

import IStudio from "@/models/studio";
import useAxiosToken from "./useAxiosToken";

const useStudios = (path: string) => {
  const [studios, setStudios] = useState<IStudio[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const axiosClient = useAxiosToken();

  const fetchData = useCallback(
    async (path: string) => {
      try {
        setIsLoading(true);
        const res = await axiosClient.get(path);
        setStudios(res.data.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
        console.log(err);
      }
    },
    [axiosClient]
  );

  useEffect(() => {
    fetchData(path);
  }, [fetchData, path]);

  return { studios, isloading, isError };
};

export default useStudios;
