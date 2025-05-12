import { StyleSheet, ViewStyle } from "react-native";
import { Theme } from "./types";

export function getStyle(theme: Theme) {
  const buttonCore: ViewStyle = {
    height: 40,
    minWidth: 200,
    // marginTop: 10,
    // width: "100%",
    width: 300,
    // paddingHorizontal: 20,
    paddingTop: 10,
    elevation: 10,
    borderRadius: 4,

    backgroundColor: theme.success[700],
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  };
  return StyleSheet.create({
    toggleButton: {
      backgroundColor: theme.neutral[100],
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      elevation: 4, // Android shadow
      shadowColor: "#000", // iOS shadow
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    toggleIcon: {
      fontSize: 24,
    },
    container: {
      backgroundColor: theme.neutral[100],
    },

    header1: {
      color: theme.neutral[1000],
      fontWeight: "600",
      fontSize: 32,
      lineHeight: 40,
    },
    header2: {
      color: theme.neutral[1000],
      fontWeight: "600",
      fontSize: 18,
      lineHeight: 22,
    },
    header3: {
      color: theme.neutral[1000],
      fontWeight: "500",
      fontSize: 16,
      lineHeight: 20,
    },
    subtitle: {
      color: theme.neutral[1000],
      fontWeight: "400",
      fontSize: 16,
      lineHeight: 24,
    },
    body: {
      color: theme.neutral[1000],
      fontWeight: "400",
      fontSize: 14,
      lineHeight: 16,
    },
    bodyHighlight: {
      color: theme.neutral[1000],
      fontWeight: "500",
      fontSize: 16,
      lineHeight: 16,
    },
    buttonText: {
      color: theme.neutral[1000],
      fontWeight: "600",
      fontSize: 14,
      lineHeight: 16,
    },
    smallText: {
      color: theme.neutral[1000],
      fontWeight: "400",
      fontSize: 12,
      lineHeight: 14,
    },
    smallButtonText: {
      color: theme.neutral[1000],
      fontWeight: "600",
      fontSize: 12,
      lineHeight: 14,
    },
    tableLabel: {
      color: theme.neutral[1000],
      fontWeight: "600",
      fontSize: 11,
      lineHeight: 13,
      textTransform: "uppercase",
    },
    primary: {
      ...buttonCore,
      backgroundColor: theme.primaryButton[500],
    },
    danger: {
      ...buttonCore,
      backgroundColor: theme.danger[700],
    },
    onPrimary: {
      ...buttonCore,
      backgroundColor: theme.primaryButton[0],
    },
    success: {
      ...buttonCore,
      backgroundColor: theme.success[500],
    },
    disableButton: {
      ...buttonCore,
      backgroundColor: theme.neutral[400],
    },
    focusInput: {
      borderColor: theme.primaryButton[500],
    },
  });
}
