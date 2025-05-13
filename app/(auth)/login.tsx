import AppLogo from "@/component/core/appLogo";
import DynamicButton from "@/component/core/dynamicButton";
import DynamicInput from "@/component/core/dynamicInput";
import SizedBox from "@/component/core/sizedBox";
import ToggleThemeButton from "@/component/core/toggleThemeButton";
import { loginSchema, LoginSchemaType } from "@/hooks/auth_provider";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Login() {
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const handelLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log(email, password);
  };

  return (
    <SafeAreaView style={[style.container, { flex: 1 }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SizedBox height={50} />
            <AppLogo />
            <SizedBox height={30} />
            <Text style={style.header1}>Welcome back</Text>
            <Text style={style.subtitle}>Log in or create an account now</Text>
            <SizedBox height={30} />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <DynamicInput
                  type="email"
                  label="Email"
                  onChangeText={(e) => onChange(e.nativeEvent.text)}
                  value={value}
                  placeholder="Enter your email"
                  error={errors.email?.message}
                />
              )}
            />
            <SizedBox height={10} />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <DynamicInput
                  type="password"
                  label="Password"
                  placeholder="Password"
                  onChangeText={(e) => onChange(e.nativeEvent.text)}
                  value={value}
                  error={errors.password?.message}
                />
              )}
            />
            <SizedBox height={30} />
            <DynamicButton
              title="Login"
              type="primary"
              onPressed={handleSubmit(handelLogin)}
            />
            <SizedBox height={10} />
            <Text style={style.subtitle}>Or</Text>
            <SizedBox height={10} />
            <DynamicButton
              title="Create an account"
              type="onPrimary"
              onPressed={() => {
                router.replace("/(auth)/register");
              }}
            />
            <SizedBox height={30} />
            <ToggleThemeButton />
            <SizedBox height={30} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}
