import { useCallback, useEffect, useState } from "react";
import { axiosClient } from "../api/axios";

import IStudio from "@/models/studio";

const useStudio = (id: string) => {
  const [studio, setStudio] = useState<IStudio>();
  const [isloading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axiosClient.get(`studio/${id}`);
      setStudio(res.data.data);
      setIsOpen(res.data.isOpen);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData(id);
  }, [fetchData, id]);

  return { studio, isloading, isError, isOpen };
};

export default useStudio;
