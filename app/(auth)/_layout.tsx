import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  // const authProvider = useAuth();
  // const router = useRouter();
  // if (!authProvider || authProvider?.authState === AuthStatusEnum.INIT) {
  //   return <LoadingComponent />;
  // }
  // if (authProvider?.authState === AuthStatusEnum.AUTH) {
  //   router.replace("/(home)/home");
  // }
  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
