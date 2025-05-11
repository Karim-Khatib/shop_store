import { configureStore, createSlice } from "@reduxjs/toolkit";
import { AuthState, AuthStatusEnum, User } from "./types";

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
export const authStore = configureStore(authSalic);
export const { login } = authSalic.actions;
