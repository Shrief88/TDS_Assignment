import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  fullName: Yup.string().trim().required().min(3).max(50),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
  confirmPassword: Yup.string().required(),
  type: Yup.string().required(),
});

export type TSignUpSchema = Yup.InferType<typeof signUpSchema>;
