import React from "react";
import styled from "@emotion/native";
import { SCREEN_WIDTH } from "../utils";
import Vote from "./Vote";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const CardItem = styled.TouchableOpacity`
  border-color: ${(props) => props.theme.color.title};
  border-width: 1px;
  border-radius: 15px;
  height: 100px;
  background-color: black;
  width: ${SCREEN_WIDTH / 1.1 + "px"};
`;
const AbovePart = styled.View`
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;

const ReviewTitle = styled.Text`
  color: ${(props) => props.theme.color.title};
  font-size: 18px;
  margin-top: 8px;
`;
const ReviewContents = styled.Text`
  color: ${(props) => props.theme.color.overview};
`;
const Nickname = styled.Text`
  color: ${(props) => props.theme.color.title};
  margin-top: 8px;
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const ReviewDate = styled.Text`
  color: ${(props) => props.theme.color.title};
`;

export default function ReviewCard({ review }) {
  const { navigate } = useNavigation();
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
          <ReviewDate>
            {new Date(review.createdAt).toLocaleDateString("kr")}
          </ReviewDate>
        </Row>
        <Row>
          <View>
            <ReviewTitle numberOfLines={1}>{review.title}</ReviewTitle>
            <ReviewContents numberOfLines={1}>{review.contents}</ReviewContents>
          </View>
          <Nickname>nickname</Nickname>
        </Row>
      </AbovePart>
    </CardItem>
  );
}
