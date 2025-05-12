import DynamicInput from "@/component/core/dynamicInput";
import ToggleThemeButton from "@/component/core/toggleThemeButton";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Login() {
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);
  return (
    <View
      style={[
        style.container,
        {
          flex: 0,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        },
      ]}
    >
      <Text style={style.buttonText}>Login</Text>
      <ToggleThemeButton />
      <Link href={"/(auth)/register"}> GoTo Register</Link>
      <DynamicInput
        type="email"
        description="Re-enabling Developer Options."
        label="email"
        placeholder="placeholder"
        error="error"
      />
      <DynamicInput
        type="email"
        description="Re-enabling Developer Options."
        label="label"
        placeholder="placeholder"
      />
      <DynamicInput
        type="password"
        description="Re-enabling Developer Options."
        label="label"
        placeholder="placeholder"
      />
    </View>
  );
}
