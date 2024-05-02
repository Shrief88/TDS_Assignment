import { Router } from "express";

import * as authController from "../controllers/auth";
import * as authValidator from "../validators/auth";

const authRouter = Router();

authRouter.post("/signup", authValidator.signup, authController.signup);

export default authRouter;
