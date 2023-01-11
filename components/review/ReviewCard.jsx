import React from "react";
import styled from "@emotion/native";
import { authService } from "../../firebase";

import { SCREEN_WIDTH } from "../../util";
import Vote from "./Vote";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, View, Text, Alert } from "react-native";
import ReviewMenu from "./ReviewMenu";
import { useMutation } from "react-query";
import { deleteReview } from "../../api";
import Loader from "./Loader";

export default function ReviewCard({ review }) {
  const { navigate } = useNavigation();
  const [isOpenMenuModal, setIsOpenMenuModal] = useState(false);

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

  const openMenuHandler = () => {
    setIsOpenMenuModal(true);
  };

  const onDelete = async () => {
    Alert.alert("리뷰 삭제", "리뷰를 삭제하시겠습니까?", [
      { text: "취소", style: "destructive" },
      {
        text: "삭제",
        onPress: async () => {
          try {
            await removeReview(review.id);
          } catch (err) {
            console.log("err:", err);
          }
        },
      },
    ]);
  };

  if (isLoadingDeleting) {
    return <Loader />;
  }

  const goToReviewEdit = () => {
    navigate("ReviewEdit", { review });
    setIsOpenMenuModal(false);
  };

  return (
    <CardItem>
      <AbovePart>
        <Rowbtw>
          <View>
            <Row>
              <Vote vote_average={review.rating} />
              <RatingText>{review.rating}</RatingText>
            </Row>
            <Row>
              <Nickname>{review.userNickName}</Nickname>

              <ReviewDate>
                {new Date(review.createdAt)
                  .toLocaleDateString("kr")
                  .slice(2, 11)}
              </ReviewDate>
            </Row>
          </View>
          {authService.currentUser?.uid === review.userId ? (
            <Button onPress={openMenuHandler} title="︙" color="gray" />
          ) : null}
        </Rowbtw>
        <Row>
          <View>
            <ReviewTitle numberOfLines={1}>{review.title}</ReviewTitle>
            <ReviewContents>{review.contents}</ReviewContents>
          </View>
        </Row>
      </AbovePart>
      <ReviewMenu
        setIsOpenMenuModal={setIsOpenMenuModal}
        isOpenMenuModal={isOpenMenuModal}
        onDelete={onDelete}
        goToReviewEdit={goToReviewEdit}
      />
    </CardItem>
  );
}

const CardItem = styled.TouchableOpacity`
  border-color: lightgray;
  border-bottom-width: 1px;
  min-height: 100px;
  width: ${SCREEN_WIDTH / 1.05 + "px"};
  margin-bottom: 10px;
`;
const AbovePart = styled.View`
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
`;

const ReviewTitle = styled.Text`
  color: ${(props) => props.theme.title};
  font-size: 17px;
  padding-left: 5px;
  padding-right: 5px;

  margin-bottom: 10px;
`;
const ReviewContents = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;

  margin-bottom: 5px;
`;
const Nickname = styled.Text`
  color: ${(props) => props.theme.text};
  color: gray;
  font-size: 13px;
  margin-top: 1px;
`;
const Row = styled.View`
  flex-direction: row;
`;
const Rowbtw = styled.View`
  width: ${SCREEN_WIDTH / 1.1 + "px"};

  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const ReviewDate = styled.Text`
  color: ${(props) => props.theme.text};
  margin-left: 5px;
  color: gray;
  font-size: 13px;
`;

const RatingText = styled.Text`
  margin-left: 5px;
`;
