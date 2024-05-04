import { Router } from "express";

import * as reservationController from "../controllers/reservation";
import * as authController from "../controllers/auth";
import * as reservationValidator from "../validators/reservation";

const reservationRouter = Router();

reservationRouter.get(
  "/",
  authController.protectRoute,
  authController.restrictTo("ADMIN"),
  reservationController.getReservations,
);

reservationRouter.get(
  "/me",
  authController.protectRoute,
  authController.restrictTo("CUSTOMER", "STUDIO_OWNER"),
  reservationController.getReservationsByUser,
);

reservationRouter.get(
  "/studio/:id",
  authController.protectRoute,
  authController.restrictTo("ADMIN", "STUDIO_OWNER"),
  reservationValidator.getReservationsByStudio,
  reservationController.getReservationsByStudio,
);

reservationRouter.post(
  "/",
  authController.protectRoute,
  authController.restrictTo("CUSTOMER"),
  reservationValidator.createReservation,
  reservationController.createReservation,
);

reservationRouter.delete(
  "/:id",
  authController.protectRoute,
  authController.restrictTo("CUSTOMER"),
  reservationValidator.deleteReservation,
  reservationController.deleteReservation,
);

export default reservationRouter;
