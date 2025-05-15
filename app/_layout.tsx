import LoadingComponent from "@/component/core/loading";
import { AuthProvider } from "@/hooks/auth_provider";
import LoadingProvider from "@/hooks/loadingProvider";
import TanstackQueryProvider from "@/hooks/tanstackQueryProvider";
import ThemeProvider from "@/hooks/themeProvider";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast, { ToastConfig } from "react-native-toast-message";
const toastConfig: ToastConfig = {
  loading: () => <LoadingComponent />,
};
export default function RootLayout() {
  // const authProvider = useAuth();
  // if (!authProvider || authProvider?.authState === AuthStatusEnum.INIT) {
  //   return <LoadingComponent />;
  // }
  return (
    <TanstackQueryProvider>
      <ThemeProvider>
        <LoadingProvider>
          <AuthProvider>
            <SafeAreaProvider>
              <SafeAreaView style={{flex:1,}}>
                <Stack
                  initialRouteName={
                    // authProvider?.authState === AuthStatusEnum.AUTH
                    //   ? "(home)"
                    //   :
                    "splash"
                  }
                  screenOptions={{}}
                >
                  <Stack.Screen
                    name="(auth)"
                    options={{
                      headerShown: false,
                    }}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="chats"
                    options={{
                      headerShown: false,
                    }}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="splash"
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
              </SafeAreaView>
            </SafeAreaProvider>
          </AuthProvider>
        </LoadingProvider>
        <Toast config={toastConfig} />
      </ThemeProvider>
    </TanstackQueryProvider>
  );
}
