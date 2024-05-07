import { useTypedSelector } from "@/store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface RestrictAccessProps {
  type: string;
}

const RestrictAccess = ({ type }: RestrictAccessProps) => {
  const user = useTypedSelector((state) => state.authState.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
    if (user && user.type !== type) navigate("/");
  }, [user, type, navigate]);

  return <Outlet />;
};

export default RestrictAccess;
