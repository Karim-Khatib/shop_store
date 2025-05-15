import CircleAvatar from "@/component/core/circleAvatar";
import { useAuth } from "@/hooks/auth_provider";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import React from "react";
import { View } from "react-native";

export default function Profile() {
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);
  const authProvider = useAuth();
  return (
    <View
      style={[
        style.container,
        { flex: 1, justifyContent: "center", alignContent: "center" },
      ]}
    >
      <View
        style={{
          marginHorizontal: 130,
          height: "auto",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CircleAvatar uri={authProvider?.user?.imageUrl} />
      </View>
    </View>
  );
}
