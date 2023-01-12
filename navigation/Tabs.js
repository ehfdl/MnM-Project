import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, RED_COLOR } from "../colors";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";

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
        tabBarActiveTintColor: RED_COLOR,
        headerTintColor: isDark ? RED_COLOR : BLACK_COLOR,
      }}
    >
      <Tab.Screen
        options={{
          headerTitle: "홈",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-circle-outline"
              size={size}
              color={color}
            />
          ),
          title: "",
        }}
        name="Main"
        component={Main}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-details"
              size={size}
              color={color}
            />
          ),
          title: "",
        }}
        name="MyPage"
        component={MyPage}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
