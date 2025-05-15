import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { IMessage, Message } from "../model/message";
import UserModel from "../model/user";
import { MassageType, ResponseType } from "../types/types";
import mongoose from "mongoose";

const messageRouter = Router();

messageRouter.post("/create", authMiddleware, async (req, res) => {
  try {
    const { currentUserId, text, localId, receiverId } = req.body;

    const sender = await UserModel.findById(currentUserId);
    const receiverObject = await UserModel.findById(receiverId);
    if (!sender || !receiverObject) {
      const errorResponse: ResponseType = {
        success: false,

        error: {
          errorCode: 400,
          message: "Invalid request",
        },
      };
      res.json(errorResponse);
    }
    const messageDoc = {
      sender: new mongoose.Types.ObjectId(currentUserId),
      receiver: new mongoose.Types.ObjectId(receiverId),
      localId: localId,
      text: text,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const message = new Message(messageDoc);
    await message.save();
    const newMessage: MassageType = {
      id: message.id,
      text: message.text,
      localId: message.localId,
      imageUrl: message.imageUrl,
      sender: {
        id: sender!._id!.toString(),
        fullName: sender!.fullName,
        email: sender!.email,
        imageUrl: sender!.imageUrl,
        birthDay: sender!.birthDay,
      },
      receiver: {
        id: receiverObject!._id!.toString(),
        fullName: receiverObject!.fullName,
        email: receiverObject!.email,
        imageUrl: receiverObject!.imageUrl,
        birthDay: receiverObject!.birthDay,
      },
    };
    const successResponse: ResponseType = {
      success: true,
      result: newMessage,
    };
    res.json(successResponse);
  } catch (e) {
    const errorResponse: ResponseType = {
      success: false,

      error: {
        errorCode: 500,
        message: "Internal Server Error",
      },
    };
    res.json(errorResponse);
  }
});

messageRouter.use("/getAllMassages", authMiddleware, async (req, res) => {
  try {
    const { currentUserId, secondId } = req.body;
    const currentUser = await UserModel.findById(currentUserId);
    const secondUser = await UserModel.findById(secondId);
    if (!currentUser || !secondUser) {
      const errorResponse: ResponseType = {
        success: false,

        error: {
          errorCode: 400,
          message: "Invalid request",
        },
      };
      res.json(errorResponse);
    }
    const messages = await Message.find({
      $or: [
        { sender:new mongoose.Types.ObjectId( currentUserId), receiver:new mongoose.Types.ObjectId(secondId )},
        { sender:new mongoose.Types.ObjectId(secondId), receiver:new mongoose.Types.ObjectId(currentUserId )},
      ],
      // sort: { createdAt: -1 },
    });
    const currentMessage: MassageType[] = messages.map((message) => {
      const currentSender =
        message.sender!.toString() === currentUser!._id.toString();
      const sender = currentSender ? currentUser : secondUser;
      const receiver = currentSender ? secondUser : currentUser;
      return {
        id: message.id,
        text: message.text,
        localId: message.localId,
        imageUrl: message.imageUrl,
        sender: {
          id: sender!._id.toString(),
          fullName: sender!.fullName,
          email: sender!.email,
          imageUrl: sender!.imageUrl,
          birthDay: sender!.birthDay,
        },
        receiver: {
          id: receiver!._id.toString(),
          fullName: receiver!.fullName,
          email: receiver!.email,
          imageUrl: receiver!.imageUrl,
          birthDay: receiver!.birthDay,
        },
      };
    });
    const successResponse: ResponseType = {
      success: true,

      results: currentMessage,
    };
    res.json(successResponse);
  } catch (e) {
    const errorResponse: ResponseType = {
      success: false,

      error: {
        errorCode: 500,
        message: "Internal Server Error",
      },
    };
    res.json(errorResponse);
  }
});
export default messageRouter;
