import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  View,
} from "react-native";
import styled from "@emotion/native";
import Loader from "../components/review/Loader";
import Swiper from "react-native-swiper";
import Slide from "../components/Main/Slide";
import VCard from "../components/Main/VCard";
import HCard from "../components/Main/HCard";
import { useQuery, useQueryClient } from "react-query";
import { getNowPlaying, getTopRated, getUpcoming } from "../api";

export default function Main({ navigation: { navigate } }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const { data: nowPlayingsData, isLoading: isLoadingNP } = useQuery(
    ["Mains", "nowPlayings"],
    getNowPlaying
  );
  const { data: topRatedsData, isLoading: isLoadingTR } = useQuery(
    ["Mains", "topRateds"],
    getTopRated
  );
  const { data: upcomingsData, isLoading: isLoadingUC } = useQuery(
    ["Mains", "upcomings"],
    getUpcoming
  );

  const onRefresh = async () => {
    setIsRefreshing(true);
    // await Promise.all([refetchNP(), refetchTR(), refetchUC()]);
    await queryClient.refetchQueries(["Mains"]);
    setIsRefreshing(false);
  };

  // 키값으로 이것을 넘겨주면 어떨지
  const imgId = (id) => {
    id = id.split("atchFileId=");
    id = id[1].split("&");
    return id[0];
  };

  const isLoading = isLoadingNP || isLoadingTR || isLoadingUC;

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  const Scroll = () => {
    Alert.alert("Scroll");
  };

  return (
    <FlatList
      refreshing={isRefreshing}
      onEndReachedThreshold={1}
      onEndReached={Scroll}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <ListTitle>실시간</ListTitle>
          <Swiper height="100%" showsPagination={false} autoplay loop>
            {nowPlayingsData.culturalEventInfo.row.map((realtime) => (
              <Slide
                key={imgId(realtime.MAIN_IMG)}
                realtime={realtime}
                navigate={navigate}
                imgId={imgId}
              />
            ))}
          </Swiper>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Toggle>
              <ListTitle onPress={() => navigate("Stacks", {})}>무료</ListTitle>
            </Toggle>
            <Toggle>
              <ListTitle>연극</ListTitle>
            </Toggle>
            <Toggle>
              <ListTitle>뮤지컬/오페라</ListTitle>
            </Toggle>
            <Toggle>
              <ListTitle>국악</ListTitle>
            </Toggle>
            <Toggle>
              <ListTitle>문화교양/강좌</ListTitle>
            </Toggle>
            <Toggle>
              <ListTitle>클래식</ListTitle>
            </Toggle>
            <Toggle>
              <ListTitle>축제-전통/역사</ListTitle>
            </Toggle>
            <Toggle>
              <ListTitle>무용</ListTitle>
            </Toggle>
            <Toggle>
              <ListTitle>콘서트</ListTitle>
            </Toggle>
            <Toggle>
              <ListTitle>전시/미술</ListTitle>
            </Toggle>
            <Toggle>
              <ListTitle>기타</ListTitle>
            </Toggle>
          </ScrollView>

          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            data={topRatedsData.culturalEventInfo.row}
            renderItem={({ item }) => (
              <VCard
                realtime={item}
                key={imgId(item.MAIN_IMG)}
                navigate={navigate}
                imgId={imgId}
              />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={<View style={{ width: 10 }} />}
          />
          <ListTitle>이름</ListTitle>
        </>
      }
      data={upcomingsData.culturalEventInfo.row}
      renderItem={({ item }) => (
        <HCard
          realtime={item}
          key={imgId(item.MAIN_IMG)}
          navigate={navigate}
          imgId={imgId}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={{ height: 15 }} />}
    />
  );
}

// const Loader = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;

const ListTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.title};
`;

const Toggle = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
  & > * {
    font-size: 16px;
    font-weight: 500;
    color: ${(props) => props.theme.title};
  }
`;
const ToggleBar = styled.View`
  flex-direction: row;
`;

// Path: components\Main\Slide.js
