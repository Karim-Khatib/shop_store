import { light } from "@/constant/colors";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import { Theme } from "@/hooks/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import React, { ReactNode, useCallback, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";

type DynamicInputProps = {
  placeholder?: string;
  label?: string;

  description?: string;
  type: "text" | "password" | "email" | "number" | "phone" | "date";
  style?: object;
  error?: string;
  onChangeText?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  register?: UseFormRegisterReturn<any>;
  value?: string;
};

export default function DynamicInput(props: DynamicInputProps) {
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);

  // change border color of input b
  return (
    <View>
      {props.type === "text" ||
      props.type === "password" ||
      props.type === "email" ||
      props.type === "number" ||
      props.type === "phone" ? (
        <TextInputFiled
          props={props}
          currentTheme={currentTheme}
          themeStyle={style}
        />
      ) : (
        <DateTimeFiled
          currentTheme={currentTheme}
          props={props}
          themeStyle={style}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%",
    maxWidth: 300,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  description: {
    fontSize: 12,
    width: 300,
    color: "#666",
    marginTop: 5,
  },
});

function DateTimeFiled(props: TextInputFiledProps) {
  const [date, setDate] = useState(new Date());
  const [picker, showPicker] = useState(false);
  const togglesDialog = useCallback(() => {
    showPicker(!picker);
    if (picker) {
      DateTimePickerAndroid.open({
        value: new Date(2000, 1, 1),
        mode: "date",
        onChange: onChange,
      });
    } else {
      DateTimePickerAndroid.dismiss("date");
    }
  }, [picker]);
  const onChange = (e: DateTimePickerEvent, date?: Date) => {
    if (e.type === "set") {
      const currentDate = date;
      if (currentDate) {
        setDate(currentDate);
      }
    }
  };

  return (
    <>
      <Pressable onPress={togglesDialog}>
        <TextInputFiled
          {...props}
          props={{
            ...props.props,
            value: date.toLocaleDateString(),
          }}
          editable={false}
          icon={<AntDesign name="calendar" size={12} color="black" />}
        />
      </Pressable>
    </>
  );
}
type TextInputFiledProps = {
  props: DynamicInputProps;
  currentTheme: Theme;
  themeStyle: ReturnType<typeof getStyle>;
  editable?: boolean;
  icon?: ReactNode;
};
function TextInputFiled(props: TextInputFiledProps) {
  const [isFocus, setFocus] = useState(false);
  const borderColor = isFocus ? { borderColor: light.primary[900] } : null;
  const themeStyle = props.themeStyle;
  const errorColor =
    props.props.error !== undefined ? { borderColor: light.danger[700] } : null;
  return (
    <>
      {props.props.label && (
        <Text style={[props.themeStyle.smallButtonText, styles.label]}>
          {props.props.label}
        </Text>
      )}
      <View
        style={[
          themeStyle.container,
          styles.input,
          props.props.style,
          errorColor ?? borderColor,

          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            maxHeight: 40,
            width: 300,
            borderWidth: 1.4,
          },
        ]}
      >
        <TextInput
          onChange={props?.props?.onChangeText}
          value={props.props.value}
          editable={props.editable}
          style={{ flex: 1, width: 400 }}
          textAlign="left"
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          placeholder={props.props.placeholder}
          {...props.props.register}
        />
        {props.icon}
      </View>
      {props.props.error !== undefined ? (
        <Text style={[styles.description, { color: errorColor?.borderColor }]}>
          {props.props.error}
        </Text>
      ) : (
        props.props.description && (
          <Text style={styles.description}>{props.props.description}</Text>
        )
      )}
    </>
  );
}
