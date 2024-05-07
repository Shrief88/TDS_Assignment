import { Router } from "express";

import * as userController from "../controllers/user";
import * as authController from "../controllers/auth";
import * as userValidator from "../validators/user";

const userRouter = Router();

userRouter.get(
  "/",
  authController.protectRoute,
  authController.restrictTo("ADMIN"),
  userController.getUsers,
);

userRouter.get("/me", authController.protectRoute, userController.getUser);

userRouter.put(
  "/fullName",
  authController.protectRoute,
  userValidator.updateFullName,
  userController.updateFullName,
);

export default userRouter;
