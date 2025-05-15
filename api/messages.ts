import { MassageType } from "@/hooks/types";
import uuid from "react-native-uuid";
import api from "./client";
import { ResponseType } from "./responseType";
type ResponseMessageType = {
  result?: MassageType;
  results?: MassageType[];
};
export const getAllMessages = async (
  secondId: string
): Promise<ResponseType & ResponseMessageType> => {
  try {
    const res = await api.post<ResponseType, { data: ResponseType }>(
      "/messages/getAllMassages",
      { secondId: secondId }
    );
    return res.data as ResponseType & ResponseMessageType;
  } catch (error) {
    console.log(error);
    const errorResponse: ResponseType = {
      success: false,
      error: {
        errorCode: 500,
        message: "server connection error",
      },
    };
    return errorResponse;
  }
};
export const saveMessage = async (text: string, receiverId: string) => {
  try {
    const uniqueId = uuid.v4();

    const res = await api.post<ResponseType, { data: ResponseType }>(
      "/messages/create",
      { text, receiverId, localId: uniqueId }
    );
    return;
  } catch (e) {
    console.log({ e });
  }
};
