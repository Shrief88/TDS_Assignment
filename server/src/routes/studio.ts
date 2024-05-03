import { Router } from "express";

import * as studioController from "../controllers/studio";
import * as authController from "../controllers/auth";
import * as studioValidator from "../validators/studio";
import authRouter from "./auth";

const studioRouter = Router();

authRouter.get("/studio", studioController.getStudios);

authRouter.get("/studio/:id", studioController.getStudio);


export default studioRouter;