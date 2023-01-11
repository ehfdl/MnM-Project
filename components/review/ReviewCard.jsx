import React from "react";
import styled from "@emotion/native";
import { authService } from "../../firebase";
import { Fontisto } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "../../util";
import Vote from "./Vote";
import { useState } from "react";
import { View } from "react-native";
import ReviewMenu from "./ReviewMenu";

export default function ReviewCard({ review, from }) {
  const [isOpenMenuModal, setIsOpenMenuModal] = useState(false);

  const openMenuHandler = () => {
    setIsOpenMenuModal(true);
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
            <MenuBtn onPress={openMenuHandler} title="︙">
              <Fontisto name="more-v-a" size={14} color="gray" />
            </MenuBtn>
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
        reviewId={review.id}
        review={review}
      />
    </CardItem>
  );
}

const CardItem = styled.View`
  border-color: lightgray;
  border-bottom-width: 1px;
  min-height: 100px;
  width: ${SCREEN_WIDTH / 1.05 + "px"};
  margin-bottom: 10px;
`;

const MenuBtn = styled.TouchableOpacity`
  color: gray;
  width: 40px;
  height: 30px;
  align-items: center;
`;

const AbovePart = styled.View`
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
`;

const ReviewTitle = styled.Text`
  color: ${(props) => props.theme.text};
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
