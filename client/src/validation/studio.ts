import * as Yup from "yup";

export const studioSchema = Yup.object().shape({
  name: Yup.string().trim().required().min(3).max(25),
  address: Yup.string().required().min(3).max(50),
  startTime: Yup.number().required().min(0).max(24),
  endTime: Yup.number().required().min(0).max(24),
  availableDays: Yup.array()
    .required()
    .min(1)
    .max(7)
    .of(Yup.number().min(0).max(6)),
  images: Yup.mixed(),
});

export type TStudioSchema = Yup.InferType<typeof studioSchema>;
