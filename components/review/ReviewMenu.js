import styled from "@emotion/native";

import { Modal, Text, Pressable } from "react-native";

import { authService, dbService } from "../../firebase";
import { MaterialIcons } from "@expo/vector-icons";

const ReviewMenu = ({
  isOpenMenuModal,
  setIsOpenMenuModal,
  onDelete,
  goToReviewEdit,
}) => {
  return (
    <Modal
      visible={isOpenMenuModal}
      transparent
      animationType="slide"
      presentationStyle={"overFullScreen"}
    >
      <Backdrop>
        <Dialog>
          <Row>
            <MenuTouchEdit title="edit" onPress={goToReviewEdit}>
              <ModalTitle>수정</ModalTitle>
            </MenuTouchEdit>
            <MenuTouchDelete title="delete" onPress={onDelete}>
              <ModalTitle>삭제</ModalTitle>
            </MenuTouchDelete>
          </Row>
          <MenuTouch title="out" onPress={() => setIsOpenMenuModal(false)}>
            <ModalTitle>나가기</ModalTitle>
          </MenuTouch>
        </Dialog>
      </Backdrop>
    </Modal>
  );
};

export default ReviewMenu;

const MenuTouch = styled.TouchableOpacity`
  width: 100%;
  height: 33%;
  /* background-color: black; */
  justify-content: center;
  align-items: center;
`;

const MenuTouchDelete = styled.TouchableOpacity`
  width: 40%;
  height: 50px;
  background-color: red;

  justify-content: center;
  border-color: gray;
  border-top-width: 1px;
  border-bottom-width: 1px;
  align-items: center;
`;

const MenuTouchEdit = styled.TouchableOpacity`
  width: 40%;
  height: 50px;
  background-color: green;

  justify-content: center;
  border-color: gray;
  border-top-width: 1px;
  border-bottom-width: 1px;
  align-items: center;
`;

const Backdrop = styled.View`
  flex: 1;
  /* background-color: rgba(0, 0, 0, 0.6); */
  justify-content: flex-end;
  align-items: center;
`;

const Dialog = styled.KeyboardAvoidingView`
  background-color: white;
  width: 100%;
  height: 30%;

  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
const ModalTitle = styled.Text`
  font-size: 19px;
  font-weight: 600;
  color: black;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  width: 80%;
  justify-content: space-between;

  border: 1px solid black;
`;
