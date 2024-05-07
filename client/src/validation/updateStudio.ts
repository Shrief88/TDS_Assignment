import * as Yup from "yup";

export const updateStudioSchema = Yup.object().shape({
  name: Yup.string().trim().min(3).max(25),
  address: Yup.string().min(3).max(50),
  startTime: Yup.number().min(0).max(24),
  endTime: Yup.number().min(0).max(24),
  availableDays: Yup.array()
    .min(1)
    .max(7)
    .of(Yup.number().min(0).max(6)),
});

export type TUpdateStudioSchema = Yup.InferType<typeof updateStudioSchema>;
