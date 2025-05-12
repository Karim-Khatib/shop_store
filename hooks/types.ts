type AuthState= {
  authState: AuthStatusEnum;
  user: User | null;
  token: string | null;
}
interface User{
  id: string;
  name: string;
  email: string;
  password: string;
  
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

export { Theme };
export {AuthState,User,AuthStatusEnum,ThemeType,ThemeState }
