import DynamicButton from "@/component/core/dynamicButton";
import { useAuth } from "@/hooks/auth_provider";
import { getStyle } from "@/hooks/styles";
import { useTheme } from "@/hooks/themeProvider";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const authProvider = useAuth();
  const { currentTheme } = useTheme();
  const style = getStyle(currentTheme);
  return (
      <View style={style.container}>
        <DynamicButton
          onPressed={() => {
            authProvider?.logout();
          }}
          title="Logout"
          type="primary"
        />
      </View>
  );
}
