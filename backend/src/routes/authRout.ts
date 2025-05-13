import bcrypt from "bcrypt";
import { Router } from "express";
import { console } from "inspector/promises";
import { generateToken, verifyToken } from "../config/jwt.config";
import UserModel, { IUser } from "../model/user";
import { ResponseType, UserType } from "../types/responseType";

const authRouter = Router();
authRouter.use("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      const response: ResponseType = {
        success: false,
        error: {
          errorCode: 400,
          message: "user not found",
        },
      };
      res.json(response);
    }
    const isMatch = await comparePassword(password, user!.password);
    if (!isMatch) {
      const response: ResponseType = {
        success: false,
        error: {
          errorCode: 400,
          message: "invalid password",
        },
      };
      res.json(response);
      return;
    }
    const token = generateToken({
      userId: user!._id,
      email: user!.email,
    });
    res.json({
      success: true,
      result: {
        token,
        user: {
          ...user,
          id: user!._id,
        },
      },
    });
    return;
  } catch (err) {
    console.error(err);
    const response: ResponseType = {
      success: false,
      error: {
        errorCode: 500,
        message: "internal server error",
      },
    };
    res.json(response);
    return;
  }
});
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
      res.json(response);
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
    res.json(response);
    return;
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      error: {
        errorCode: 500,
        message: "internal server error",
      },
    });
    return;
  }
});

authRouter.use("/checkUser", async (req, res) => {
  const { token } = req.body;
  try {
    const plain = verifyToken(token);
    console.log({ plain });
    const data = plain as { email: string; userId: string } | undefined;
    if (!data) {
      const response: ResponseType = {
        success: false,
        error: {
          errorCode: 401,
          message: "Unauthorized",
        },
      };
      res.json(response);
      return;
    }
    const { email, userId } = data;

    const user = await UserModel.findOne({ email, _id: userId });
    if (!user) {
      const response: ResponseType = {
        success: false,
        error: {
          errorCode: 401,
          message: "Unauthorized",
        },
      };
      res.json(response);
      return;
    }
    const userTyped = {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      imageUrl: user.imageUrl,
      birthDay: user.birthDay,
      id: user._id!.toString() ?? "",
    };
    const response: ResponseType = {
      success: true,
      result: {
        user: userTyped,
      },
    };
    res.status(200).json(response);
    return;
  } catch (err) {
    console.error(err);
    const response: ResponseType = {
      success: false,
      error: {
        errorCode: 500,
        message: "Internal Error",
      },
    };
    res.json(response);
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
