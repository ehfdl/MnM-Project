import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./pages/Login";
import styled from "@emotion/native";

export default function App() {
  return (
    <SsView>
      <Text></Text>
    </SsView>
  );
}

const SsView = styled.View`
  width: 100px;
  height: 80px;
  background-color: "red";
`;
