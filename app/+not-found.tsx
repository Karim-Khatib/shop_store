import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function NotFound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Pag NotFound</Text>
      <Link href="/(auth)/login">
        <Text>Go to Home</Text>
      </Link>
    </View>
  );
}
