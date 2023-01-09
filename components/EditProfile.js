import { useState } from "react";
import styled from "@emotion/native";
import { View, Text, Pressable, Image } from "react-native";
import { Modal } from "react-native";
import { authService, storageService } from "../firebase.js";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { launchImageLibrary } from "react-native-image-picker";
import { StyleSheet } from "react-native";

const EditProfile = ({ isOpenEditProfileModal, setIsOpenEditProfileModal }) => {
  const [userNickName, setUserNickName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [response, setResponse] = useState(null);
  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 512,
        maxHeight: 512,
        // includeBase64: Platform.OS === "android",
      },
      (res) => {
        console.log(res);
        if (res.didCancel) return;
        setResponse(res);
      }
    );
  };

  const onPressSignUp = async () => {
    // await createUserWithEmailAndPassword(auth, userEmail, userPassword);

    setIsOpenSignUpModal(false);
  };

  return (
    <Modal visible={isOpenEditProfileModal} transparent animationType="fade">
      <Backdrop>
        <Dialog>
          <SignUpTitle>Sign Up</SignUpTitle>
          <InputWrapper>
            <ProfilePhoto onPress={onSelectImage}>
              <ProfilePhotoImg source={{ uri: response?.assets[0]?.uri }} />
            </ProfilePhoto>
            <InputTitle>ID</InputTitle>
            <SignUpInput
            // placeholder="이메일"
            // value={userEmail}
            // onChangeText={(text) => setUserEmail(text)}
            />
            <InputTitle>Password</InputTitle>
            <SignUpInput />
            <InputTitle>Password 확인</InputTitle>
            <SignUpInput />
          </InputWrapper>
          <Row style={{ justifyContent: "space-between" }}>
            <ModalBtn
              onPress={() => setIsOpenEditProfileModal(false)}
              title="Cancel"
            />
            <ModalBtn
              // onPress={onPressSignUp}
              title="Sign Up"
            />
          </Row>
        </Dialog>
      </Backdrop>
    </Modal>
  );
};

export default EditProfile;

const ProfilePhoto = styled.Pressable`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: lightgray;
`;

const ProfilePhotoImg = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  background-color: lightgray;
`;

const Hidden = styled.Text`
  display: none;
`;

const SignUpTitle = styled.Text`
  font-size: 25px;
  color: black;
`;

const SignUpInput = styled.TextInput`
  padding: 10px;
  /* background-color: white; */
  border-radius: 5px;
  /* border: 1px solid black; */
  border-color: black;
  border-bottom-width: 1px;
`;
const ModalBtn = styled.Button``;
const InputWrapper = styled.View`
  width: 100%;
`;

const Backdrop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Dialog = styled.KeyboardAvoidingView`
  background-color: white;
  width: 80%;
  height: 50%;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid black;
  align-items: center;
`;
const InputTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: gray;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const Row = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  bottom: 5px;
  position: absolute;
  margin-bottom: 10px;
`;
