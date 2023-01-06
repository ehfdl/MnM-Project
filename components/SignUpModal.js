import { useState } from "react";
import styled from "@emotion/native";
// import { addDoc, collection } from "firebase/firestore";
import { Modal } from "react-native";
// import { authService, dbService } from "../firebase";

const SignUpModal = ({ isOpenSignUpModal, setIsOpenSignUpModal }) => {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const addReview = async () => {
    setIsOpenSignUpModal(false);
    setModalTitle("");
    setModalContent("");
  };
  return (
    <Modal visible={isOpenSignUpModal} transparent animationType="slide">
      <Backdrop>
        <Dialog>
          <InputWrapper>
            <InputTitle>NickName</InputTitle>
            <SignUpInput
            //   value={modalTitle}
            //   onChangeText={(text) => setModalTitle(text)}
            />
            <InputTitle>ID</InputTitle>
            <SignUpInput
              value={modalTitle}
              onChangeText={(text) => setModalTitle(text)}
            />
            <InputTitle>Password</InputTitle>
            <SignUpInput
              value={modalContent}
              onChangeText={(text) => setModalContent(text)}
            />
            <InputTitle>Password</InputTitle>
            <SignUpInput
            //   value={modalContent}
            //   onChangeText={(text) => setModalContent(text)}
            />
          </InputWrapper>
          <Row style={{ justifyContent: "space-between" }}>
            <ModalBtn
              onPress={() => setIsOpenSignUpModal(false)}
              title="Cancel"
            />
            <ModalBtn
              disabled={!modalTitle || !modalContent}
              onPress={addReview}
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
const AddButton = styled.Button``;

const Backdrop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Dialog = styled.KeyboardAvoidingView`
  background-color: white;
  width: 80%;
  height: 70%;
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
