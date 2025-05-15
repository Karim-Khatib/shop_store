import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/jwt.config";
import { ResponseType } from "../types/types";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const responseError: ResponseType = {
    success: false,
    error: {
      message: "Un authorization",
      errorCode: 401,
    },
  };
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.json(responseError);
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const plain = verifyToken(token);
    const data = plain as { email: string; userId: string } | undefined;
    if (!data) {
      res.json(responseError);
      return;
    }
    if (!req.body) {
      req.body = {}; 
    }
    req.body.currentEmail = data.email;
    req.body.currentUserId = data.userId;
    next();
  } catch (error) {
    res.json(responseError);
    return;
  }
};
