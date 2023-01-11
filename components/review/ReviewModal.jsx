import { useState } from "react";
import styled from "@emotion/native";
import { addDoc, collection } from "firebase/firestore";
import { Modal, Text } from "react-native";
import { Rating } from "react-native-ratings";
import { authService, dbService } from "../../firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

export default function ReviewModal({ isOpenModal, setIsOpenModal, itemId }) {
  const isDark = useColorScheme() === "dark";

  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [ratings, setRatings] = useState(0);
  const getRatings = (rating) => {
    setRatings(rating);
  };
  const addReview = async () => {
    await addDoc(collection(dbService, "reviews"), {
      title: modalTitle,
      contents: modalContent,
      createdAt: Date.now(),
      rating: ratings,
      userId: authService.currentUser?.uid,
      userNickName: authService.currentUser?.displayName,
      itemId,
    });
    setIsOpenModal(false);
    setModalTitle("");
    setModalContent("");
    setRatings(0);
  };
  return (
    <Modal visible={isOpenModal} transparent animationType="slide">
      <Backdrop>
        <Dialog>
          <InputWrapper>
            <CancelBtn onPress={() => setIsOpenModal(false)}>
              <MaterialIcons name="cancel" size={24} color="#e50015" />
            </CancelBtn>
            <ModalTitle>별점</ModalTitle>
            <Rating
              startingValue={0}
              style={{
                alignItems: "flex-start",
              }}
              onFinishRating={getRatings}
              ratingCount={5}
              imageSize={20}
              tintColor={isDark ? "#202124" : null}
            />
            <ModalTitle>제목</ModalTitle>
            <TitleInput
              value={modalTitle}
              onChangeText={(text) => setModalTitle(text)}
            />
            <ModalTitle>내용</ModalTitle>
            <ContentInput
              textAlignVertical="top"
              value={modalContent}
              onChangeText={(text) => setModalContent(text)}
              multiline
              maxLength={300}
            />
          </InputWrapper>
          <RegisterBtn
            disabled={!ratings || !modalTitle || !modalContent}
            onPress={addReview}
            activeOpacity={0.8}
          >
            <RegisterText>등록하기</RegisterText>
          </RegisterBtn>
        </Dialog>
      </Backdrop>
    </Modal>
  );
}

const TitleInput = styled.TextInput`
  padding: 10px;
  background-color: #fffcfd;
  border-color: ${(props) => props.theme.text};
  border-width: 0.5px;
  border-radius: 10px;
`;
const ContentInput = styled(TitleInput)`
  min-height: 100px;
`;
const RegisterBtn = styled.TouchableOpacity`
  border-radius: 50px;
  width: 100%;
  height: 50px;
  background-color: #e50015;
  justify-content: center;
  align-items: center;
`;
const RegisterText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;
const CancelBtn = styled.TouchableOpacity`
  align-items: flex-end;
`;
const InputWrapper = styled.View``;

const Backdrop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Dialog = styled.KeyboardAvoidingView`
  background-color: ${(props) => props.theme.modalBack};
  width: 80%;
  height: 500px;
  padding: 20px;
  justify-content: space-between;
  border-radius: 20px;
  border-color: ${(props) => props.theme.text};
  border-width: 1px;
`;
const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
  margin-top: 10px;
`;
