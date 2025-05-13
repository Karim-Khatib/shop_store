/* eslint-disable @typescript-eslint/no-unused-vars */
import { uploadFile } from "@/api/clodeStorge";
import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { checkUser, loginViaEmail, userRegister } from "@/api/user";
import { showError } from "@/component/core/toast";
import { useRouter } from "expo-router";
import { z } from "zod";
import { AuthState, AuthStatusEnum, UserType } from "./types";
import { useLoading } from "./loadingProvider";

const initialState: AuthState = {
  authState: AuthStatusEnum.INIT,
  // token: null,
  user: null,
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterSchemaType) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {showLoading,hideLoading}=useLoading();
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>(initialState);
  useEffect(() => {
    checkUser().then((response) => {
      if (response.success) {
        const { user }: { user: UserType } = response.result;
        setAuthState({
          authState: AuthStatusEnum.AUTH,
          user,
        });
      } else {
        setAuthState({
          authState: AuthStatusEnum.NOTAUTH,
          user: null,
        });
      }
    });
  }, []);
  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        console.log({ responseLogin: email });
        showLoading();
        const response = await loginViaEmail( email, password );
        console.log({ responseLogin: response });
        if (response.success) {
          const { token, user }: { token: string; user: UserType } =
            response.result;
          await SecureStore.setItemAsync("authToken", token);
          setAuthState({
            authState: AuthStatusEnum.AUTH,
            user,
          });
          router.replace("/(home)/home");
        } else {
          showError(response.error?.message??"Email or Password is incorrect")
          setAuthState({
            authState: AuthStatusEnum.NOTAUTH,
            user: null,
          })
        }
      } catch (error) {
        console.log(error);
        setAuthState({
          authState: AuthStatusEnum.NOTAUTH,
          user: null,
        });
        showError("Cant Connect to the Server");
      }
      hideLoading();
    },
    []
  );

  const register = useCallback(
    async (data: RegisterSchemaType): Promise<void> => {
      try {
        let imageUrl: string | undefined = undefined;
        if (data.imageUrl) {
          const response = await uploadFile({
            uri: data.imageUrl,
            type: "image",
            fileName: data.fullName,
          });
          if (!response.success) return;
          imageUrl = response.result;
        }
        const response = await userRegister({
          ...data,
          imageUrl,
        });
        if (response.success) {
          const { token, user }: { token: string; user: UserType } =
            response.result;
          console.log({ response: response });
          await SecureStore.setItemAsync("authToken", token);
          setAuthState({
            authState: AuthStatusEnum.AUTH,
            user,
          });
          router.replace("/(home)/home");
        } else {
          setAuthState({
            authState: AuthStatusEnum.NOTAUTH,
            user: null,
          });
          if (response.message) {
            showError(response.message);
          }
        }
      } catch (error) {
        console.log(error);
        setAuthState({
          authState: AuthStatusEnum.NOTAUTH,
          user: null,
        });
      }
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    await SecureStore.deleteItemAsync("authToken");
    setAuthState({
      authState: AuthStatusEnum.NOTAUTH,
      user: null,
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      ...authState,
      login,
      register,
      logout,
    }),
    [authState, login, register, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "password must to bee 6 character" }),
});
const registerSchema = z.object({
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
  const [datePart] = dateStr.split(", ");

  if (!datePart) return null;
  const splitNumber = datePart.split("/");

  const [month, day, year] = splitNumber.map(Number);

  return new Date(year, month - 1, day);
}
type RegisterSchemaType = z.infer<typeof registerSchema>;
type LoginSchemaType = z.infer<typeof loginSchema>;

export {
  AuthProvider,
  loginSchema,
  LoginSchemaType,
  registerSchema,
  RegisterSchemaType,
  useAuth,
};
