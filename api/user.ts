import { RegisterSchemaType } from "@/hooks/auth_provider";
import { AxiosError } from "axios";
import api from "./client";
import { ResponseType } from "./responseType";

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
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
      console.log({error});
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
