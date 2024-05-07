import { axiosClient } from "@/api/axios";
import { useEffect, useState } from "react";
import useRefreshToken from "./useRefreshToken";
import { useTypedSelector } from "@/store";

const useAxiosToken = () => {
  const refresh = useRefreshToken();
  const accessToken = useTypedSelector((state) => state.authState.accessToken);
  const [refreshAttempts, setRefreshAttempts] = useState(0);

  useEffect(() => {
    const requestIntercept = axiosClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 401 &&
          refreshAttempts < 3
        ) {
          setRefreshAttempts((prev) => prev + 1);
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosClient(prevRequest);
        }
        if(refreshAttempts === 3) {
          localStorage.removeItem("refreshToken");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosClient.interceptors.response.eject(responseIntercept);
      axiosClient.interceptors.request.eject(requestIntercept);
    };
  }, [accessToken, refresh, refreshAttempts]);

  return axiosClient;
};

export default useAxiosToken;
