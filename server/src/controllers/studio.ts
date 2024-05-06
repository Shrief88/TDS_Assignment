import { type RequestHandler } from "express";
import createHttpError from "http-errors";

import prisma from "../config/prisma";
import { type CustomRequest } from "./auth";

// @route GET /api/v1/studio
// @access Public
export const getStudios: RequestHandler = async (req, res, next) => {
  try {
    const studios = await prisma.studio.findMany({});

    res.status(200).json({ itemsCount: studios.length, data: studios });
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
      include: {
        reservations: true,
      }
    });

    if (!studio) throw createHttpError(404, "Studio not found");

    // Check if the studio is open now
    let isOpen = true;
    const time = new Date();
    const hour = time.getHours();
    const day = time.getDay();
    if (
      hour < studio.startTime ||
      hour > studio.endTime ||
      !studio.availableDays.some((d) => d === day)
    ) {
      isOpen = false;
    }

    res.status(200).json({ data: studio, isOpen });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/v1/studio/me
// @access Private (Studio Owner)
export const getStudiosByOwner: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    const studios = await prisma.studio.findMany({
      where: {
        ownerId: req.user.id,
      },
    });
    res.status(200).json({ data: studios });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/v1/studio
// @access Private (Studio Owner)
export const createStudio: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    const studio = await prisma.studio.create({
      data: {
        name: req.body.name,
        ownerId: req.user.id,
        availableDays: req.body.availableDays
          .split(",")
          .map((day: string) => parseInt(day)),
        startTime: parseInt(req.body.startTime) || req.body.startTime,
        endTime: parseInt(req.body.endTime) || req.body.endTime,
        address: req.body.address,
        images: req.body.images || [],
      },
    });

    res.status(201).json({ data: studio });
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/v1/studio/:id
// @access Private (Studio Owner)
export const deleteStudio: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    await prisma.studio.delete({
      where: {
        id: req.params.id,
      },
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
