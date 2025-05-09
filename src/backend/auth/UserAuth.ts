"use server";
import { RoutesName } from "@/lib/constant";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";
import { clearSession, getSession, setSession } from "./Session";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../users/UsersRepository";
import CryptoJS from "crypto-js";
import { uploadFileAndGetUrl } from "../supabase/SupabaseStorage";
import { UserInterface } from "../users/UserInterFace";
interface LoginResponse {
  success: boolean;
  message: string;
  email?: string;
  errors?: Record<string, string[]>;
}
const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
const registerFormSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    birthDay: z
      .string()
      .transform((val) => new Date(val))
      .refine((date) => !isNaN(date.getTime()), {
        message: "Invalid date format",
      }),
    fullName: z
      .string()
      .min(3, { message: "Full name must be at least 3 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default async function loginViaEmail(
  prevState: unknown,
  formData: FormData
): Promise<LoginResponse | undefined> {
  const formObject = Object.fromEntries(formData);
  const result = loginFormSchema.safeParse(formObject);

  if (!result.success) {
    return {
      success: false,
      message: "Login failed",
      errors: {
        ...result.error.flatten().fieldErrors,
        _form: ["User not founded"],
      },
    };
  } else {
    try {
      const email = result.data.email;
      const password = result.data.password;

      const user = await getUserByEmail(email);
      
      if(!user){
        throw Error("warning: invalid email or password")
      }
      const currentPass=await decryptPassword(user.password);
   
      if(password!==currentPass){
        throw Error("warning: invalid email or password",{cause:"1995"})
      }

      await setSession({
        userId:user._id.toString(),
      });
    } catch (e) {
      if (e instanceof Error && e.cause==="1995") {
        return {
          success: false,
          message: e.message,
          errors: {
            _form: [e.message],
          },
        };
      }
      return {
        success: false,
        message: "Login failed",
        errors: {
          _form: ["unknown error"],
        },
      };
    }
    redirect(RoutesName.ACTIVE_USERS, RedirectType.push);
  }
}
export async function Logout() {
  // Clear the session cookie
  try {
    await clearSession();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return;
  }
  redirect(RoutesName.LOGIN);
}

async function encryptPassword(data: string): Promise<string> {
  return CryptoJS.AES.encrypt(
    data,
    process.env.PASSWORD_SECRET || "my_secret_key"
  ).toString();
}

 async  function decryptPassword (encryptedData: string, ): Promise<string>  {
  const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.PASSWORD_SECRET || 'my_secret_key');
  return bytes.toString(CryptoJS.enc.Utf8);
};

export async function registerFormAction(
  prevState: unknown,
  formData: FormData,
  isFromAdmin: boolean ,
): Promise<LoginResponse | undefined> {
  const formObject = Object.fromEntries(formData);
  const image = formData.get("image") as File;
  const result = registerFormSchema.safeParse(formObject);

  if (!result.success) {
    return {
      success: false,
      message: "Register failed",
      errors: {
        ...result.error.flatten().fieldErrors,
      },
    };
  }
  let isAllSuccess = false;
  try {
    const email = result.data.email;

    const userExists = await getUserByEmail(email);

    if (userExists) {
      throw Error("there is an account with this email",{cause:"1995"});
    }

    let imageUrl = undefined;
    if (image.size != 0) {
      imageUrl = await uploadFileAndGetUrl(image);
    }
    const encryptionPassword = await encryptPassword(result.data.password);
    const user = await createUser({
      fullName: result.data.fullName,
      email: result.data.email,
      password: encryptionPassword,
      birthDay: result.data.birthDay,
      imageUrl: imageUrl,
      createdAt: new Date(),
    });
   

    if(!isFromAdmin){
      await setSession({
        userId: user._id.toString(),
      });
    }
    isAllSuccess = true;
  } catch (e) {
    if (e instanceof Error && e.cause==="1995") {
      return {
        success: false,
        message: "Register failed",
        errors: {
          _form: [e.message],
        },
      };
    } else {
      return {
        success: false,
        message: "Register failed",
        errors: {
          _form: ["unknown error"],
        },
      };
    }
  }
  if (isAllSuccess && !isFromAdmin) {
    redirect(RoutesName.ACTIVE_USERS);
  }else{
    return {
      success: true,
      message: "Register success",
      
    }
  }
}

export async function getCurrentUser():Promise<UserInterface|null> {
  const session=await getSession();

  if(!session || !session.userId ){
    
    return null;
  }
  const currentUserId=session.userId;
  
  const currentUser=await getUserById(currentUserId);
 
  if(!currentUser){
    return null;
  }
  return {
    birthDay:currentUser.birthDay,
    email:currentUser.email,
    id:currentUser!._id!.toString(),
    fullName:currentUser.fullName,
    imageUrl:currentUser.imageUrl
  }
  
}