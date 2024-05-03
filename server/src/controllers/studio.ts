import { type RequestHandler } from "express";

import prisma from "../config/prisma";
import { type CustomRequest } from "./auth";
import createHttpError from "http-errors";

// @route GET /api/v1/studio
// @access Public
export const getStudios: RequestHandler = async (req, res, next) => {
  try {
    const studios = await prisma.studio.findMany();
    res.status(200).json({ data: studios });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/v1/studio/:id
// @access Public
export const getStudio: RequestHandler = async (req, res, next) => {
  try {
    const studio = await prisma.studio.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: studio });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/v1/studio
// @access Private (Studio Owner)
// export const createStudio: RequestHandler = async (
//   req: CustomRequest,
//   res,
//   next,
// ) => {
//   try {
//     const studio = await prisma.studio.create({
//       data: {
//         name: req.body.name,
//         ownerId: req.user.id,
//         availableDays: req.body.availableDays,
//         startTime: req.body.startTime,
//         endTime: req.body.endTime,
//         address: req.body.address,
//       },
//     });
//     res.status(201).json({ data: studio });
//   } catch (err) {
//     next(err);
//   }
// };

