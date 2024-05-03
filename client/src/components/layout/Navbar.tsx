import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full bg-card font-Inter grid grid-cols-1 gap-y-6 px-4 py-4 lg:grid-cols-2 lg:px-60 lg:gap-y-0">
      <div className="order-2 lg:order-1 lg:grid-cols-1 flex items-center gap-12">
        <img src={logo} alt="TDS" className="w-24 hidden lg:block" />
        <div className="flex flex-1 items-center px-3 rounded-lg  lg:rounded-full max-w-[360px] bg-muted h-11">
          <Search className="mr-4 h-6 w-6 text-muted-foreground shrink-0 opacity-50" />
          <p className="text-muted-foreground text-sm">
            Search for a service or venue
          </p>
        </div>
      </div>
      <div className="order-1 lg:order-2 lg:grid-cols-1 justify-between lg:justify-end flex items-center gap-4">
        <div className="flex gap-4 items-center order-2 lg:order-1">
          <NavLink to="/login">
            <Button variant="ghost" className="font-semibold px-0 lg:px-4">
              Login
            </Button>
          </NavLink>

          <NavLink to="/signup">
            <Button variant="ghost" className="font-semibold px-0 lg:px-4">
              Sign up
            </Button>
          </NavLink>
        </div>

        <div className="flex flex-col gap-1  lg:px-4 order-1 lg:order-2">
          <div className="h-[3px] w-6 bg-black rounded-2xl"></div>
          <div className="h-[3px] w-6 bg-black rounded-2xl"></div>
          <div className="h-[3px] w-6 bg-black rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
