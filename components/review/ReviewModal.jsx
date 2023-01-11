import { useState } from "react";
import styled from "@emotion/native";
import { addDoc, collection } from "firebase/firestore";
import { Modal, Text } from "react-native";
import { Rating } from "react-native-ratings";
import { authService, dbService } from "../../firebase";
import { MaterialIcons } from "@expo/vector-icons";

const TitleInput = styled.TextInput`
  padding: 10px;
  background-color: #fffcfd;
  border-radius: 10px;
`;
const ContentInput = styled(TitleInput)`
  min-height: 100px;
`;
const RegisterBtn = styled.TouchableOpacity`
  border-radius: 50px;
  width: 100%;
  height: 50px;
  background-color: red;
  justify-content: center;
  align-items: center;
`;
const CancelBtn = styled.TouchableOpacity`
  align-items: flex-end;
`;
const InputWrapper = styled.View``;

const Backdrop = styled.View`
  flex: 1;
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

export default function ReviewModal({ isOpenModal, setIsOpenModal, itemId }) {
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
              <MaterialIcons name="cancel" size={24} color="red" />
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
              tintColor="black"
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
            <Text>등록하기</Text>
          </RegisterBtn>
        </Dialog>
      </Backdrop>
    </Modal>
  );
}
