import { useCallback, useEffect, useState } from "react";
import { axiosClient } from "../api/axios";

import IStudio from "@/models/studio";
import { AxiosError } from "axios";

const useStudio = (id: string) => {
  const [studio, setStudio] = useState<IStudio>();
  const [isloading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axiosClient.get(`studio/${id}`);
      setStudio(res.data.data);
      setIsOpen(res.data.isOpen);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        setStatusCode(err.response?.status || 0);
      }
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData(id);
  }, [fetchData, id]);

  return { studio, statusCode, isloading, isError, isOpen };
};

export default useStudio;
