import { getAllUsers } from "@/api/user";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import LoadingComponent from "../core/loading";
import UserTileComponent from "./userTileComponent";

export default function UsersListComponent() {
  const { currentTheme } = useTheme();
  const router = useRouter();
  const style = getStyle(currentTheme);
  const provider = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  if (provider.isLoading) {
    return <LoadingComponent />;
  }
  if (provider.isError || provider.data?.success === false) {
    return <Text>{provider.error?.message ?? "Error"}</Text>;
  }
  return (
    <View style={[style.container, { flex: 1 }]}>
      {!provider.data?.results || provider.data?.results?.length === 0 ? (
        <Text style={style.body}>No users</Text>
      ) : (
        provider.data?.results?.map((user, index) => {
          return (
            <UserTileComponent
              key={index}
              user={user}
              onClick={() => {
                router.push({
                  params: {
                    userId: user.id,
                    fullName: user.fullName,
                    imageUrl:user.imageUrl
                  },
                  pathname: `/chats/messages`,
                });
              }}
            />
          );
        })
      )}
    </View>
  );
}
