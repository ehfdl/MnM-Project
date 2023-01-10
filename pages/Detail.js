import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";
import ReviewModal from "../components/review/ReviewModal";
import { FlatList } from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { authService, dbService } from "../firebase";
import ReviewCard from "../components/review/ReviewCard";
import Loader from "../components/review/Loader";
import { useQuery } from "react-query";

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
  //
  const [reviews, setReviews] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  /* getDetail =
export const getDetail = ({ queryKey }) => {
  const [_, movieId] = queryKey;
  return fetch(
    `${BASE_URL}/${movieId}?api_key=${API_KEY}&append_to_response=videos`
  ).then((res) => res.json());
}; */
  const { data, isLoading } = useQuery(["program", itemId], getDetail);

  // const isDark = useColorScheme() === "dark";

  const handleAdding = async () => {
    const isLogin = !!authService.currentUser;
    if (!isLogin) {
      navigate("Login");
      return;
    }
    setIsOpenModal(true);
  };

  useEffect(() => {
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
  }, []);
  if (isLoading) {
    return <Loader />;
  }

  // 홈페이지 연결
  const openURL = async (url) => {
    const res_url = `${url}`;
    await Linking.openURL(res_url);
  };
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <ImgDT source={{ uri: main_img }} />

          <RowTitleSection>
            <EVTitle>{title}</EVTitle>
            <EVCategory>{codename}</EVCategory>
          </RowTitleSection>
          <Column>
            <Row>
              <InfoLabel>날짜</InfoLabel>
              <InfoText>{date}</InfoText>
            </Row>
            <Row>
              <InfoLabel>장소</InfoLabel>
              <InfoText>{place}</InfoText>
            </Row>
            <Row>
              <InfoLabel>이용대상</InfoLabel>
              <InfoText>{target}</InfoText>
            </Row>
            <Row>
              <InfoLabel>이용금액</InfoLabel>
              <InfoText>{target_fee}</InfoText>
            </Row>
          </Column>
          <Section>
            <InfoLabel>상세설명</InfoLabel>
            <Overview>
              {program.slice(0, 300)}
              {program.length > 300 && "..."}
              {program.length == 0 && "없음"}
            </Overview>
            <InfoLabel>홈페이지 주소</InfoLabel>
            <TouchableOpacity onPress={() => openURL(link)}>
              <Text>{link}</Text>
            </TouchableOpacity>
          </Section>
          {/* 공연리뷰 전까지 */}
          <Section>
            <RowReview>
              <InfoLabel>공연리뷰</InfoLabel>
              <TouchableOpacity onPress={handleAdding}>
                <Text>리뷰쓰기</Text>
              </TouchableOpacity>
            </RowReview>

            <ReviewModal
              itemId={itemId}
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
            />
          </Section>
        </>
      }
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        marginBottom: 50,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      keyExtractor={(item) => item.id}
      data={reviews}
      ItemSeparatorComponent={HSeprator}
      renderItem={({ item }) => {
        if (item.itemId === itemId) {
          return <ReviewCard review={item} />;
        }
      }}
    />
  );
};

const HSeprator = styled.View`
  width: 10px;
`;

const Container = styled.View`
  /* height: ${SCREEN_HEIGHT + "px"}; */
  flex: 1;
  justify-content: flex-start;
`;

const ImgDT = styled.Image`
  width: 100%;
  height: ${SCREEN_HEIGHT / 4 + "px"};
`;
const RowTitleSection = styled.View`
  flex-direction: row;
  margin: 15px;
  justify-content: space-between;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 15px;
`;
const Column = styled.View`
  flex-direction: column;
  align-content: center;
`;

const InfoLabel = styled.Text`
  font-weight: bold;
  font-size: 16px;
  width: 100px;
  /* margin-right: 30px; */
  margin-bottom: 10px;
`;

const InfoText = styled.Text`
  font-weight: bold;

  font-size: 16px;
  margin-bottom: 10px;
`;

// 상세설명 텍스트
const Overview = styled.Text`
  word-break: keep-all;
  margin-bottom: 15px;
`;
// 행사 타이틀
const EVTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
// 행사 카테고리 텍스트 ex)연극
const EVCategory = styled.Text`
  font-size: 16px;
  font-weight: bold;
  /* position: absolute;
  top: 15px;
  right: 15px; */
`;
// 상세설명 섹션
const Section = styled.View`
  margin-left: 15px;
  margin-top: 10px;
`;
// 공연리뷰 섹션
const RowReview = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-right: 15px;
  margin-top: 20px;
`;

export default Detail;
