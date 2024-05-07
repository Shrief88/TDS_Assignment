import * as Yup from "yup";

export const updateProfileSchema = Yup.object().shape({
  fullName: Yup.string().trim().required().min(3).max(50),
});

export type TUpdateProfileSchema = Yup.InferType<typeof updateProfileSchema>;
