import DynamicButton from "@/component/core/dynamicButton";
import ToggleThemeButton from "@/component/core/toggleThemeButton";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
      <DynamicButton
        type="primary"
        title="press me"
        onPressed={() => {}}
        iconBuilder={(color, size, style) => (
          <FontAwesome style={style} name="send" color={color} size={size} />
        )}
      />
      <DynamicButton
        type="onPrimary"
        title="press me"
        onPressed={() => {}}
        iconBuilder={(color, size, style) => (
          <FontAwesome style={style} name="send" color={color} size={size} />
        )}
      />
      <DynamicButton
        type="danger"
        title="press me"
        onPressed={() => {}}
        iconBuilder={(color, size, style) => (
          <FontAwesome style={style} name="send" color={color} size={size} />
        )}
      />
      <DynamicButton
        type="success"
        title="press me"
        onPressed={() => {}}
        iconBuilder={(color, size, style) => (
          <FontAwesome style={style} name="send" color={color} size={size} />
        )}
      />
    </View>
  );
}
