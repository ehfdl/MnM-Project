import React, { useState } from 'react';
import { Modal, Text, TextInput } from 'react-native';
import styled from '@emotion/native';
// import { addDoc, collection } from 'firebase/firestore';
// import { authService, dbService } from '../firebase';

const myInfor = ({ isOpenModal, setIsOpenModal }) => {
  const [nickName, setNickName] = useState('');
  const [profileText, setProfileText] = useState('');

  const addProfile = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <Modal visible={isOpenModal} transparent animationType="slide">
      <Backdrop>
        <Dialog>
          <InforWrap>
            <UserInfor>
              <InputText>프로필</InputText>
              <UserName
                textContentType="text"
                value={nickName}
                placeholder="닉네임을 적어주세요."
                onChangeText={(text) => setNickName(text)}
              />
              <UserName
                textContentType="text"
                value={profileText}
                placeholder="자기소개를 적어주세요."
                onChangeText={(text) => setProfileText(text)}
              />
              <Text>{nickName}</Text>
              <Text>{profileText}</Text>
            </UserInfor>
          </InforWrap>
          <BTNWarp>
            <ModalBTN>
              <BTNText style={{ color: '#fff' }}>취소</BTNText>
            </ModalBTN>
            <ModalBTN onPress={addProfile}>
              <BTNText style={{ color: '#fff' }}>확인</BTNText>
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

const Dialog = styled.View`
  background-color: #fff;
  width: 90%;
  height: 70%;
  border-radius: 20px;
  padding: 40px 20px;
  justify-content: center;
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

const InputText = styled.Text`
  padding: 8px 0;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 600;
`;

const UserName = styled.TextInput`
  width: 100%;
  font-size: 16px;
  border-radius: 0em;
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
  background-color: blue;
  padding: 16px;
  border-radius: 4px;
`;

const BTNText = styled.Text`
  text-align: center;
  font-size: 16px;
`;
