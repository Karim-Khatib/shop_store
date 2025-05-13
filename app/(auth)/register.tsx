import { uploadFile } from "@/api/clodeStorge";
import CircleAvatar from "@/component/core/circleAvatar";
import DynamicButton from "@/component/core/dynamicButton";
import DynamicInput from "@/component/core/dynamicInput";
import SizedBox from "@/component/core/sizedBox";
import ToggleThemeButton from "@/component/core/toggleThemeButton";
import { light } from "@/constant/colors";
import {  registerSchema, RegisterSchemaType, useAuth } from "@/hooks/auth_provider";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";

export default function Register(props: any) {
  const { currentTheme } = useTheme();
  const authProvider = useAuth();
  const router = useRouter();
  const style = getStyle(currentTheme);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const handelRegister =async (formData: RegisterSchemaType) => {
   await authProvider?.register(formData)
  };

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
        <Controller
          control={control}
          name="imageUrl"
          render={({ field: { onChange, value } }) => (
            <>
              <CircleAvatar uri={value} onChange={(uri) => onChange(uri)} />
            </>
          )}
        />

        <SizedBox height={25} />
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <DynamicInput
              type="text"
              label="Full Name"
              placeholder="Full Name"
              error={errors.fullName?.message}
              onChangeText={(e) => onChange(e.nativeEvent.text)}
              value={value}
              description="Please enter your full name to complete withdrawals and transfers."
            />
          )}
          {...(errors.imageUrl && (
            <Text style={[style.smallText, { color: light.danger[900] }]}>
              {errors.imageUrl.message}
            </Text>
          ))}
        />

        <SizedBox height={16} />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <DynamicInput
              type="email"
              label="Email"
              placeholder="Enter your email"
              error={errors.email?.message}
              onChangeText={(e) => onChange(e.nativeEvent.text)}
              value={value}
            />
          )}
        />

        <SizedBox height={16} />
        <Controller
          control={control}
          name="birthDay"
          render={({ field: { onChange, value } }) => (
            <DynamicInput
              type="date"
              label="Birth Day"
              error={errors.birthDay?.message}
              onChangeDate={(e) => onChange(e)}
              value={value}
              placeholder="Enter your Birth Day"
            />
          )}
        />

        <SizedBox height={16} />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <DynamicInput
              type="password"
              error={errors.password?.message}
              label="password"
              onChangeText={(e) => onChange(e.nativeEvent.text)}
              value={value}
              placeholder="Enter your password"
            />
          )}
        />

        <SizedBox height={16} />
        <DynamicButton
          title="Create Account"
          type="primary"
          onPressed={handleSubmit(handelRegister)}
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
