import styled from "@emotion/native";
import React, { useState } from "react";
import { View, Text } from "react-native";
import SignUpModal from "../components/SignUpModal";

const Login = () => {
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);

  const signUpHandler = () => {
    setIsOpenSignUpModal(true);
  };

  console.log(isOpenSignUpModal);

  return (
    <LoginContainer>
      <LoginInputBox>
        <LoginInput placeholder="ID를 입력해주세요" />
        <LoginInput placeholder="Password를 입력해주세요" />
        <LoginButton>
          <ButtonText>Login</ButtonText>
        </LoginButton>
        <SignUpButton>
          <ButtonText onPress={signUpHandler}>Sign Up</ButtonText>
        </SignUpButton>
      </LoginInputBox>
      <SignUpModal
        isOpenSignUpModal={isOpenSignUpModal}
        setIsOpenSignUpModal={setIsOpenSignUpModal}
      />
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: black;
  align-items: center;
`;

const LoginInputBox = styled.View`
  width: 80%;
  height: 400px;
  background-color: black;
  border-radius: 10px;
  margin-top: 70px;
`;

const LoginInput = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  padding-left: 10px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #e50015;
  border-radius: 10px;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  color: white;
  font-size: 22px;
`;

const SignUpButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #e50015;
  border-radius: 10px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;
