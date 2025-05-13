import DynamicButton from "@/component/core/dynamicButton";
import { useAuth } from "@/hooks/auth_provider";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const authProvider = useAuth();
  return (
    <SafeAreaView>
      <View>
        <DynamicButton
          onPressed={() => {
            authProvider?.logout();
          }}
          title="Logout"
          type="primary"
        />
      </View>
    </SafeAreaView>
  );
}
