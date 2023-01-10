import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import styled from "@emotion/native";
import Loader from "../components/review/Loader";
import Swiper from "react-native-swiper";
import MainImg from "../components/MainImg";
import { useQuery } from "react-query";
import { getEventList } from "../api";
import { useNavigation } from "@react-navigation/native";

const Main = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { navigate } = useNavigation();

  const { data: getEventListData, isLoading: isLoadingGel } = useQuery(
    "getEventList",
    getEventList
  );

  const isLoading = isLoadingGel;

  const onRefresh = async () => {
    setIsRefreshing(true);
    await queryClinet.refetchQueries(["movie"]);
    setIsRefreshing(false);
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
    <FlatList
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <ListTitle>실시간</ListTitle>
          <Swiper height="100%" showsPagination={false} autoplay loop>
            {getEventListData.culturalEventInfo.row?.map((movie) => (
              <MainImg key={movie.id} movie={movie} />
            ))}
          </Swiper>
          <ListTitle>Top Rated Movies</ListTitle>
          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            // data={topRateds}
            // renderItem={({ item }) => <VCard movie={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={<View style={{ width: 10 }} />}
          />
          <ListTitle>Upcoming Movies</ListTitle>
        </>
      }
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={{ height: 15 }} />}
    />
  );
};

export default Main;

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
