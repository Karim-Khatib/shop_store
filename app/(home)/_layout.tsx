import LoadingComponent from "@/component/core/loading";
import { useAuth } from "@/hooks/auth_provider";
import { AuthStatusEnum } from "@/hooks/types";
import { Stack, useRouter } from "expo-router";
import React from "react";

export default function HomeLayout() {
  const authProvider = useAuth();
  const router=useRouter();
  if (!authProvider || authProvider?.authState === AuthStatusEnum.INIT) {
    return <LoadingComponent />;
  }
  if(authProvider?.authState === AuthStatusEnum.NOTAUTH){
    router.replace("/(auth)/login");
  }
  return (
    <Stack initialRouteName="home">
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}
