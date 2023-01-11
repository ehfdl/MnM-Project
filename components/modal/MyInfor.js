import React, { useState } from "react";
import { Modal, Text, TextInput } from "react-native";
import styled from "@emotion/native";

const myInfor = ({
  isOpenModal,
  setIsOpenModal,
  nickName,
  profileText,
  setNickName,
  setProfileText,
  addProfile,
}) => {
  return (
    <Modal visible={isOpenModal} transparent animationType="slide">
      <Backdrop>
        <Dialog>
          <InforWrap>
            <UserInfor>
              <InputTile>프로필</InputTile>
              <InputText>닉네임</InputText>
              <UserName
                textContentType="text"
                value={nickName}
                placeholder="닉네임을 적어주세요."
                onChangeText={(text) => setNickName(text)}
              />
              <InputText>자기소개</InputText>
              <UserName
                textContentType="text"
                value={profileText}
                placeholder="자기소개를 적어주세요."
                onChangeText={(text) => setProfileText(text)}
              />
            </UserInfor>
          </InforWrap>
          <BTNWarp>
            <ModalBTN
              onPress={() => {
                setIsOpenModal(!isOpenModal);
              }}
              title={"cancel"}
            >
              <BTNText title={"cancel"}>취소</BTNText>
            </ModalBTN>
            <ModalBTN onPress={addProfile} disabled={!nickName || !profileText}>
              <BTNText disabled={!nickName || !profileText}>확인</BTNText>
            </ModalBTN>
          </BTNWarp>
        </Dialog>
      </Backdrop>
    </Modal>
  );
};

export default myInfor;

const Backdrop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Dialog = styled.KeyboardAvoidingView`
  background-color: white;
  width: 80%;
  height: 40%;
  padding: 20px;
  border-radius: 5px;
  align-items: center;
`;
const InforWrap = styled.View`
  flex: 1;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 16px;
`;

const UserInfor = styled.View`
  width: 100%;
  margin-bottom: 16px;
  justify-content: space-between;
  align-items: flex-start;
`;

const InputTile = styled.Text`
  padding: 8px 0;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 600;
`;

const InputText = styled.Text`
  padding: 8px 0;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 600;
`;

const UserName = styled.TextInput`
  width: 100%;
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
`;

//버튼
const BTNWarp = styled.View`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: row;
`;
const ModalBTN = styled.TouchableOpacity`
  flex: 0.4;
  background-color: ${(props) =>
    props.disabled
      ? "background: rgba(229, 0, 21, .5)"
      : props.theme.pointColor && props.title == "cancel"
      ? "#4A4A4A"
      : props.theme.pointColor};
  padding: 12px;
  border-radius: 4px;
`;

const BTNText = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${(props) =>
    props.disabled
      ? props.theme.pointTextWhite
      : props.theme.pointColor && props.title == "cancel"
      ? props.theme.pointTextWhite
      : props.theme.pointText};
`;
