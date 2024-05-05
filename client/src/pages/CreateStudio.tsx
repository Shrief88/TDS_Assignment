import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

import { TStudioSchema, studioSchema } from "@/validation/studio";
import useAxiosToken from "@/hooks/useAxiosToken";

const OPTIONS: Option[] = [
  { label: "Monday", value: "0" },
  { label: "TuesDay", value: "1" },
  { label: "Wendesday", value: "2" },
  { label: "Thursday", value: "3" },
  { label: "Friday", value: "4" },
  { label: "Saturday", value: "5" },
  { label: "Sunday", value: "6" },
];

const CreateStudio = () => {
  const axiosClient = useAxiosToken();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TStudioSchema>({
    resolver: yupResolver(studioSchema),
  });

  const onSubmit = async (data: TStudioSchema) => {
    try {
      const formData = new FormData();
      if (data.images.length === 0) {
        toast.error("Please add at least one image");
        return;
      }

      for (const image of data.images) {
        formData.append("images", image);
      }

      console.log(formData.getAll("images"));

      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("startTime", data.startTime.toString());
      formData.append("endTime", data.endTime.toString());
      formData.append("availableDays", data.availableDays.toString());

      toast.loading("Creating Studio...", { duration: Infinity });

      const newStudio = await axiosClient.post("studio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.dismiss();
      navigate(`/studio/${newStudio.data.data.id}`);
      toast.success("Studio created successfully");
    } catch (err) {
      toast.dismiss();
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
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
    <div className="h-screen w-full flex flex-col items-center">
      <Navbar />
      <div className="bg-muted flex-1 w-full px-7 lg:px-44 py-8">
        <p className="text-lg font-semibold font-Inter">Add New Studio</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-9 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4 xl:gap-x-20">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-sm">
                  Studio Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g Studio 1"
                  {...register("name")}
                  className="bg-muted rounded-3xl"
                />
                {errors.name && (
                  <span className="text-sm text-red-500 ">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm">Available Days</Label>
                <MultipleSelector
                  onChange={(value) =>
                    reset({
                      availableDays: value.map(
                        (v) => v.value as unknown as number
                      ),
                    })
                  }
                  className="rounded-3xl"
                  defaultOptions={OPTIONS}
                  placeholder="Select available days"
                />
                {errors.availableDays && (
                  <span className="text-sm text-red-500 ">
                    {errors.availableDays.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4 xl:gap-x-20">
              <div className="flex flex-col gap-2">
                <Label htmlFor="startTime" className="text-sm">
                  Studio start hour
                </Label>
                <Input
                  id="startTime"
                  placeholder="e.g 8"
                  {...register("startTime")}
                  type="number"
                  className="bg-muted rounded-3xl"
                />
                {errors.startTime && (
                  <span className="text-sm text-red-500 ">
                    {errors.startTime.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="endTime" className="text-sm">
                  Studio Address
                </Label>
                <Input
                  id="endTime"
                  placeholder="e.g 20"
                  {...register("endTime")}
                  type="number"
                  className="bg-muted rounded-3xl"
                />
                {errors.endTime && (
                  <span className="text-sm text-red-500">
                    {errors.endTime.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="address" className="text-sm">
                Studio Address
              </Label>
              <Input
                id="address"
                placeholder="e.g Cairo"
                {...register("address")}
                className="bg-muted rounded-3xl"
              />
              {errors.address && (
                <span className="text-sm text-red-500 ">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-fit">
            <Input
              {...register("images")}
              className="bg-muted"
              id="picture"
              type="file"
              multiple
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudio;
