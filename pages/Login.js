import styled from "@emotion/native";
import React, { useState, useEffect } from "react";
import SignUpModal from "../components/SignUpModal";
import { authService } from "../firebase";
import { emailRegex } from "../util";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

const Login = ({ navigation: { goBack, setOptions } }) => {
  const isDark = useColorScheme() === "dark";

  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);

  const [validateEmail, setValidateEmail] = useState("");

  const validateEmailCheck = () => {
    const matchedEmail = userEmail.match(emailRegex);
    if (matchedEmail === null) {
      setValidateEmail("이메일 형식에 맞게 입력해 주세요.");
    }
    if (matchedEmail !== null) {
      setValidateEmail("");
    }
    if (userEmail === "") {
      setValidateEmail("");
    }
  };

  const loginHandler = async () => {
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

  const seePasswordHandler = () => {
    setSeePassword(!seePassword);
  };

  useEffect(() => {
    setOptions({ headerRight: () => null });
  }, []);

  useEffect(() => {
    validateEmailCheck();
  }, [userEmail]);

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
          secureTextEntry={seePassword}
          onChangeText={(text) => setUserPassword(text)}
        />
        {seePassword ? (
          <PassView onPress={seePasswordHandler}>
            <Ionicons name="eye" size={22} color={isDark ? "white" : "black"} />
          </PassView>
        ) : (
          <PassView onPress={seePasswordHandler}>
            <Ionicons
              name="eye-off"
              size={22}
              color={isDark ? "white" : "black"}
            />
          </PassView>
        )}

        <ValidateEmailText>{validateEmail}</ValidateEmailText>
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

const PassView = styled.TouchableOpacity`
  position: absolute;
  margin-top: 104px;
  margin-left: 85%;
`;

const ValidateEmailText = styled.Text`
  color: red;
  width: 100%;
  font-size: 12px;
  padding-left: 10px;
  margin-top: 5px;
`;

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
  border-radius: 10px;
  margin-top: 20px;
  padding-left: 10px;
  color: ${(props) => props.theme.text};
  border-color: ${(props) => props.theme.text};
  border-bottom-width: 1px;
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
  color: ${(props) => props.theme.title};
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
