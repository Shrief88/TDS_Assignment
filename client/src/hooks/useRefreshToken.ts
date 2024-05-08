import { useAppDispatch } from "@/store";
import { authStateServices } from "@/reducers/authSlice";
import { axiosClient } from "@/api/axios";
import { useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();

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
      return response.data.accessToken;
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  return refresh;
};

export default useRefreshToken;
