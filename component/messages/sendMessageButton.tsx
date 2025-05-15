import { saveMessage } from "@/api/messages";
import { light } from "@/constant/colors";
import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import DynamicInput from "../core/dynamicInput";

export default function SendMessageButton({
  secondeUser,
  onSubmit,
}: {
  secondeUser: string;
  onSubmit:(text:string)=>void,
}) {
  const [message, setMessage] = React.useState("");
  const sendMessage = useCallback(async () => {
    if (message.trim().length > 0) {
      // console.log("sendMessage",message)
      // await saveMessage(message, secondeUser);
      onSubmit(message);
      setMessage("");
    }
  }, [message, onSubmit]);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignContent: "center",
        padding: 10,
      }}
    >
      <DynamicInput
        type="text"
        value={message}
        onChangeText={(text) => {
          setMessage(text.nativeEvent.text);
        }}
      />
      <TouchableOpacity onPress={()=>sendMessage()}>
        <View
          style={{
            padding: 10,
            backgroundColor: light.success[500],
            borderRadius: 50,
          }}
        >
          <FontAwesome name="send" size={18} color={light.neutral[100]} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
