import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  TUpdateProfileSchema,
  updateProfileSchema,
} from "@/validation/updateProfile";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxiosToken from "@/hooks/useAxiosToken";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface EditProfileProps {
  defaultFullName: string;
}

const EditProfile = ({ defaultFullName }: EditProfileProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateProfileSchema>({
    resolver: yupResolver(updateProfileSchema),
  });

  const axiosClient = useAxiosToken();

  const onSubmit = async (value: TUpdateProfileSchema) => {
    try {
      toast.loading("Updating profile...", { duration: Infinity });
      await axiosClient.put("user/fullName", value);
      toast.dismiss();
      toast.success("Profile updated successfully");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      toast.dismiss();
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="cursor-pointer flex gap-1 text-sm px-2 py-2">
          <Edit className="mr-2 h-4 w-4" />
          <p>Edit Profile</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-7 items-center">
              <Label htmlFor="fullName" className="text-left">
                Name
              </Label>
              <Input
                id="fullName"
                {...register("fullName")}
                defaultValue={defaultFullName}
                className="col-span-6"
              />
            </div>
            {errors.fullName && (
              <span className="text-sm text-red-500">
                {errors.fullName.message}
              </span>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
