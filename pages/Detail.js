import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useQuery } from "react-query";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";
import { TabActions } from "@react-navigation/native";
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
    },
  },
}) => {
  const [datail, setDatail] = useState([]);
  const BASE_URL = "http://openapi.seoul.go.kr:8088";
  const API_KEY = "446b6b7968676d6c35307165706969";

  // const getDetail = async () => {
  //   const { culturalEventInfo } = await fetch(
  //     `${BASE_URL}/${API_KEY}/json/culturalEventInfo/1/30/`
  //   )
  //     .then((res) => res.json())
  //     .catch((error) => console.log(error));
  //   const { row } = culturalEventInfo;
  //   console.log("row", row);
  //   setDatail(row);
  // };

  // useEffect(() => {
  //   getDetail();
  // }, []);

  // 홈페이지 연결
  const openURL = async (url) => {
    const res_url = `${url}`;
    await Linking.openURL(res_url);
  };
  return (
    <ScrollView>
      <>
        <ImgDT source={{ uri: main_img }} />
        <Container>
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
              <TouchableOpacity>
                <Text>리뷰쓰기</Text>
              </TouchableOpacity>
            </RowReview>
            <View
              style={{ backgroundColor: "red", width: "90%", height: 200 }}
            ></View>
          </Section>
        </Container>
      </>
    </ScrollView>
  );
};

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
