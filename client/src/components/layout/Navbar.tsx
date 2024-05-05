import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { useTypedSelector } from "@/store";
import { Avatar, AvatarFallback } from "../ui/avatar";

const Navbar = () => {
  const user = useTypedSelector((state) => state.authState.user);
  const logout = () => {
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  return (
    <div className="w-full bg-card font-Inter grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-y-6 py-4 px-4 md:px-8 lg:px-36 xl:px-60 md:gap-y-0">
      <div className="order-2 md:order-1 md:col-span-2 lg:col-span-1 flex items-center md:gap-12">
        <NavLink to="/">
          <img src={logo} alt="TDS" className="w-24 hidden md:block" />
        </NavLink>
        <div className="flex flex-1 items-center px-3 rounded-lg  md:rounded-full  md:max-w-[360px] bg-muted h-11">
          <Search className="mr-4 h-6 w-6 text-muted-foreground shrink-0 opacity-50" />
          <p className="text-muted-foreground text-sm">
            Search for a service or venue
          </p>
        </div>
      </div>
      <div className="order-1 md:order-2 md:col-span-1 justify-between md:justify-end flex items-center gap-4">
        <div className="flex gap-4 items-center order-2 md:order-1">
          {!user && (
            <>
              <NavLink to="/login">
                <Button variant="ghost" className="font-semibold px-0 md:px-4">
                  Login
                </Button>
              </NavLink>

              <NavLink to="/signup">
                <Button variant="ghost" className="font-semibold px-0 md:px-4">
                  Sign up
                </Button>
              </NavLink>
            </>
          )}

          {user && (
            <>
              <Button
                variant="ghost"
                className="font-semibold px-0 md:px-4"
                onClick={logout}
              >
                Logout
              </Button>
              <Avatar>
                <AvatarFallback>
                  {user.fullName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </>
          )}
        </div>

        <div className="flex flex-col gap-1  md:px-4 order-1 md:order-2">
          <div className="h-[3px] w-6 bg-black rounded-2xl"></div>
          <div className="h-[3px] w-6 bg-black rounded-2xl"></div>
          <div className="h-[3px] w-6 bg-black rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
