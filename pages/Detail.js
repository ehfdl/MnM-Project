import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import styled from "@emotion/native";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../util";
import { TabActions } from "@react-navigation/native";

import ReviewModal from "../components/review/ReviewModal";
import { FlatList } from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { authService, dbService } from "../firebase";
import ReviewCard from "../components/review/ReviewCard";
import Loader from "../components/review/Loader";
import { useQuery } from "react-query";
import { getEventList } from "../api";

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
      // isLoading,
    },
  },
}) => {
  //
  const [reviews, setReviews] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // const getDetail = ({ queryKey }) => {
  //   const [_, movieId] = queryKey;
  //   return fetch(
  //     `${BASE_URL}/${movieId}?api_key=${API_KEY}&append_to_response=videos`
  //   ).then((res) => res.json());
  // };
  // const { data, isLoading } = useQuery(["program", itemId], getEventList);

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

  // if (isLoading) {
  //   return <Loader />;
  // }

  // 홈페이지 연결
  const openURL = async (url) => {
    const res_url = `${url}`;
    await Linking.openURL(res_url);
  };
  return (
    <FlatList
      ListHeaderComponent={
        <>
          {/* <Container> */}
          <ImgDT source={{ uri: main_img }} />
          <RowTitleSection>
            <EVTitle>
              <EVTitleText>{title}</EVTitleText>
            </EVTitle>
            <EVCategory>
              <EVCategoryText>{codename}</EVCategoryText>
            </EVCategory>
          </RowTitleSection>
          <Column>
            <Row>
              <InfoLabel>
                <InfoLabelText>날짜</InfoLabelText>
              </InfoLabel>
              <InfoBox>
                <InfoBoxText>{date}</InfoBoxText>
              </InfoBox>
            </Row>
            <Row>
              <InfoLabel>
                <InfoLabelText>장소</InfoLabelText>
              </InfoLabel>

              <InfoBox>
                <InfoBoxText>{place}</InfoBoxText>
              </InfoBox>
            </Row>
            <Row>
              <InfoLabel>
                <InfoLabelText>이용대상</InfoLabelText>
              </InfoLabel>
              <InfoBox>
                <InfoBoxText>{target}</InfoBoxText>
              </InfoBox>
            </Row>
            <Row>
              <InfoLabel>
                <InfoLabelText>이용금액</InfoLabelText>
              </InfoLabel>
              <InfoBox>
                <InfoBoxText>
                  {target_fee}
                  {target_fee.length === 0 && "무료"}
                </InfoBoxText>
              </InfoBox>
            </Row>
          </Column>
          <Section>
            <InfoLabel>
              <InfoLabelText>상세설명</InfoLabelText>
            </InfoLabel>
            <Overview>
              {program.slice(0, 300)}
              {program.length > 300 && "..."}
              {program.length == 0 && "없음"}
            </Overview>
            <InfoLabel>
              <InfoLabelText>홈페이지</InfoLabelText>
            </InfoLabel>
            <TouchableOpacity onPress={() => openURL(link)}>
              <Text>웹사이트로 이동</Text>
            </TouchableOpacity>
          </Section>
          {/* 공연리뷰 전까지 */}
          <Section>
            <RowReview>
              <InfoLabel>
                <InfoLabelText>공연리뷰</InfoLabelText>
              </InfoLabel>
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
          {/* </Container> */}
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
  height: ${SCREEN_HEIGHT + "px"};
  flex: 1;
  justify-content: flex-start;
`;

const ImgDT = styled.Image`
  /* background-color: "#f7f1e3"; */
  width: 100%;
  height: ${SCREEN_HEIGHT / 4 + "px"};
`;
const RowTitleSection = styled.View`
  flex-direction: row;
  margin: 15px;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Row = styled.View`
  width: ${SCREEN_WIDTH + "px"};
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
`;
const Column = styled.View`
  width: 90%;
  flex-direction: column;
  align-content: center;
  margin-left: 15px;
`;

const InfoLabel = styled.View`
  width: 80px;
  margin-bottom: 10px;
`;
const InfoLabelText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
const InfoBox = styled.View`
  margin-right: 15px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  flex-direction: row;
  /* 부모컨테이너를 벗어날 시 줄바꿈 */
`;
const InfoBoxText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  flex-wrap: wrap;
  padding: 0 10px;
`;

// 상세설명 텍스트
const Overview = styled.Text`
  word-break: keep-all;
  margin-bottom: 15px;
`;
// 행사 타이틀
const EVTitle = styled.View`
  /* align-items: center; */
`;
const EVTitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
// 행사 카테고리 텍스트 ex)연극
const EVCategory = styled.View`
  justify-content: center;
  flex-wrap: wrap;
  /* position: absolute;
  top: 15px;
  right: 10px; */
`;
const EVCategoryText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  flex-wrap: wrap;
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
