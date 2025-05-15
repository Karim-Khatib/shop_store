import { useAuth } from "@/hooks/auth_provider";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import { MassageType } from "@/hooks/types";
import React from "react";
import { Dimensions, Text, View } from "react-native";

export default function MessageTileComponent({
  message,
}: {
  message: MassageType;
}) {
  const authProvider = useAuth();
  const { width, height } = Dimensions.get("window");

  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);
  const isFromMe = message.sender.id === authProvider?.user?.id;
  return (
    <View
      style={[
        {
          flex: 1,
          width,
          flexDirection: "row",
        },
        isFromMe
          ? {
              justifyContent: "flex-end",
            }
          : {
              justifyContent: "flex-start",
            },
      ]}
    >
      <View
        style={[
          style.container,
          {
            padding: 20,
            elevation: 10,
            margin: 10,
            marginHorizontal: 30,
            borderRadius: 16,

            flexDirection: "row",
            minHeight: 40,
            backgroundColor: isFromMe
              ? style.backgroundMessage.backgroundColor
              : style.backgroundMessageSecond.backgroundColor,
          },
          isFromMe
            ? { justifyContent: "flex-end" }
            : { justifyContent: "flex-start" },
        ]}
      >
        <Text style={style.body}>{message.text}</Text>
      </View>
    </View>
  );
}
