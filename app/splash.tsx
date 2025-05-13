import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function SplashScreen() {
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);
  return (
    <View
      style={[
        style.container,
        { flex: 1, justifyContent: "center", alignContent: "center" },
      ]}
    >
      <ActivityIndicator />
    </View>
  );
}
