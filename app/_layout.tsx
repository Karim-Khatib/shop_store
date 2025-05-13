import LoadingComponent from "@/component/core/loading";
import { AuthProvider, useAuth } from "@/hooks/auth_provider";
import ThemeProvider from "@/hooks/themeProvider";
import { AuthStatusEnum } from "@/hooks/types";
import { Stack } from "expo-router";
import Toast, { ToastConfig } from "react-native-toast-message";
const toastConfig: ToastConfig = {
  loading: () => <LoadingComponent />,
};
export default function RootLayout() {
  const authProvider = useAuth();
  // if (!authProvider || authProvider?.authState === AuthStatusEnum.INIT) {
  //   return <LoadingComponent />;
  // }
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack initialRouteName="(auth)" screenOptions={{}}>
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="(home)"
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
        </Stack>
      </AuthProvider>
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
