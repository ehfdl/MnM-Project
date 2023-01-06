import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";
const Detail = () => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <ImgDT source={require("../assets/detail-img.png")} />

      <Container>
        <RowTitleSection>
          <EVTitle>용감한 탄티</EVTitle>
          <EVCategory>연극</EVCategory>
        </RowTitleSection>
        <Column>
          <Row>
            <InfoLabel>날짜</InfoLabel>
            <InfoText>2023.01.26-2023.12.26</InfoText>
          </Row>
          <Row>
            <InfoLabel>장소</InfoLabel>
            <InfoText>노원어린이극장</InfoText>
          </Row>
          <Row>
            <InfoLabel>이용대상</InfoLabel>
            <InfoText>5세 이상</InfoText>
          </Row>
          <Row>
            <InfoLabel>이용금액</InfoLabel>
            <InfoText>전석 20,000원</InfoText>
          </Row>
        </Column>
        <Section>
          <InfoLabel>상세설명</InfoLabel>
          <Overview>
            상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명
          </Overview>
          <InfoLabel>홈페이지 주소</InfoLabel>
          <TouchableOpacity>
            <Text>링크</Text>
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
