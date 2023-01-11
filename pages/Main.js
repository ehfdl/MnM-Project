import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
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
import { authService } from "../firebase";

export default function Main({ navigation: { navigate } }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  console.log(authService.currentUser);

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

  // 마감임박 공연 정렬
  // 데이터를 가져와서 이 함수 안에서 타이틀, 기간만 뽑고
  // 정렬해주기?
  //   const deadLineData =()=>{
  //     const data = deadLine();
  //     data.map()
  // }
  const deadLine = () => {
    const res = upcomingsData.culturalEventInfo.row.map((item) => {
      // DATE: "2023-02-19~2023-02-19"
      temp = item.DATE.split("~")[1];
      temp = temp.split("-"); //["2023", "03", "11"]
      temp = temp.join(""); //[20230311]
      // temp.parseInt();
      // temp.parseInt();
      console.log(typeof temp);
    });
    return res;
  };

  const isLoading = isLoadingNP || isLoadingTR || isLoadingUC;

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  return (
    <FlatList
      numColumns={2}
      refreshing={isRefreshing}
      onEndReachedThreshold={1}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
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
            ItemSeparatorComponent={<View style={{ width: 10 }} />}
          />
          <TouchableOpacity
            onPress={() => {
              deadLine();
            }}
          >
            <ListTitle>마감임박 공연</ListTitle>
          </TouchableOpacity>
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
      ItemSeparatorComponent={
        <View style={{ height: 15, flexDirection: "row" }} />
      }
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
