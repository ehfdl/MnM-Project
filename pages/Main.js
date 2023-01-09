import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";
import styled from "@emotion/native";

const Main = () => {
  const { navigate } = useNavigation();
  const goToLogin = () => {
    navigate("Stacks", {
      screen: "Login",
    });
  };
  return (
    <TouchableOpacity onPress={goToLogin}>
      <DText>zzz</DText>
    </TouchableOpacity>
  );
};

export default Main;

const DText = styled.Text`
  color: ${(props) => props.theme.text};
`;
