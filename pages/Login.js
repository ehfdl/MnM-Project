import styled from "@emotion/native";
import React, { useState } from "react";
import { View, Text } from "react-native";
import SignUpModal from "../components/SignUpModal";

const Login = ({ navigation: { goBack } }) => {
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);

  const signUpHandler = () => {
    setIsOpenSignUpModal(true);
  };

  return (
    <LoginContainer>
      <LoginInputBox>
        <LoginInput placeholder="E-mail를 입력해주세요" />
        <LoginInput placeholder="Password를 입력해주세요" />
        <LoginButton>
          <LoginText>Login</LoginText>
        </LoginButton>
        <SignUpButton>
          <SignUpText onPress={signUpHandler}>Sign up</SignUpText>
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
  background-color: ${(props) => props.theme.backGround};
  align-items: center;
`;

const LoginInputBox = styled.View`
  width: 80%;
  height: 400px;
  background-color: ${(props) => props.theme.backGround};
  border-radius: 10px;
  margin-top: 70px;
`;

const LoginInput = styled.TextInput`
  width: 100%;
  height: 50px;
  /* background-color: white; */
  border-radius: 10px;
  margin-top: 20px;
  padding-left: 10px;
  color: ${(props) => props.theme.text};
  border-color: ${(props) => props.theme.text};
  border-bottom-width: 1px;
  /* &:hover {
    box-shadow: 3px 3px 5px #aaa;
  } */
  /* &::placeholder {
    padding-left: 2px;
  } */
  /* &:focus {
    box-shadow: 3px 3px 5px #aaa;
    scale: 1.01;
  } */
  /* &:focus::placeholder {
    color: #111;
  } */
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
const LoginText = styled.Text`
  font-weight: bold;
  color: white;
  font-size: 22px;
`;

const SignUpText = styled.Text`
  font-weight: bold;
  color: ${(props) => props.theme.pointText};
  font-size: 16px;
`;

const SignUpButton = styled.TouchableOpacity`
  width: 100%;
  height: 20px;
  border-radius: 10px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;
