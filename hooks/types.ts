type AuthState= {
  authState: AuthStatusEnum;
  user: UserType | null;
  // token: string | null;
}

enum AuthStatusEnum{
    INIT='INIT',
    AUTH="AUTH",
    NOTAUTH="NOTAUTH"
}

enum ThemeType{
  DARK="dark",
  LIGHT="light"
}
type ThemeState={
  theme: ThemeType|"dark"|"light",
  toggleTheme:()=>void
  currentTheme:Theme

}
interface ColorShades {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  1000?:string;
}

interface ButtonColors {
  0: string;
  100:string,
  500: string;
  600: string;
}

interface Theme {
  neutral: ColorShades;
  primary: ColorShades;
  success: ColorShades;
  danger: ColorShades;
  warning: ColorShades;
  alternative: ColorShades;
  primaryButton: ButtonColors;
}

 type UserType={
  id: string;
  fullName?: string;
  email?: string;
  password?: string;
  imageUrl?: string;
  birthDay?: Date;
};
 type MassageType = {
  id:string,
  text?:string,
  localId:string,
  imageUrl?:string,
  sender:UserType,
  receiver:UserType,
  receivedAt?:Date,
  createdAt?:Date,
  updatedAt?:Date,
 
}
export {AuthState,UserType,AuthStatusEnum,ThemeType,ThemeState,ColorShades,Theme ,MassageType }
