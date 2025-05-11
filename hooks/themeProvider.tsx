import { appTheme, light } from "@/constant/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { ThemeState, ThemeType } from "./types";
const initState: ThemeState = {
  theme: ThemeType.LIGHT,
  currentTheme: light,
  toggleTheme: () => {},
};
const ThemeContext = createContext(initState);
export function useTheme() {
  return useContext(ThemeContext);
}

const STORAGE_KEY = "secret-key";
export default function ThemeProvider(props: { children: React.ReactNode }) {
  const themeSystem = useColorScheme();
  const [theme, setTheme] = useState(themeSystem || ThemeType.LIGHT);
  const [currentTheme, setCurrentTheme] = useState(appTheme[theme]);

  useEffect(() => {
    const loadThemeFromStorage = async () => {
      let stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored === ThemeType.LIGHT && theme !== ThemeType.LIGHT) {
        setTheme(ThemeType.LIGHT);
      } else if (stored === ThemeType.DARK && theme !== ThemeType.DARK) {
        setTheme(ThemeType.DARK);
      }
    };
    loadThemeFromStorage();
    return () => {
      AsyncStorage.setItem(STORAGE_KEY, theme);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((theme) => {
      if (theme === ThemeType.LIGHT) {
        return ThemeType.DARK;
      } else {
        return ThemeType.LIGHT;
      }
    });
  }, []);
  useEffect(() => {
    setCurrentTheme(appTheme[theme]);
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        currentTheme: currentTheme,
        theme: theme,
        toggleTheme: toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

