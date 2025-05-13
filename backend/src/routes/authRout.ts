import bcrypt from "bcrypt";
import { Router } from "express";
import { generateToken } from "../config/jwt.config";
import UserModel, { IUser } from "../model/user";
import { ResponseType } from "../types/responseType";

const authRouter = Router();

authRouter.use("/register", async (req, res) => {
  const user: IUser = req.body;
  try {
    const existsUser = await UserModel.findOne({ email: user.email });
    if (existsUser) {
      const response: ResponseType = {
        success: false,
        error: {
          errorCode: 400,
          message: "user already exists",
        },
      };
      res.status(300).json(response);
    }
    const hashedPassword: string = await hashPassword(user.password);
    const newUser = await UserModel.create({
      ...user,
      password: hashedPassword,
    });
    const token = generateToken({
      userId: newUser._id,
      email: newUser.email,
    });
    const response: ResponseType = {
      success: true,
      result: {
        token,
        user: {
          ...newUser,
          id: newUser._id,
        },
      },
    };
    res.status(201).json(response);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: {
        errorCode: 500,
        message: "internal server error",
      },
    });
    return;
  }
});

const hashPassword = async (plain: string) => {
  return await bcrypt.hash(plain, 10);
};

const comparePassword = async (plain: string, hashed: string) => {
  return await bcrypt.compare(plain, hashed);
};
export { authRouter, comparePassword, hashPassword };
