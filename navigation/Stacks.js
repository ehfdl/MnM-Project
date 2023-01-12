import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, useColorScheme } from "react-native";

import { BLACK_COLOR, RED_COLOR } from "../colors";
import Login from "../pages/Login";
import { authService } from "../firebase";
import { signOut } from "firebase/auth";

import Detail from "../pages/Detail";

import Main from "../pages/Main";

import ReviewEdit from "../pages/ReviewEdit";
// 이미지확대 테스트
import InfoImg from "../components/modal/InfoImg";
const Stack = createNativeStackNavigator();

const Stacks = ({ navigation: { goBack, navigate, setOptions } }) => {
  const isDark = useColorScheme() === "dark";

  const handleAuth = () => {
    if (!!authService.currentUser?.uid) {
      // 로그아웃 요청
      signOut(authService)
        .then(() => {
          console.log("로그아웃 성공");
          setOptions({ headerRight: null });
        })
        .catch((err) => alert(err));
    } else {
      // 로그인 화면으로
      navigate("Login");
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: isDark ? RED_COLOR : BLACK_COLOR,
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: isDark ? RED_COLOR : BLACK_COLOR }}>
              ← 뒤로
            </Text>
          </TouchableOpacity>
        ),
        headerRight: () => {
          return (
            <TouchableOpacity onPress={handleAuth}>
              <Text style={{ color: isDark ? RED_COLOR : BLACK_COLOR }}>
                {authService.currentUser ? "로그아웃" : "로그인"}
              </Text>
            </TouchableOpacity>
          );
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: "홈",
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: "상세페이지",
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name="ReviewEdit"
        component={ReviewEdit}
        options={{
          title: "ReviewEdit",
        }}
      />
    </Stack.Navigator>
  );
};

export default Stacks;
