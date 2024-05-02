import { body } from "express-validator";

import validateMiddleware from "../middlewares/validateMiddleware";
import prisma from "../config/prisma";

export const signup = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isString()
    .withMessage("Full name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Full name must be at most 32 characters long"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { email: value } });
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Too short password"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("confirmPassword is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("type")
    .notEmpty()
    .withMessage("type is required")
    .custom((value) => {
      if (!["ADMIN", "STUDIO_OWNER", "CUSTOMER"].includes(value)) {
        throw new Error("Invalid type");
      }
      return true;
    }),
  validateMiddleware,
];

export const login = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("password is required"),
  validateMiddleware,
];
