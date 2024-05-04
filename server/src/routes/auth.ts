import { Router } from "express";

import * as authController from "../controllers/auth";
import * as authValidator from "../validators/auth";

const authRouter = Router();

authRouter.post("/signup", authValidator.signup, authController.signup);

authRouter.post("/login", authValidator.login, authController.login);

authRouter.get("/logout", authController.protectRoute, authController.logout);

authRouter.get(
  "/refresh",
  authController.refreshAccessToken,
);

export default authRouter;
