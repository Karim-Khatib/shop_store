import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
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
