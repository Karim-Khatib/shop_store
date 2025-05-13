import React, { createContext, useCallback } from "react";
import { ActivityIndicator, View } from "react-native";

type LoadingContextType = {
  showLoading: () => void;
  hideLoading: () => void;
};
const LoadingContext = createContext<LoadingContextType>({
  hideLoading: () => {},
  showLoading: () => {},
});
export const useLoading = () => {
  return React.useContext(LoadingContext);
};

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState(false);

  const showLoading = useCallback(() => {
    setState(true);
  }, []);

  const hideLoading = useCallback(() => {
    setState(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {state && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      {children}
    </LoadingContext.Provider>
  );
}
