import { type Express } from "express";

import authRouter from "./auth";

const mountRoutes = (app: Express): void => {
  app.use("/api/v1/auth", authRouter);
}

export default mountRoutes;