import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import UserModel, { IUser } from "../model/user";
import { ResponseType, UserType } from "../types/types";

const userRoutes = Router();
userRoutes.get("/users", authMiddleware, async (req, res) => {
  const { currentEmail, currentUserId } = req.body;
  const responseError: ResponseType = {
    success: false,
    error: {
      message: "Un authorization",
      errorCode: 401,
    },
  };
  if (!currentEmail || !currentUserId) {
    res.json(responseError);
  }
  try {
    let users = await UserModel.find<IUser>({
      email: { $ne: currentEmail },
      _id: { $ne: currentUserId },
    });

    const usersTyped = users.map((user) => ({
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      imageUrl: user.imageUrl,
      birthDay: user.birthDay,
      id: user._id.toString(),
    }));
    const responseSuccess: ResponseType = {
      success: true,
      results: usersTyped as UserType[],
    };
    res.json(responseSuccess);
  } catch (error) {
    const errorResponse: ResponseType = {
      success: false,
      error: {
        message: "Internal server error",
        errorCode: 500,
      },
    };
    res.json(errorResponse);
  }
});
export { userRoutes };
