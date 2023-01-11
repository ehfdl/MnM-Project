import { useState, useEffect } from "react";
import styled from "@emotion/native";
import { Rating } from "react-native-ratings";
import { useColorScheme } from "react-native";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { deleteReview, editReview } from "../api";
import Loader from "../components/review/Loader";

const Container = styled.ScrollView`
  padding: 20px;
`;
const TitleEdit = styled.TextInput`
  width: 100%;
  /* background-color: white; */
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 10px;
  border-color: ${(props) => props.theme.text};
  border-width: 1px;
  color: ${(props) => props.theme.text};
`;
const ContentEdit = styled(TitleEdit)`
  min-height: 150px;
  margin-bottom: 50px;
`;

const SectionTitle = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: ${(props) => props.theme.text};
  margin-bottom: 15px;
`;

const EditButton = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.disabled ? "rgba(229, 0, 21, 0.5)" : "#e50015"};
  border-radius: 30px;
  margin-bottom: 20px;
`;

const BtnTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 500;
`;

export default function ReviewEdit({
  navigation,
  route: {
    params: { review, from },
  },
}) {
  const isDark = useColorScheme() === "dark";
  const [ratings, setRatings] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newContents, setNewContents] = useState("");

  const { isLoading: isLoadingDeleting, mutate: removeReview } = useMutation(
    ["deleteReview", review.id],
    (body) => deleteReview(body),
    {
      onSuccess: () => {
        console.log("삭제성공");
      },
      onError: (err) => {
        console.log("err in delete:", err);
      },
    }
  );

  const { isLoading: isLoadingEditing, mutate: reviseReview } = useMutation(
    ["editReview", review.id],
    (body) => editReview(body),
    {
      onSuccess: () => {
        console.log("수정성공");
      },
      onError: (err) => {
        console.log("err in edit:", err);
      },
    }
  );

  const onEditDone = () => {
    if (!ratings && !newTitle && !newContents) {
      // 입력값 3개 중 아무것도 입력없으면 그대로 원상복구
      alert("수정한 부분이 없습니다.");
      return;
    }

    // 입력값이 3개 중 하나라도 있으면 해당값만 patch할 수 있도록 객체 구성
    let editingObj = {};
    if (ratings) {
      Object.assign(editingObj, { rating: ratings });
    }
    if (newTitle) {
      Object.assign(editingObj, { title: newTitle });
    }
    if (newContents) {
      Object.assign(editingObj, { contents: newContents });
    }

    Alert.alert("리뷰 수정", "이대로 리뷰를 수정하시겠습니까?", [
      {
        text: "Cancel",
        style: "destructive",
      },
      {
        text: "OK. Edit it",
        onPress: async () => {
          try {
            // await updateDoc(doc(dbService, "reviews", review.id), editingObj);
            await reviseReview({ reviewId: review.id, editingObj });
            setNewContents("");
            setNewTitle("");
            setRatings(0);
            if (from === "Detail") {
              navigation.reset({
                index: 1,
                routes: [
                  {
                    name: "Detail",
                    params: {
                      itemId: review.itemId,
                    },
                  },
                  {
                    name: "Detail",
                    params: { review: { ...review, ...editingObj }, from },
                  },
                ],
              });
            } else if (from === "MyPage") {
              navigation.reset({
                routes: [
                  {
                    name: "Tabs",
                    params: { screen: "MyPage" },
                  },
                ],
              });
            }
          } catch (err) {
            console.log("err:", err);
          }
        },
      },
    ]);
  };
  const getRatings = (rating) => {
    setRatings(rating);
  };

  const onChangeTitle = (text) => {
    setNewTitle(text);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return null;
      },
    });
  }, []);

  if (isLoadingDeleting || isLoadingEditing) {
    return <Loader />;
  }

  return (
    <Container>
      <SectionTitle>별점</SectionTitle>

      <Rating
        startingValue={review.rating}
        style={{
          alignItems: "flex-start",
          marginBottom: 20,
        }}
        onFinishRating={getRatings}
        ratingCount={5}
        imageSize={20}
        tintColor={isDark ? "black" : "#f2f2f2"}
      />

      <SectionTitle>제목</SectionTitle>

      <TitleEdit
        value={newTitle}
        placeholderTextColor="#90969E"
        onChangeText={onChangeTitle}
        placeholder={review.title}
        maxLength={30}
      />

      <SectionTitle>내용</SectionTitle>

      <ContentEdit
        textAlignVertical="top"
        value={newContents}
        onChangeText={(text) => setNewContents(text)}
        multiline
        maxLength={300}
        placeholderTextColor="#90969E"
        placeholder={review.contents}
      />
      <EditButton
        disabled={!newContents && !newTitle && !ratings}
        onPress={onEditDone}
      >
        <BtnTitle disabled={!newContents && !newTitle && !ratings}>
          수정완료
        </BtnTitle>
      </EditButton>
    </Container>
  );
}
