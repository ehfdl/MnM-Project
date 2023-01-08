import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, BLUE_COLOR, WHITE_COLOR, RED_COLOR } from "../colors";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import Login from "../pages/Login";
// import Login from "../pages/Login";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? DarkTheme : DefaultTheme,
      }}
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: isDark ? RED_COLOR : BLUE_COLOR,
        headerTintColor: isDark ? RED_COLOR : BLACK_COLOR,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="filmstrip"
              size={size}
              color={color}
            />
          ),
        }}
        name="Main"
        component={Main}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="text-box" size={size} color={color} />
          ),
          title: "My",
        }}
        name="MyPage"
        component={MyPage}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
