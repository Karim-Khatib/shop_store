import HeaderApp from "@/component/home/headerApp";
import { secondary } from "@/constant/colors";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React from "react";

export default function HomeLayout() {
  // const authProvider = useAuth();
  // const router=useRouter();
  // if (!authProvider || authProvider?.authState === AuthStatusEnum.INIT) {
  //   return <LoadingComponent />;
  // }
  // if(authProvider?.authState === AuthStatusEnum.NOTAUTH){
  //   router.replace("/(auth)/login");
  // }
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);
  return (
    <>
      <HeaderApp />

      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarShowLabel: false,

          tabBarActiveTintColor: secondary[500],

          tabBarStyle: {
            position: "absolute",

            backgroundColor: style.tabBar.backgroundColor,
            borderRadius: 10,
            borderWidth: 0,
            marginHorizontal: 30,

            marginVertical: 20,
          },
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="user" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="posts"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="facebook-square" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
