import { body, param } from "express-validator";

import prisma from "../config/prisma";
import validateMiddleware from "../middlewares/validateMiddleware";

export const getStudio = [
  param("id").isUUID().withMessage("Invalid studio ID"),
  validateMiddleware,
];

export const createStudio = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isLength({ max: 25 })
    .withMessage("Name must be at most 25 characters long")
    .custom(async (name, { req }) => {
      const studio = await prisma.studio.findUnique({ where: { name } });
      if (studio) throw new Error("Studio already exists");
      return true;
    }),
  body("availableDays")
    .notEmpty()
    .withMessage("Available days are required")
    .custom((value) => {
      const days = value.split(",");
      if (
        !days.every((day: string) => parseInt(day) >= 0 && parseInt(day) <= 6)
      ) {
        throw new Error("day should be between 0 and 6");
      }
      return true;
    }),
  body("startTime")
    .notEmpty()
    .withMessage("Start time is required")
    .isNumeric()
    .withMessage("Start time must be a number")
    .custom((value) => {
      value = parseInt(value);
      if (value < 0 || value > 24) {
        throw new Error("Start time must be between 0 and 24");
      }
      return true;
    }),
  body("endTime")
    .notEmpty()
    .withMessage("End time is required")
    .isNumeric()
    .withMessage("End time must be a number")
    .custom((value, { req }) => {
      value = parseInt(value);
      if (value < 0 || value > 24) {
        throw new Error("End time must be between 0 and 24");
      }
      if (value <= req.body.startTime) {
        throw new Error("End time must be after start time");
      }
      return true;
    }),
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Name must be at most 50 characters long"),
  validateMiddleware,
];

export const updateStudio = [
  param("id")
    .isUUID()
    .withMessage("Invalid studio ID")
    .custom(async (id, { req }) => {
      const studio = await prisma.studio.findUnique({ where: { id } });
      if (!studio) throw new Error("Studio not found");
      if (studio.ownerId !== req.user.id) throw new Error("Forbidden");
      return true;
    }),
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isLength({ max: 25 })
    .withMessage("Name must be at most 25 characters long")
    .custom(async (name, { req }) => {
      // skip validation if the name is not changed
      const studio = await prisma.studio.findUnique({
        where: { id: req.params?.id },
      });
      if (studio?.name === name) return true;

      const existStudio = await prisma.studio.findUnique({ where: { name } });
      if (existStudio) throw new Error("Studio already exists");
      return true;
    }),
  body("availableDays")
    .optional()
    .custom((value) => {
      if (!value.every((day: number) => day >= 0 && day <= 6)) {
        throw new Error("day should be between 0 and 6");
      }
      return true;
    }),
  body("startTime")
    .optional()
    .isNumeric()
    .withMessage("Start time must be a number")
    .custom((value) => {
      if (value < 0 || value > 24) {
        throw new Error("Start time must be between 0 and 24");
      }
      return true;
    }),
  body("endTime")
    .optional()
    .isNumeric()
    .withMessage("End time must be a number")
    .custom((value, { req }) => {
      if (value < 0 || value > 24) {
        throw new Error("End time must be between 0 and 24");
      }
      if (value <= req.body.startTime) {
        throw new Error("End time must be after start time");
      }
      return true;
    }),
  body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Name must be at most 50 characters long"),
  validateMiddleware,
];

export const deleteStudio = [
  param("id")
    .isUUID()
    .withMessage("Invalid studio ID")
    .custom(async (id, { req }) => {
      const studio = await prisma.studio.findUnique({
        where: {
          id,
        },
      });
      if (!studio) throw new Error("Studio not found");
      if (studio.ownerId !== req.user.id) throw new Error("Forbidden");

      return true;
    }),
  validateMiddleware,
];
