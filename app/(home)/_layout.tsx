import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack initialRouteName="home">
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}
