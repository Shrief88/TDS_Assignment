import { RequestHandler } from "express";
import { CustomRequest } from "./auth";
import prisma from "../config/prisma";
import { sanitizeUser } from "../utils/sanitizeData";
import { User } from "@prisma/client";

// @route GET /api/v1/user
// @access Private [Admin]
export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({
      data: users.map((user) => sanitizeUser(user)),
    });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/v1/user/me
// @access Private
export const getUser: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    return res.status(200).json({
      data: sanitizeUser(user as User),
    });
  } catch (err) {
    next(err);
  }
};

export const updateFullName: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    const { fullName } = req.body;
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        fullName,
      },
    });

    return res.status(200).json({
      data: sanitizeUser(user as User),
    });
  } catch (err) {
    next(err);
  }
};
