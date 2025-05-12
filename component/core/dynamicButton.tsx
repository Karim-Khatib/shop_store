import { light } from "@/constant/colors";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import React from "react";

import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";


type ButtonProps = {
  children?: React.ReactNode;
  type: "primary" | "danger" | "onPrimary" | "success";
  onPressed: () => void;
  title: string;
  iconBuilder?: (
    color: string,
    size: number,
    style: StyleProp<TextStyle>
  ) => React.ReactNode;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
};
export default function DynamicButton(props: ButtonProps) {
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);

  const Icon = props.iconBuilder ? (
    <View>
      {props.iconBuilder(
        props.type === "onPrimary" ? light.neutral[900] : light.neutral[100],
        10,
        {
          marginHorizontal: 20,
        }
      )}
    </View>
  ) : undefined;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={props.isDisabled}
      onPress={props.onPressed}
      style={[
        style[props.type],
        props.style,
        props.isDisabled === true ? style.disableButton : null,
        {},
      ]}
    >
      <Text
        style={
          (style.buttonText,
          props.type === "onPrimary"
            ? {
                color: light.neutral[900],
              }
            : {
                color: light.neutral[100],
              })
        }
      >
        {props.title}

        {Icon}
      </Text>
    </TouchableOpacity>
  );
}
