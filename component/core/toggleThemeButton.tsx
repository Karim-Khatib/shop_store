import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function ToggleThemeButton({
  iconSize,
  circleSize,
}: {
  iconSize?: number;
  circleSize?: number;
}) {
  const { currentTheme, theme, toggleTheme } = useTheme();
  const style = getStyle(currentTheme);
  return (
    <TouchableOpacity
      style={[
        style.toggleButton,
        circleSize
          ? {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
            }
          : {},
      ]}
      onPress={toggleTheme}
    >
      <Text
        style={[style.toggleIcon, iconSize ? { fontSize: iconSize } : null]}
      >
        {getIcon(theme)}
      </Text>
    </TouchableOpacity>
  );
}
const getIcon = (mode: "light" | "dark" | "system") => {
  if (mode === "light") return "🌞";
  if (mode === "dark") return "🌙";
  return "⚙️";
};
