import UsersListComponent from "@/component/home/usersListComponent";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import { View } from "react-native";

export default function HomeScreen() {
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);

  return (
    <View
      style={[
        style.container,
        { flex: 1,  },
      ]}
    >
      <UsersListComponent />
    </View>
  );
}
