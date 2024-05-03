import { Router } from "express";

import * as studioController from "../controllers/studio";
import * as authController from "../controllers/auth";
import * as studioValidator from "../validators/studio";
import uploadImage from "../middlewares/uploadImagesMiddleware";
import saveImages from "../middlewares/saveImageMiddleware";

const studioRouter = Router();

studioRouter.get("/", studioController.getStudios);

studioRouter.get("/:id", studioController.getStudio);

studioRouter.post(
  "/",
  authController.protectRoute,
  authController.restrictTo("STUDIO_OWNER"),
  uploadImage("images"),
  studioValidator.createStudio,
  saveImages("studio", "images"),
  studioController.createStudio,
);

studioRouter.delete(
  "/:id",
  authController.protectRoute,
  authController.restrictTo("STUDIO_OWNER"),
  studioValidator.deleteStudio,
  studioController.deleteStudio,
);

export default studioRouter;
