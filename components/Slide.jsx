import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import Detail from "./Detail";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";

const Slide = ({ navigation: { navigate } }) => {
  const [eventList, setEventList] = useState([]);
  const BASE_URL = "http://openapi.seoul.go.kr:8088";
  const API_KEY = "446b6b7968676d6c35307165706969";

  const getEventList = async () => {
    const { culturalEventInfo } = await fetch(
      `${BASE_URL}/${API_KEY}/json/culturalEventInfo/1/30/`
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));
    // console.log("데이터", culturalEventInfo);
    const { row } = culturalEventInfo;
    console.log("row", row);
    setEventList(row);

    // setEventList(JSON.parse(response));
  };
  useEffect(() => {
    getEventList();
  }, []);

  return (
    <View>
      {eventList.map((item) => (
        <DescSt key={item.MAIN_IMG}>
          <BgImgSt
            source={{
              uri: item.MAIN_IMG,
            }}
            style={StyleSheet.absoluteFill}
          />

          <Row>
            <Column>
              <View style={{ flexDirection: "column" }}>
                <Title>{item.TITLE}</Title>
                <Rating>⭐️{item.PLACE}</Rating>
                <Overview>
                  {item.PROGRAM.slice(0, 150)}
                  {item.PROGRAM.length > 150 && "..."}
                </Overview>
              </View>
            </Column>
          </Row>
        </DescSt>
      ))}
    </View>
  );
};

const ImgSt = styled.Image`
  width: 100px;
  height: 145px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const DescSt = styled.View`
  /* background-color: blue; */
  /* align-items: center; */
  /* width: 100%; */
  height: ${SCREEN_HEIGHT / 3 + "px"};
  flex: 1;
  justify-content: flex-end;
  background-color: green;
`;
// 디테일 컬럼
const Column = styled.View`
  width: 65%;
  margin-left: 10px;
  margin-bottom: 10px;
`;
// 포스터와 컬럼을 감싸는 TouchableOpacity
const Row = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
`;

// 배경
const BgImgSt = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

// 타이틀 폰트
const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: white;
`;
// 개요
const Overview = styled.Text`
  /* color: ${(props) => props.theme.upcomingText}; */
  font-size: 12px;
  color: white;
`;
// 별점
const Rating = styled.Text`
  color: white;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export default Slide;
