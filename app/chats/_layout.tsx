import ToggleThemeButton from "@/component/core/toggleThemeButton";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import { useRoute } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
export default function ChatLayout() {
  const route = useRoute();
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);
  const { params } = route;
  const title =
    params && "fullName" in params
      ? (params as { fullName: string }).fullName
      : "Chat";

  return (
    <Stack initialRouteName="messages">
      <Stack.Screen
        name="messages"
        options={{
          headerRight: () => (
            <ToggleThemeButton circleSize={30} iconSize={14} />
          ),
          headerStyle: {
            backgroundColor: style.container.backgroundColor,
          },
          headerTitleStyle: style.header2,
          title: title,
          headerTintColor: style.header2.color,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
