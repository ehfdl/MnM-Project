import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import Root from "./navigation/Root";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./theme";

const App = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
