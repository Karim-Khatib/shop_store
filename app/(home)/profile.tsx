import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import React from "react";
import { Text, View } from "react-native";

export default function Profile() {
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);
  return (
    <View style={[style.container, { flex: 1 }]}>
      <Text>Profile</Text>
    </View>
  );
}
