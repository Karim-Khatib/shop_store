import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function Register() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Text>Register</Text>

      <Pressable onPress={() => router.replace("/(auth)/login")}>
        <Text
          style={{
            fontSize: 19,
          }}
        >
          Go Register
        </Text>
      </Pressable>
    </View>
  );
}
