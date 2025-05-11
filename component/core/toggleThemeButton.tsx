import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function ToggleThemeButton() {
  const { currentTheme, theme, toggleTheme } = useTheme();
  const style = getStyle(currentTheme);
  return (
    <TouchableOpacity style={style.toggleButton} onPress={toggleTheme}>
      <Text style={style.toggleIcon}>{getIcon(theme)}</Text>
    </TouchableOpacity>
  );
}
const getIcon = (mode: "light" | "dark" | "system") => {
  if (mode === "light") return "🌞";
  if (mode === "dark") return "🌙";
  return "⚙️";
};
