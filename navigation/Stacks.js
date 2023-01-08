import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import { BLACK_COLOR, RED_COLOR } from "../colors";
import Login from "../pages/Login";

const Stack = createNativeStackNavigator();

const Stacks = ({ navigation: { goBack } }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        headerTintColor: isDark ? RED_COLOR : BLACK_COLOR,
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: isDark ? RED_COLOR : BLACK_COLOR }}>
              ← 뒤로
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Sign in",
        }}
      />
    </Stack.Navigator>
  );
};

export default Stacks;
