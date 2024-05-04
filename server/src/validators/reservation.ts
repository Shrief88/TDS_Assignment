import { body, param } from "express-validator";

import prisma from "../config/prisma";
import validateMiddleware from "../middlewares/validateMiddleware";

export const createReservation = [
  body("studioId")
    .notEmpty()
    .withMessage("Studio ID is required")
    .isUUID()
    .withMessage("Invalid studio ID")
    .custom(async (id, { req }) => {
      const studio = await prisma.studio.findUnique({ where: { id } });
      if (!studio) throw new Error("Studio not found");
      return true;
    }),
  body("startDate")
    .notEmpty()
    .withMessage("Start time is required")
    .isDate()
    .withMessage("Start time must be a date"),
  body("endDate")
    .notEmpty()
    .withMessage("End time is required")
    .isDate()
    .withMessage("End time must be a date")
    .custom((value: Date, { req }) => {
      if (value.getTime() < req.body.startTime.getTime()) {
        throw new Error("End time must be after start time");
      }
    }),
  validateMiddleware,
];

export const getReservationsByStudio = [
  param("id")
    .isUUID()
    .withMessage("Invalid studio ID")
    .custom(async (id, { req }) => {
      const studio = await prisma.studio.findUnique({ where: { id } });
      if (!studio) throw new Error("Studio not found");
      if (studio.ownerId !== req.user.id && req.user.type !== "ADMIN")
        throw new Error("Forbidden");

      return true;
    }),
  validateMiddleware,
];

export const deleteReservation = [
  param("id").isUUID().withMessage("Invalid reservation ID"),
  validateMiddleware,
];
