import { type Express } from "express";

import authRouter from "./auth";
import studioRouter from "./studio";
import reservationRouter from "./reservation";

const mountRoutes = (app: Express): void => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/studio", studioRouter);
  app.use("/api/v1/reservation", reservationRouter);
};

export default mountRoutes;
