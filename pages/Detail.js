import React, { useEffect, useState, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { SCREEN_WIDTH } from "../util";
import ReviewModal from "../components/review/ReviewModal";
import { FlatList } from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { authService, dbService } from "../firebase";
import ReviewCard from "../components/review/ReviewCard";
import Info from "../components/detail/Info";
import ImgDetail from "../components/detail/ImgDetail";
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

// route에 params넘겨주기
const Detail = ({
  navigation: { navigate },
  route: {
    params: {
      main_img,
      title,
      codename,
      target,
      target_fee,
      place,
      link,
      date,
      program,
      itemId,
    },
  },
}) => {
  const [reviews, setReviews] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isFocused = useIsFocused();

  const handleAdding = async () => {
    const isLogin = !!authService.currentUser;
    if (!isLogin) {
      navigate("Login");
      return;
    }
    setIsOpenModal(true);
  };

  useFocusEffect(
    useCallback(() => {
      const q = query(
        collection(dbService, "reviews"),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(newReviews);
      });
      return unsubscribe;
    }, [authService.currentUser?.uid])
  );

  return (
    <FlatList
      ListHeaderComponent={
        <Container>
          <ImgDetail main_img={main_img}></ImgDetail>
          <Info
            title={title}
            codename={codename}
            target={target}
            target_fee={target_fee}
            place={place}
            link={link}
            date={date}
            program={program}
          ></Info>
          {/* 공연리뷰 전까지 */}
          <Section>
            <RowReview>
              <InfoLabel>
                <InfoLabelText>공연리뷰</InfoLabelText>
              </InfoLabel>
              <TouchableOpacity
                style={{ justifyContent: "center" }}
                onPress={handleAdding}
              >
                <ReviewAddText>리뷰쓰기</ReviewAddText>
              </TouchableOpacity>
            </RowReview>
            <BrView />
            <ReviewModal
              itemId={itemId}
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
            />
          </Section>
        </Container>
      }
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        marginBottom: 50,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      keyExtractor={(item) => item.id}
      data={reviews}
      ItemSeparatorComponent={HSeprator}
      renderItem={({ item }) => {
        if (item.itemId === itemId) {
          return <ReviewCard review={item} from={"Detail"} />;
        }
      }}
    />
  );
};

const HSeprator = styled.View`
  width: 10px;
`;
const BrView = styled.View`
  width: 100%;
  height: 1px;
  border-color: lightgray;
  border-bottom-width: 1px;
`;

const Container = styled.View`
  width: ${SCREEN_WIDTH + "px"};
  justify-content: center;
`;

const InfoLabel = styled.View`
  width: 80px;
  margin-bottom: 10px;
  justify-content: center;
`;
const InfoLabelText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

const ReviewAddText = styled.Text`
  color: ${(props) => props.theme.text};
  margin-bottom: 12px;
`;

// 상세설명 섹션
const Section = styled.View`
  margin: 10px 20px;
`;
// 공연리뷰 섹션
const RowReview = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-right: 15px;
`;

export default Detail;
