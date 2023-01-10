import React from "react";
import styled from "@emotion/native";
import { SCREEN_WIDTH } from "../../util";
import Vote from "./Vote";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";
import ReviewMenue from "./ReviewMenue";

export default function ReviewCard({ review }) {
  const { navigate } = useNavigation();
  const [isOpenMenuModal, setIsOpenMenuModal] = useState(false);

  const openMenuHandler = () => {
    setIsOpenMenuModal(true);
  };

  const goToReview = () => {
    navigate("Review", {
      review,
      from: "Detail",
    });
  };

  return (
    <CardItem onPress={goToReview}>
      <AbovePart>
        <Row>
          <Vote vote_average={review.rating} />
          <Row>
            <ReviewDate>
              {new Date(review.createdAt).toLocaleDateString("kr")}
            </ReviewDate>
            <Button onPress={openMenuHandler} title="︙" />
          </Row>
        </Row>
        <Row>
          <View>
            <ReviewTitle numberOfLines={1}>{review.title}</ReviewTitle>
            <ReviewContents numberOfLines={1}>{review.contents}</ReviewContents>
          </View>
          <Nickname>nickname</Nickname>
        </Row>
      </AbovePart>
      <ReviewMenue
        setIsOpenMenuModal={setIsOpenMenuModal}
        isOpenMenuModal={isOpenMenuModal}
      />
    </CardItem>
  );
}

const CardItem = styled.TouchableOpacity`
  border-color: ${(props) => props.theme.title};
  border-width: 1px;
  height: 100px;
  width: ${SCREEN_WIDTH / 1.2 + "px"};
  margin-bottom: 10px;
`;
const AbovePart = styled.View`
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;

const ReviewTitle = styled.Text`
  color: ${(props) => props.theme.title};
  font-size: 18px;
  padding-left: 15px;
`;
const ReviewContents = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 15px;
  padding-left: 15px;
`;
const Nickname = styled.Text`
  color: ${(props) => props.theme.text};
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const ReviewDate = styled.Text`
  color: ${(props) => props.theme.text};
`;
