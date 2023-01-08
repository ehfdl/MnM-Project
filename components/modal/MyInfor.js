import React from 'react';
import { Modal, Text, TextInput } from 'react-native';
import styled from '@emotion/native';
import { SCREEN_HEIGHT } from '../../util';

const myInfor = ({ isOpenModal, setIsOpenModal }) => {
  return (
    <Modal visible={isOpenModal} transparent animationType="slide">
      <Backdrop>
        <Dialog>
          <InforWrap>
            <UserInfor>
              <InputText>프로필</InputText>
              <UserName type="file" placeholder="아이디" />
              <UserName type="text" placeholder="프로필" />
            </UserInfor>
          </InforWrap>
          <BTNWarp>
            <ModalBTN onPress={() => setIsOpenModal(!isOpenModal)}>
              <BTNText style={{ color: '#fff' }}>취소</BTNText>
            </ModalBTN>
            <ModalBTN onPress={() => setIsOpenModal(!isOpenModal)}>
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
  justify-content: flex-end;
  align-items: center;
`;

const Dialog = styled.View`
  background-color: #fff;
  width: 100%;
  height: 35%;
  border-radius: 20px;
  padding: 40px 20px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InforWrap = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
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
