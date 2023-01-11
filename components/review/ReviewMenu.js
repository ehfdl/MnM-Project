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
      animationType="fade"
      presentationStyle={"overFullScreen"}
    >
      <Backdrop>
        <Dialog>
          <MenuView>
            <MenuTouchEdit title="edit" onPress={goToReviewEdit}>
              <ModalTitle title="edit">수정</ModalTitle>
            </MenuTouchEdit>
            <MenuTouchDelete title="delete" onPress={onDelete}>
              <ModalTitle title="delete">삭제</ModalTitle>
            </MenuTouchDelete>
            <MenuTouch title="out" onPress={() => setIsOpenMenuModal(false)}>
              <ModalTitle title="out">나가기</ModalTitle>
            </MenuTouch>
          </MenuView>
        </Dialog>
      </Backdrop>
    </Modal>
  );
};

export default ReviewMenu;

const MenuTouch = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: white;

  justify-content: center;

  border-radius: 10px;
  align-items: center;
`;

const MenuTouchDelete = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const MenuTouchEdit = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #eee;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
`;

const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: flex-end;
  align-items: center;
`;

const Dialog = styled.KeyboardAvoidingView`
  background-color: transparent;
  width: 100%;
  height: 30%;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
const ModalTitle = styled.Text`
  font-size: 17px;
  color: ${(props) =>
    props.title === "edit"
      ? "blue"
      : props.title === "delete"
      ? "red"
      : "black"};
`;

const MenuView = styled.View`
  width: 90%;
  height: 67%;
  justify-content: space-between;
`;
