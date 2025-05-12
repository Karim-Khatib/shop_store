import { configureStore, createSlice } from "@reduxjs/toolkit";
import { AuthState, AuthStatusEnum, User } from "./types";
import { z } from 'zod';

const initialState: AuthState = {
  authState: AuthStatusEnum.INIT,
  token: null,
  user: null,
};

export const authSalic = createSlice({
  initialState,
  name: "Auth",
  reducers: {
    login: (
      state,
      action: {
        payload: {
          email: string;
          password: string;
        };
      }
    ) => {
      const email = action.payload.email;
      const password = action.payload.password;
      const user: User = {
        email: email,
        id: "1232",
        name: "karim",
        password: password,
      };
      return {
        authState: AuthStatusEnum.AUTH,
        user: user,
        token: "token",
      };
    },
  },
});
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "password must to bee 6 character" }),
});



export type LoginSchemaType = z.infer<typeof loginSchema>;
export const authStore = configureStore(authSalic);
export const { login, } = authSalic.actions;
