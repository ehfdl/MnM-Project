import styled from "@emotion/native";
import React, { useState, useRef, useEffect } from "react";
import { View, Text } from "react-native";
import SignUpModal from "../components/SignUpModal";
import { authService } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ navigation: { goBack, setOptions } }) => {
  const emailRef = useRef(null);
  const pwRef = useRef(null);

  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const loginHandler = async () => {
    // 유효성 검사
    // if (validateInputs()) {
    //   return;
    // }

    // 로그인 요청
    await signInWithEmailAndPassword(authService, userEmail, userPassword)
      .then(() => {
        console.log("로그인성공");
        setUserEmail("");
        setUserPassword("");
        goBack();
        // 로그인 화면 이전 화면으로 돌아가기
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("user-not-found")) {
          alert("회원이 아닙니다. 회원가입을 먼저 진행해 주세요.");
        }
        if (err.message.includes("wrong-password")) {
          alert("비밀번호가 틀렸습니다.");
        }
      });
  };

  const signUpHandler = () => {
    setIsOpenSignUpModal(true);
  };

  // useEffect(() => {
  //   setOptions({ headerRight: () => null });
  // }, []);

  return (
    <LoginContainer>
      <LoginInputBox>
        <LoginInput
          placeholder="E-mail를 입력해주세요"
          value={userEmail}
          onChangeText={(text) => setUserEmail(text)}
        />
        <LoginInput
          placeholder="Password를 입력해주세요"
          value={userPassword}
          onChangeText={(text) => setUserPassword(text)}
        />
        <LoginButton onPress={loginHandler}>
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
