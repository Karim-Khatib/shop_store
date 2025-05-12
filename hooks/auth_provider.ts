import { configureStore, createSlice } from "@reduxjs/toolkit";
import { z } from "zod";
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
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "password must to bee 6 character" }),
});
export const registerSchema = z.object({
  fullName: z.string().min(4, "Full Name must to bee more than 4 character"),
  birthDay: z.string().transform((arg, ctx) => {
    const date = parseLocaleString(arg);
    if (!date || date.getFullYear() >= 2015) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Date must be valid and before 2015",
      });
      return z.NEVER;
    }
    return date;
  }),
  imageUrl: z.string().url().optional(),
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "password must to bee 6 character" }),
});
function parseLocaleString(dateStr: string): Date | null {
 
  const [datePart, ] = dateStr.split(", ");

  if (!datePart ) return null;
  const splitNumber = datePart.split("/");
  
  const [month, day, year] = splitNumber.map(Number);


  return new Date(year, month - 1, day);
}
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export const authStore = configureStore(authSalic);
export const { login } = authSalic.actions;
