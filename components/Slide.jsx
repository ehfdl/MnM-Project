import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getEventList } from "../api";
import { ActivityIndicator } from "react-native";

const Slide = () => {
  // 네비게이션 to Detail
  const { navigate } = useNavigation();

  const { data: getEventListData, isLoading: isLoadingGel } = useQuery(
    "getEventList",
    getEventList
  );

  console.log(getEventListData);

  const isLoading = isLoadingGel;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClinet.refetchQueries(["movie"]);
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  // 키값으로 이것을 넘겨주면 어떨지
  const imgId = (id) => {
    id = id.split("atchFileId=");
    id = id[1].split("&");
    // console.log("id", id[0]);
    return id[0];
  };

  return (
    <ScrollView>
      {getEventListData.culturalEventInfo.row?.map((item) => (
        <TouchableOpacity
          key={imgId(item.MAIN_IMG)}
          onPress={() =>
            navigate("Stacks", {
              screen: "Detail",
              params: {
                // itemId: imgId(item.MAIN_IMG),
                main_img: item.MAIN_IMG,
                codename: item.CODENAME,
                title: item.TITLE,
                date: item.DATE,
                target: item.USE_TRGT,
                target_fee: item.USE_FEE,
                place: item.PLACE,
                link: item.ORG_LINK,
                program: item.PROGRAM,
              },
            })
          }
        >
          <View style={{ flexDirection: "column" }}>
            <ImgSt source={{ uri: item.MAIN_IMG }}></ImgSt>
            <Title>{item.TITLE}</Title>
            <Rating>🏢{item.PLACE}</Rating>
            <Overview>
              {item.PROGRAM.slice(0, 150)}
              {item.PROGRAM.length > 150 && "..."}
            </Overview>
          </View>
        </TouchableOpacity>

        // </DescSt>
      ))}
    </ScrollView>
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
  color: black;
`;
// 개요
const Overview = styled.Text`
  /* color: ${(props) => props.theme.upcomingText}; */
  font-size: 12px;
  color: black;
`;
// 별점
const Rating = styled.Text`
  color: black;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export default Slide;