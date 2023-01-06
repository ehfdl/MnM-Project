import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screen/Movies";
import MyPage from "../screen/MyPage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, BLUE_COLOR, WHITE_COLOR, YELLOW_COLOR } from "../colors";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? DarkTheme : DefaultTheme,
        // fontColor: isDark ? WHITE_COLOR : DefaultTheme,
      }}
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLUE_COLOR,
        headerTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
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
        name="Movies"
        component={Movies}
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
