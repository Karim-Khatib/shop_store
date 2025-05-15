import { useAuth } from "@/hooks/auth_provider";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import { AuthStatusEnum } from "@/hooks/types";
import React from "react";
import { Text, View } from "react-native";
import CircleAvatar from "../core/circleAvatar";
import ToggleThemeButton from "../core/toggleThemeButton";

export default function HeaderApp() {
  const authProvider = useAuth();
  const { currentTheme } = useTheme();
  if (!authProvider || authProvider?.authState !== AuthStatusEnum.AUTH) {
    return <></>;
  }
  const style = getStyle(currentTheme);
  return (
    <View
      style={[
        style.container,
        {
          elevation:10,
          height: "auto",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          overflow: "hidden",
        },
      ]}
    >
      <CircleAvatar hidButton={true} size={40} />
      <Text style={style.header2}>{authProvider.user?.fullName}</Text>

      <ToggleThemeButton iconSize={16} circleSize={40} />
    </View>
  );
}
