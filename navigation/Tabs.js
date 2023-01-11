import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, BLUE_COLOR, WHITE_COLOR, RED_COLOR } from "../colors";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";

import { authService } from "../firebase";

import Slide from "../components/Slide";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation: { navigate, setOptions } }) => {
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
            <MaterialCommunityIcons name="text-box" size={size} color={color} />
          ),
          title: "Main",
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
