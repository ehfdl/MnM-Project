import { useState, useRef } from "react";
import styled from "@emotion/native";
import { emailRegex, pwRegex } from "../util";
import { authService } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Modal } from "react-native";

const auth = getAuth();

const SignUpModal = ({ isOpenSignUpModal, setIsOpenSignUpModal }) => {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const pwckRef = useRef(null);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCheckPassword, setUserCheckPassword] = useState("");

  const validateInputs = () => {
    if (!userEmail) {
      alert("닉네임을 입력해주세요.");
      emailRef.current.focus();
      return true;
    }
    if (!userPassword) {
      alert("패스워드를 입력해주세요.");
      pwRef.current.focus();
      return true;
    }
    if (!userCheckPassword) {
      alert("패스워드 확인을 입력해주세요.");
      pwckRef.current.focus();
      return true;
    }
    const matchedEmail = userEmail.match(emailRegex);
    const matchedPw = userPassword.match(pwRegex);

    if (matchedEmail === null) {
      alert("이메일 형식에 맞게 입력해 주세요.");
      emailRef.current.focus();
      return true;
    }
    if (matchedPw === null) {
      alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
      pwRef.current.focus();
      return true;
    }
    if (userPassword !== userCheckPassword) {
      alert("비밀번호 확인이 다릅니다.");
      pwckRef.current.focus();
      return true;
    }
  };

  const onPressSignUp = async () => {
    if (validateInputs()) {
      return;
    }

    await createUserWithEmailAndPassword(auth, userEmail, userPassword);

    setIsOpenSignUpModal(false);
    setUserEmail("");
    setUserPassword("");
    setUserCheckPassword("");
  };

  return (
    <Modal visible={isOpenSignUpModal} transparent animationType="slide">
      <Backdrop>
        <Dialog>
          <InputWrapper>
            <InputTitle>ID</InputTitle>
            <SignUpInput
              placeholder="이메일"
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
            />
            <InputTitle>Password</InputTitle>
            <SignUpInput
              placeholder="비밀번호"
              value={userPassword}
              onChangeText={(text) => setUserPassword(text)}
            />
            <InputTitle>Password</InputTitle>
            <SignUpInput
              placeholder="비밀번호 확인"
              value={userCheckPassword}
              onChangeText={(text) => setUserCheckPassword(text)}
            />
          </InputWrapper>
          <Row style={{ justifyContent: "space-between" }}>
            <ModalBtn
              onPress={() => setIsOpenSignUpModal(false)}
              title="Cancel"
            />
            <ModalBtn
              disabled={!userEmail || !userPassword || !userCheckPassword}
              onPress={onPressSignUp}
              title="Sign Up"
            />
          </Row>
        </Dialog>
      </Backdrop>
    </Modal>
  );
};

export default SignUpModal;

const SignUpInput = styled.TextInput`
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
`;
const ModalBtn = styled.Button``;
const InputWrapper = styled.View`
  border: 1px solid black;
`;

const Backdrop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Dialog = styled.KeyboardAvoidingView`
  background-color: white;
  width: 80%;
  height: 60%;
  padding: 20px;
  justify-content: space-between;
  border-radius: 5px;
`;
const InputTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const Row = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 10px;
`;
