import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import React from "react";
import { Text } from "react-native";

export default function ErrorTextComponent({text}:{text:string}) {
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);
  return (
    <Text style={[style.body, { color: currentTheme.danger[900] }]}>
      {text}
    </Text>
  );
}
