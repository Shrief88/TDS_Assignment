import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, NavLink } from "react-router-dom";
import { AxiosError } from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { loginSchema, TLoginSchema } from "@/validation/login";
import { axiosClient } from "@/api/axios";
import { useAppDispatch } from "@/store";
import { authStateServices } from "@/reducers/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      toast.loading("Logging in...", { duration: Infinity });
      const res = await axiosClient.post("auth/login", data);
      toast.dismiss();
      dispatch(
        authStateServices.actions.setAuthState({
          accessToken: res.data.accessToken,
          user: res.data.user,
        })
      );
      localStorage.setItem("refreshToken", res.data.refreshToken);
      navigate("/");
    } catch (err) {
      toast.dismiss();
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          toast.error(err.response.data.message);
        } else if (err.response?.status === 400) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };

  return (
    <div className="h-screen w-full px-6 py-20 bg-muted flex flex-col justify-center items-center">
      <Card className="container px-7 py-11 rounded-[40px] max-w-[540px]">
        <CardHeader>
          <div>
            <div className="flex justify-between">
              <p>
                Welcome to
                <span className="text-primary font-semibold"> TDS</span>
              </p>
              <div className="w-20 md:w-28">
                <p className="text-sm text-secondary">No account ?</p>
                <NavLink to="/signup" className="text-primary cursor-pointer">
                  Sign up
                </NavLink>
              </div>
            </div>
          </div>

          <CardTitle className="text-4xl font-medium -mt-7 lg:-mt-3 lg:text-6xl">
            Sign in
          </CardTitle>
        </CardHeader>
        <CardContent className="py-14 lg:py-11">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-9">
              <div className="flex flex-col gap-4">
                <Label htmlFor="email" className="text-sm">
                  Enter your email address
                </Label>
                <Input
                  id="email"
                  placeholder="Email address"
                  {...register("email")}
                  type="email"
                />
                {errors.email && (
                  <span className="text-sm text-red-500 font-Istok">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="password" className="text-sm">
                  Enter your password
                </Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full shadow-sm shadow-[#779341] rounded-2xl"
                >
                  Sign in
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
