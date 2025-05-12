import CircleAvatar from "@/component/core/circleAvatar";
import DynamicButton from "@/component/core/dynamicButton";
import DynamicInput from "@/component/core/dynamicInput";
import SizedBox from "@/component/core/sizedBox";
import ToggleThemeButton from "@/component/core/toggleThemeButton";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function Register(props: any) {
  const { currentTheme } = useTheme();
  const router = useRouter();
  const style = getStyle(currentTheme);
  return (
    // <TouchableWithoutFeedbackBase onPress={Keyboard.dismiss}>
    <ScrollView>
      <View
        style={[
          style.container,
          {
            flex: 0,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          },
        ]}
      >
        <SizedBox height={50} />
        <Text style={style.header1}>Create an account</Text>
        <Text style={style.subtitle}>
          Enter your personal account information
        </Text>
        <SizedBox height={61} />
        <CircleAvatar />
        <SizedBox height={25} />
        <DynamicInput
          type="text"
          label="Full Name"
          placeholder="Full Name"
          description="Please enter your full name to complete withdrawals and transfers."
        />
        <SizedBox height={16} />
        <DynamicInput
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
        <SizedBox height={16} />

        <DynamicInput
          type="date"
          label="Birth Day"
          placeholder="Enter your Birth Day"
        />
        <SizedBox height={16} />
        <DynamicInput
          type="password"
          label="password"
          placeholder="Enter your password"
        />
        <SizedBox height={16} />
        <DynamicButton
          title="Create Account"
          type="primary"
          onPressed={() => {}}
        />
        <SizedBox height={10} />
        <Text style={style.subtitle}>Or</Text>
        <SizedBox height={10} />
        <DynamicButton
          title="Login"
          type="onPrimary"
          onPressed={() => {
            router.replace("/(auth)/login");
          }}
        />
        <SizedBox height={50} />

        <ToggleThemeButton />
        <SizedBox height={50} />
      </View>
    </ScrollView>
    // </TouchableWithoutFeedbackBase>
  );
}
