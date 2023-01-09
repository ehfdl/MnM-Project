
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import styled from "@emotion/native";
import Swiper from "react-native-swiper";
import MainImg from "../component/MainImg";

export default function Movies({ navigation: { navigate } }) {
  const [nowPlayings, setNowPlayings] = useState([]);
  const [topRateds, setTopRateds] = useState([]);
  const [upcomings, setUpcomings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const API_KEY = "474c4d4954716f613635754d717646";
  const BASE_URL = "http://openapi.seoul.go.kr:8088";

  const getNowPlaying = async () => {
    const { row } = await fetch(
      `${BASE_URL}/${API_KEY}/json/culturalEventInfo/1/30/`
    ).then((res) => res.json());
    setNowPlayings(row);
  };
  // const getTopRated = async () => {
  //   const { results } = await fetch(
  //     `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  //   ).then((res) => res.json());
  //   setTopRateds(results);
  // };
  // const getUpcoming = async () => {
  //   const { results } = await fetch(
  //     `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  //   ).then((res) => res.json());
  //   setUpcomings(results);
  // };

  const getData = async () => {
    await Promise.all([getNowPlaying(), getTopRated(), getUpcoming()]);
    setIsLoading(false);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);

  // if (isLoading) {
  //   return (
  //     <Loader>
  //       <ActivityIndicator />
  //     </Loader>
  //   );
  // }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <ListTitle>실시간</ListTitle>
          <Swiper height="100%" showsPagination={false} autoplay loop>
            {nowPlayings.row.map((movie) => (
              <MainImg key={movie.id} movie={movie} />
            ))}
          </Swiper>
          <ListTitle>Top Rated Movies</ListTitle>
          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            data={topRateds}
            // renderItem={({ item }) => <VCard movie={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={<View style={{ width: 10 }} />}
          />
          <ListTitle>Upcoming Movies</ListTitle>
        </>
      }
      data={upcomings}
      // renderItem={({ item }) => <HCard movie={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={{ height: 15 }} />}
    />

  );
};

export default Main;


const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.title};

`;
