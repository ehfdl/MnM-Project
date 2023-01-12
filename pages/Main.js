import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import styled from '@emotion/native';
import Loader from '../components/review/Loader';
import Swiper from 'react-native-swiper';
import Slide from '../components/Main/Slide';
import VCard from '../components/Main/VCard';
import HCard from '../components/Main/HCard';
import { useQuery, useQueryClient } from 'react-query';
import { getNowPlaying, getTopRated, getUpcoming } from '../api';
import { authService } from '../firebase';
} from "react-native";
import styled from "@emotion/native";
import Loader from "../components/review/Loader";
import Swiper from "react-native-swiper";
import Slide from "../components/Main/Slide";
import VCard from "../components/Main/VCard";
import HCard from "../components/Main/HCard";
import { useQuery, useQueryClient } from "react-query";
import { getEventList } from "../api";


export default function Main({ navigation: { navigate } }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cate, setCate] = useState('연극');
  const queryClient = useQueryClient();


  const { data: nowPlayingsData, isLoading: isLoadingNP } = useQuery(
    ['Mains', 'nowPlayings'],
    getNowPlaying
  );
  const { data: topRatedsData, isLoading: isLoadingTR } = useQuery(
    ['Mains', 'topRateds'],
    getTopRated
  );
  const { data: upcomingsData, isLoading: isLoadingUC } = useQuery(
    ['Mains', 'upcomings'],
    getUpcoming
  );

  const onRefresh = async () => {
    setIsRefreshing(true);
    // await Promise.all([refetchNP(), refetchTR(), refetchUC()]);
    await queryClient.refetchQueries(['Mains']);
    setIsRefreshing(false);
  };

  const onPressCate = (category) => {
    setCate(category);
  };

  // 키값으로 이것을 넘겨주면 어떨지
  const imgId = (id) => {
    id = id.split('atchFileId=');
    id = id[1].split('&');
    return id[0];
  };

  // 마감임박 공연 정렬
  // 데이터를 가져와서 이 함수 안에서 타이틀, 기간만 뽑고
  // 정렬해주기?
  //   const deadLineData =()=>{
  //     const data = deadLine();
  //     data.map()
  // }
  const isLoading = isLoadingNP || isLoadingTR || isLoadingUC;

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  const sorting = () => {
    // 정답은 필터 ㄴㄴ, 맵 ㅇㅇ
    // const temp = data.map((item) => {
    //   return item.END_DATE;
    // });
    const new_data = [...upcomingsData.culturalEventInfo.row].sort((a, b) => {
      return new Date(a.END_DATE) - new Date(b.END_DATE);
    });
    return new_data;
  };

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
            <Toggle onPress={() => onPressCate("연극")}>
              <ListTitle title="연극" cate={cate}>
                연극
              </ListTitle>
            </Toggle>
            <Toggle onPress={() => onPressCate("뮤지컬/오페라")}>
              <ListTitle title="뮤지컬/오페라" cate={cate}>
                뮤지컬/오페라
              </ListTitle>
            </Toggle>
            <Toggle onPress={() => onPressCate("국악")}>
              <ListTitle title="국악" cate={cate}>
                국악
              </ListTitle>
            </Toggle>
            <Toggle onPress={() => onPressCate("클래식")}>
              <ListTitle title="클래식" cate={cate}>
                클래식
              </ListTitle>
            </Toggle>
            <Toggle onPress={() => onPressCate("축제-전통/역사")}>
              <ListTitle title="축제-전통/역사" cate={cate}>
                축제-전통/역사
              </ListTitle>
            </Toggle>
            <Toggle onPress={() => onPressCate("무용")}>
              <ListTitle title="무용" cate={cate}>
                무용
              </ListTitle>
            </Toggle>
            <Toggle onPress={() => onPressCate("콘서트")}>
              <ListTitle title="콘서트" cate={cate}>
                콘서트
              </ListTitle>
            </Toggle>
            <Toggle onPress={() => onPressCate("전시/미술")}>
              <ListTitle title="전시/미술" cate={cate}>
                전시/미술
              </ListTitle>
            </Toggle>
            <Toggle onPress={() => onPressCate("기타")}>
              <ListTitle title="기타" cate={cate}>
                기타
              </ListTitle>
            </Toggle>
          </ScrollView>

          <FlatList
            horizontal
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            showsHorizontalScrollIndicator={false}
            data={topRatedsData.culturalEventInfo.row}
            renderItem={({ item }) =>
              item.CODENAME === cate ? (
                <VCard
                  realtime={item}
                  key={imgId(item.MAIN_IMG)}
                  navigate={navigate}
                  imgId={imgId}
                />
              ) : // <HiddenView></HiddenView>
              null
            }
          />

          <ListTitle>마감임박 공연</ListTitle>
        </>
      }
      data={sorting()}
      renderItem={({ item }) => (
        <HCard
          realtime={item}
          key={imgId(item.MAIN_IMG)}
          navigate={navigate}
          imgId={imgId}
        />
      )}
      ItemSeparatorComponent={
        <View style={{ height: 15, flexDirection: 'row' }} />
      }
    />
  );
}

const ListTitle = styled.Text`
  font-family: 'twayair';
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 20px;

  font-weight: 500;
  color: ${(props) =>
    props.cate === props.title ? "#e50015" : props.theme.text};
  text-align: center;
  animation: fadeIn 1s ease-in-out;
`;

const Toggle = styled.TouchableOpacity`
  justify-content: center;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: gray;
  border-radius: 10px;

  & > * {
    font-size: 16px;
    font-weight: 500;
    color: ${(props) => props.theme.pointText};
  }
`;
