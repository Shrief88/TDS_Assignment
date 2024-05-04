import { type RequestHandler } from "express";

import prisma from "../config/prisma";
import { type CustomRequest } from "./auth";
import createHttpError from "http-errors";

// @route GET /api/v1/reservation
// @access Private (Admin)
export const getReservations: RequestHandler = async (req, res, next) => {
  try {
    const reservations = await prisma.reservations.findMany();
    res
      .status(200)
      .json({ itemsCount: reservations.length, data: reservations });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/v1/reservation/me
// @access Private (Customer or Studio Owner)
export const getReservationsByUser: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    if (req.user.type === "CUSTOMER") {
      const reservations = await prisma.reservations.findMany({
        where: {
          customerId: req.user.id,
        },
      });
      res
        .status(200)
        .json({ itemsCount: reservations.length, data: reservations });
    } else if (req.user.type === "STUDIO_OWNER") {
      const studios = await prisma.studio.findMany({
        where: {
          ownerId: req.user.id,
        },
      });

      const reservations = await prisma.reservations.findMany({
        where: {
          studioId: {
            in: studios.map((studio) => studio.id),
          },
        },
      });

      res
        .status(200)
        .json({ itemsCount: reservations.length, data: reservations });
    }
  } catch (err) {
    next(err);
  }
};

// @route GET /api/v1/reservation/studio/:id
// @access Private (Studio Owner)
export const getReservationsByStudio: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const reservations = await prisma.reservations.findMany({
      where: {
        studioId: req.params.id,
      },
    });
    res
      .status(200)
      .json({ itemsCount: reservations.length, data: reservations });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/v1/reservation
// @access Private (Customer)
export const createReservation: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    const studio = await prisma.studio.findUnique({
      where: {
        id: req.body.studioId,
      },
      include: {
        reservations: true,
      },
    });

    // check if there is already a reservation
    let flag = false;
    studio?.reservations.map((reservation) => {
      if (
        (req.body.startDate >= reservation.startDate.getTime() &&
          req.body.startDate <= reservation.endDate.getTime()) ||
        (req.body.endDate >= reservation.startDate.getTime() &&
          req.body.endDate <= reservation.endDate.getTime()) ||
        (req.body.startDate <= reservation.startDate.getTime() &&
          req.body.endDate >= reservation.endDate.getTime())
      ) {
        flag = true;
      }
    });

    if (flag) throw createHttpError(409, "Reservation already exists");

    const reservation = await prisma.reservations.create({
      data: {
        customerId: req.user.id,
        studioId: req.body.studioId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
    });
    res.status(201).json({ data: reservation });
  } catch (err) {
    next(err);
  }
};

// @route DeLETE /api/v1/reservation/:id
// @access Private (Customer)
export const deleteReservation: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    const reservation = await prisma.reservations.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!reservation) throw createHttpError(404, "Reservation not found");
    if (reservation.customerId !== req.user.id)
      throw createHttpError(403, "Forbidden");

    const currentTime = new Date();
    const differenceInMs =
      currentTime.getTime() - reservation.createdAt.getTime();
    const differenceInMinutes = differenceInMs / (1000 * 60);

    if (differenceInMinutes > 15)
      throw createHttpError(403, "Reservation is older than 15 minutes");

    await prisma.reservations.delete({
      where: {
        id: reservation.id,
      },
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
