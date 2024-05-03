import { type Express } from "express";

import authRouter from "./auth";
import studioRouter from "./studio";

const mountRoutes = (app: Express): void => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/studio", studioRouter);
};

export default mountRoutes;
