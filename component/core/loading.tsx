// LoadingToast.tsx
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingComponent() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    marginLeft: 16,
    fontSize: 16,
  },
});
