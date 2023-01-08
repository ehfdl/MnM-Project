import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  ScrollView,
} from "react-native";
import styled from "@emotion/native";
import Swiper from "react-native-swiper";

export default function Main() {
  const title = "Main";
  const rating = 5;
  const overview = "overview";
  const BASE_URL = "http://openapi.seoul.go.kr:8088";
  const API_KEY = "474c4d4954716f613635754d717646";
  const getCulturalEventInfo = async () => {
    const response = await fetch(
      `${BASE_URL}${API_KEY}/json/culturalEventInfo/1/100/`
    );
  };

  return (
    <ScrollView>
      <MainView>
        <Swiper
          style={{ height: 200 }}
          autoplay={true}
          autoplay
          showsPagination={false}
          loop
        >
          <View style={{ flex: 1, backgroundColor: "black" }}></View>
          <View style={{ flex: 1, backgroundColor: "red" }}></View>
          <View style={{ flex: 1, backgroundColor: "blue" }}></View>
        </Swiper>
      </MainView>
    </ScrollView>
  );
}

const MainView = styled.View`
  flex: 1;
  background-color: #fff;
`;
