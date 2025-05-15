import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import UserModel from "../model/user";
import { Message } from "../model/message";
import { MassageType } from "../types/types";
export const registerSocketHandlers = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
  const socketIO = new Server(server, { cors: { origin: "*" } });
  socketIO.on("connection", (socket) => {
    console.log("New client connected", socket.id);
    socket.emit("debugConnection","hello From Server");
    socket.on("join", (firstUser: string, secondUser: string) => {
        console.log("join room ","room123")
        console.log("join room ",secondUser + firstUser)

      socket.join(secondUser + firstUser);
  
    });
    socket.on(
      "sendMessage",
      async ({
        senderId,
        receiverId,
        text,
        localId,
      }: {
        senderId: string;
        receiverId: string;
        text: string;
        localId: string;
      }) => {
        console.log(senderId, receiverId, text, localId);
        const messageDoc = {
          sender: new mongoose.Types.ObjectId(senderId),
          receiver: new mongoose.Types.ObjectId(receiverId),
          localId: localId,
          text: text,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const message = new Message(messageDoc);
        const sender = await UserModel.findById(senderId);
        const receiverObject = await UserModel.findById(receiverId);
       await message.save().then((message) => {
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
          socket.emit("receiveMessage", newMessage);
          socket.to(receiverId+senderId ).emit("receiveMessage", newMessage);
        });
      }
    );
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      
    });
    
  });
};
