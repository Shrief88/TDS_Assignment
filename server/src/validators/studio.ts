import { body, param } from "express-validator";

import prisma from "../config/prisma";
import validateMiddleware from "../middlewares/validateMiddleware";

export const getStudio = [
  param("id").custom(async (id) => {
    const studio = await prisma.studio.findUnique({
      where: {
        id,
      },
    });
    if(!studio) throw new Error("Studio not found");
    return true;
  }),
  validateMiddleware,
];

