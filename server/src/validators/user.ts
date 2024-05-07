import { body } from "express-validator";

export const updateFullName = [
  body("fullName").notEmpty().withMessage("Full name is required"),
];
