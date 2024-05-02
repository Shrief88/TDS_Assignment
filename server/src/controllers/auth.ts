import { RequestHandler } from "express";
import bcrypt from "bcrypt";

import prisma from "../config/prisma";
import { createAccessToken, createRefreshToken } from "../utils/createToken";

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
      newUser: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        type: newUser.type,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};
