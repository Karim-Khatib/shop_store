import { authStore } from "@/hooks/auth_provider";
import ThemeProvider from "@/hooks/themeProvider";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Provider store={authStore}>
        <Stack initialRouteName="(auth)" screenOptions={{}}>
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}
