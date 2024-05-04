import { type RequestHandler } from "express";
import createHttpError from "http-errors";

import prisma from "../config/prisma";
import { type CustomRequest } from "./auth";

// @route GET /api/v1/studio
// @access Public
export const getStudios: RequestHandler = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;

    const studios = await prisma.studio.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });

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
    });

    if (!studio) throw createHttpError(404, "Studio not found");

    // Check if the studio is open now
    let isOpen = true;
    const time = new Date();
    const hour = time.getHours();
    const day = time.getDay();
    console.log(day, studio.availableDays);
    if (
      hour < studio.startTime ||
      hour > studio.endTime ||
      !studio.availableDays.some((d) => d === day)
    ) {
      isOpen = false;
    }

    // Check if the studio has no reservations right now
    const reservations = await prisma.reservations.findMany({
      where: {
        studioId: studio.id,
      },
    });

    const hasReservation = reservations.some(
      (reservation) =>
        reservation.startDate.getTime() <= time.getTime() &&
        reservation.endDate.getTime() >= time.getTime(),
    );

    res.status(200).json({ data: studio, isOpen, hasReservation });
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
        availableDays: req.body.availableDays.map((day: string) =>
          parseInt(day),
        ),
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
