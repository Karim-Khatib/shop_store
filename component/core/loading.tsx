// LoadingToast.tsx
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingComponent() {
  const {currentTheme}= useTheme();
  const style=getStyle(currentTheme);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={style.body.color} />
      <Text style={style.body}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
 
});
