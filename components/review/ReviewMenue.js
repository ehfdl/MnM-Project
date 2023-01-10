import styled from "@emotion/native";

import { Modal, Text } from "react-native";

import { authService, dbService } from "../../firebase";
import { MaterialIcons } from "@expo/vector-icons";

const ReviewMenue = ({ isOpenMenuModal, setIsOpenMenuModal }) => {
  return (
    <Modal
      visible={isOpenMenuModal}
      transparent
      animationType="fade"
      presentationStyle={"overFullScreen"}
    >
      <Backdrop onPress={() => setIsOpenMenuModal(false)}>
        <Dialog>
          <InputWrapper>
            <CancelBtn onPress={() => setIsOpenMenuModal(false)}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </CancelBtn>
            <ModalTitle>별점</ModalTitle>

            <ModalTitle>제목</ModalTitle>

            <ModalTitle>내용</ModalTitle>
          </InputWrapper>
        </Dialog>
      </Backdrop>
    </Modal>
  );
};

export default ReviewMenue;

const CancelBtn = styled.TouchableOpacity`
  align-items: flex-end;
`;
const InputWrapper = styled.View``;

const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`;
const Dialog = styled.KeyboardAvoidingView`
  background-color: black;
  width: 80%;
  height: 70%;
  padding: 20px;
  justify-content: space-between;
  border-radius: 20px;
`;
const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;
  margin-top: 10px;
`;
