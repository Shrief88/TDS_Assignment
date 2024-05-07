import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import EditProfile from "../dialog/EditProfile";

interface UserAccountNavProps {
  username: string;
}

const UserAccountNav = ({ username }: UserAccountNavProps) => {
  const logout = () => {
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="overflow-visible font-semiboldbold text-md hover:cursor-pointer"
      >
        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="icon">
            <Avatar>
              <AvatarFallback>
                {username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
          <p className="font-bold text-sm">{username}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card">
        <EditProfile defaultFullName={username} />

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
