import { RegisterSchemaType } from "@/hooks/auth_provider";
import { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import api from "./client";
import { ResponseType } from "./responseType";

export const loginViaEmail = async (
  email: string,
  password: string
): Promise<ResponseType> => {
  try {
    const response = await api.post<ResponseType, { data: ResponseType }>(
      "/auth/login",
      { email, password }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.code);
    }
    console.log(error);
    const internalError: ResponseType = {
      success: false,
      error: {
        errorCode: 500,
        message: "Internal Error",
      },
    };
    return internalError;
  }
};

export const userRegister = async (
  userData: RegisterSchemaType
): Promise<ResponseType> => {
  try {
    const res = await api.post<
      ResponseType,
      { data: ResponseType },
      RegisterSchemaType
    >("/auth/register", userData);
    return res.data;
  } catch (error) {
    console.error("register Error");
    if (error instanceof AxiosError) {
      console.log({ error });
    }
    // console.error(error);

    const internalError: ResponseType = {
      success: false,
      error: {
        errorCode: 500,
        message: "Internal Error",
      },
    };
    return internalError;
  }
};
export const checkUser = async (): Promise<ResponseType> => {
  const token = await SecureStore.getItemAsync("authToken");

  if (!token) {
    const response: ResponseType = {
      success: false,
      error: {
        errorCode: 401,
        message: "Unauthorized",
      },
    };
    return response;
  }
  try {
    const res = await api.post<
      ResponseType,
      { data: ResponseType },
      { token: string }
    >("/auth/checkUser", { token });

    return res.data;
  } catch (err) {
    console.error(err);
    const response: ResponseType = {
      success: false,
      error: {
        errorCode: 500,
        message: "Internal Error",
      },
    };
    return response;
  }
};
