import React from "react";
import { Button } from "../ui/button";
import useAxiosToken from "@/hooks/useAxiosToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface DeleteStudioProps {
  id: string;
}

export const DeleteStudio = ({ id }: DeleteStudioProps) => {
  const axiosClient = useAxiosToken();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      toast.loading("Deleting Studio...", { duration: Infinity });
      await axiosClient.delete(`studio/${id}`);
      toast.dismiss();
      navigate("/");
      toast.success("Studio deleted successfully");
    } catch (err) {
      toast.dismiss();
      if (err instanceof AxiosError) {
        if (err.response?.status === 403) {
          toast.error("You are not authorized to delete this studio");
        } else if (err.response?.status === 401) {
          toast.error("Please login to delete this studio");
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };

  return (
    <Button
      className="rounded-3xl font-semibold w-28 text-primary border-2 border-primary"
      variant={"outline"}
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
};
