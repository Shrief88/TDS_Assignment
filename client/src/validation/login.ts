import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

export type TLoginSchema = Yup.InferType<typeof loginSchema>;
