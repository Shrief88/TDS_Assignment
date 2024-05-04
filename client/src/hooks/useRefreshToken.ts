import { useAppDispatch } from "@/store";
import { authStateServices } from "@/reducers/authSlice";
import { axiosClient } from "@/api/axios";

const useRefreshToken = () => {
  const dispath = useAppDispatch();

  const refresh = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return;
      const response = await axiosClient.get("/auth/refresh", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      dispath(authStateServices.actions.setAuthState(response.data));
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return refresh;
};

export default useRefreshToken;
