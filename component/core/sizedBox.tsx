import React from "react";
import { View } from "react-native";
type SizedBoxProps = {
  width?: number;
  height?: number;
};
export default function SizedBox(props: SizedBoxProps) {
  return (
    <View
      style={{
        width: props.width,
        height: props.height,
      }}
    />
  );
}
