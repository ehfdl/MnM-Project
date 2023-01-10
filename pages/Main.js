import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";
import styled from "@emotion/native";
import Loader from "../components/review/Loader";

const Main = () => {
  const { navigate } = useNavigation();
  const goToLogin = () => {
    navigate("Stacks", {
      screen: "Login",
    });
  };
  if (isLoading) {
    return <Loader />;
  }
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
