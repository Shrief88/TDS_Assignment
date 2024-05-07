import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  TUpdateStudioSchema,
  updateStudioSchema,
} from "@/validation/updateStudio";
import useAxiosToken from "@/hooks/useAxiosToken";
import { toast } from "sonner";
import IStudio from "@/models/studio";

interface EditStudioProps {
  studio: IStudio;
}

const OPTIONS: Option[] = [
  { label: "Monday", value: "0" },
  { label: "TuesDay", value: "1" },
  { label: "Wendesday", value: "2" },
  { label: "Thursday", value: "3" },
  { label: "Friday", value: "4" },
  { label: "Saturday", value: "5" },
  { label: "Sunday", value: "6" },
];

const EditStudio = ({ studio }: EditStudioProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUpdateStudioSchema>({
    resolver: yupResolver(updateStudioSchema),
  });
  const [multiSelectValue, setMultiSelectValue] = useState<Option[]>([]);
  const axiosClient = useAxiosToken();

  useEffect(() => {
    const options = OPTIONS.filter((option) =>
      studio.availableDays.includes(parseInt(option.value))
    );
    setMultiSelectValue(options);
  }, [studio]);

  const onSubmit = async (value: TUpdateStudioSchema) => {
    console.log(value);
    try {
      toast.loading("Updating profile...", { duration: Infinity });
      await axiosClient.put(`studio/${studio.id}`, value);
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
      <DialogTrigger className="rounded-3xl font-semibold w-28 bg-primary text-primary-foreground hover:bg-primary/90 py-2 text-sm ">
        Edit Studio
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Studio</DialogTitle>
          <DialogDescription>
            Make changes to your studio here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="name" className="text-left">
                Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                defaultValue={studio.name}
                className="col-span-3"
              />
            </div>
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="address" className="text-left">
                Address
              </Label>
              <Input
                id="address"
                {...register("address")}
                defaultValue={studio.address}
                className="col-span-3"
              />
            </div>
            {errors.address && (
              <span className="text-sm text-red-500">
                {errors.address.message}
              </span>
            )}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="startTime" className="text-left">
                Studio end hour
              </Label>
              <Input
                type="number"
                id="startTime"
                {...register("startTime")}
                defaultValue={studio.startTime}
                className="col-span-3"
              />
            </div>
            {errors.startTime && (
              <span className="text-sm text-red-500">
                {errors.startTime.message}
              </span>
            )}
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="endTime" className="text-left">
                Studio end hour
              </Label>
              <Input
                id="endTime"
                type="number"
                {...register("endTime")}
                defaultValue={studio.endTime}
                className="col-span-3"
              />
            </div>
            {errors.endTime && (
              <span className="text-sm text-red-500">
                {errors.endTime.message}
              </span>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-sm">Available Days</Label>
              <div className="col-span-3">
                <MultipleSelector
                  onChange={(value) => {
                    setMultiSelectValue(value);
                    reset({
                      availableDays: value.map(
                        (v) => v.value as unknown as number
                      ),
                    });
                  }}
                  options={OPTIONS}
                  value={multiSelectValue}
                  placeholder="Select available days"
                />
              </div>
              {errors.availableDays && (
                <span className="text-sm text-red-500">
                  {errors.availableDays.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudio;
