import MessageListComponent from "@/component/messages/messageList";
import SendMessageButton from "@/component/messages/sendMessageButton";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Chats() {
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);
  const { userId, fullName, imageUrl } = useLocalSearchParams();
  return (
    <View
      style={[
        style.containerSecond,
        { flex: 1,width:"100%", justifyContent: "space-between", alignContent: "center" },
      ]}
    >
      <MessageListComponent props={{ secondUserId: userId as string }} />
    </View>
  );
}
