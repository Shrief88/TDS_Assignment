import { RequestHandler, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

import env from "../config/validateEnv";
import prisma from "../config/prisma";
import { User } from "@prisma/client";
import { createAccessToken, createRefreshToken } from "../utils/createToken";
import { sanitizeUser } from "../utils/sanitizeData";

export interface CustomRequest extends Request {
  user: User;
}

interface jwtObject {
  user_id: string;
  iat: number;
  exp: number;
}

// @route POST /api/v1/auth/signup
// @access Public
export const signup: RequestHandler = async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await prisma.user.create({
      data: {
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashPassword,
        type: req.body.type,
      },
    });

    const accessToken = createAccessToken({
      user_id: newUser.id,
    });
    const refreshToken = createRefreshToken({
      user_id: newUser.id,
    });

    await prisma.user.update({
      where: {
        id: newUser.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    res.status(201).json({
      newUser: sanitizeUser(newUser),
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/v1/auth/login
// @access Public
export const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (
      !user ||
      !(await bcrypt.compare(req.body.password as string, user.password))
    ) {
      throw createHttpError(404, "Invalid credantials");
    }

    const accessToken = createAccessToken({ user_id: user.id });
    const refreshToken = createRefreshToken({ user_id: user.id });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    res.status(200).json({
      user: sanitizeUser(user),
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/v1/auth/logout
// @access Private
export const logout: RequestHandler = async (req: CustomRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) throw createHttpError(404, "User not found");

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: null,
      },
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/v1/auth/refresh
// @access Public
export const refreshAccessToken: RequestHandler = async (req, res, next) => {
  try {
    let token = "";
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
        const user = await prisma.user.findUnique({
          where: {
            id: (decoded as jwtObject).user_id,
          },
        });
        if (!user) throw createHttpError(404, "user not found");
        if (token !== user.refreshToken) {
          throw createHttpError(403, "Invalid refresh token");
        }
        const accessToken = createAccessToken({ user_id: user.id });
        res.status(200).json({
          accessToken,
          user: sanitizeUser(user),
        });
      } else {
        throw createHttpError(401, "Unauthorized");
      }
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(createHttpError(403, "token expired"));
    }
    next(err);
  }
};

// @desc Middleware function to protect routes.
export const protectRoute: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    let token = "";
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        const user = await prisma.user.findUnique({
          where: {
            id: (decoded as jwtObject).user_id,
          },
        });
        if (!user) throw createHttpError(401, "this user no longer exists");
        if (!user.refreshToken) throw createHttpError(401, "Unauthorized");
        req.user = user;
      }
      next();
    }
    if (!token) {
      throw createHttpError(401, "Unauthorized, please login");
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(createHttpError(403, "token expired"));
    }
    next(err);
  }
};

// @desc Creates a middleware function that checks if the user is allowed to access the route based on their type.
export const restrictTo = (...types: string[]): RequestHandler => {
  return async (req: CustomRequest, res, next) => {
    try {
      if (!types.includes(req.user.type as unknown as string)) {
        throw createHttpError(403, "Forbidden");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
