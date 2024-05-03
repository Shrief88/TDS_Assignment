import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { signUpSchema, TSignUpSchema } from "@/validation/signup";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: TSignUpSchema) => {
    console.log(data);
  };

  return (
    <div className="w-full px-6 py-20 bg-muted flex flex-col justify-center items-center">
      <Card className="container bg-card px-7 py-11 rounded-[40px] max-w-[540px] shadow-sm shadow-slate-300">
        <CardHeader>
          <div>
            <div className="flex justify-between">
              <p>
                Welcome to
                <span className="text-primary font-semibold"> TDS</span>
              </p>
              <div className="w-20 md:w-36">
                <p className="text-sm text-secondary">Have an account ?</p>
                <NavLink to="/login" className="text-primary cursor-pointer">
                  Sign in
                </NavLink>
              </div>
            </div>
          </div>

          <CardTitle className="text-4xl font-medium -mt-7 lg:-mt-3 lg:text-6xl">
            Sign up
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
                <Label htmlFor="fullName" className="text-sm">
                  Enter your name
                </Label>
                <Input
                  id="fullName"
                  placeholder="Name"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <span className="text-sm text-red-500">
                    {errors.fullName.message}
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
              <div className="flex flex-col gap-4">
                <Label htmlFor="confirmPassword" className="text-sm">
                  Confirm your password
                </Label>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm password"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <Label className="text-sm">User Type</Label>
                <Select onValueChange={(value) => reset({ type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select User Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                    <SelectItem value="STUDIO_OWNER">Studio Owner</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <span className="text-sm text-red-500">
                    {errors.type.message}
                  </span>
                )}
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full shadow-sm shadow-[#779341] rounded-2xl"
                >
                  Sign up
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
