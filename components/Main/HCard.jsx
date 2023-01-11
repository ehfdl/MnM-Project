import React from "react";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import Detail from "../../pages/Detail";
import { useQuery } from "react-query";
import { getEventList } from "../../api";
import { View } from "react-native";

export default function HCard({ realtime }) {
  const { navigate } = useNavigation();

  return (
    <View>
      <UpcomingRow
        onPress={() =>
          navigate("Stacks", {
            screen: "Detail",
            params: {
              // itemId: imgId(item.MAIN_IMG),
              main_img: realtime.MAIN_IMG,
              codename: realtime.CODENAME,
              title: realtime.TITLE,
              date: realtime.DATE,
              target: realtime.USE_TRGT,
              target_fee: realtime.USE_FEE,
              place: realtime.PLACE,
              link: realtime.ORG_LINK,
              program: realtime.PROGRAM,
            },
          })
        }
      >
        <UpcomingPoster source={{ uri: realtime.MAIN_IMG }} />
        <UpcomingColumn>
          <UpcomingTitle>{realtime.TITLE}</UpcomingTitle>
          <Release>{realtime.DATE}</Release>
          <UpcomingOverview>{realtime.USE_FEE}</UpcomingOverview>
          <UpcomingOverview>{realtime.PLACE}</UpcomingOverview>
          <UpcomingOverview>{realtime.USE_TRGT}</UpcomingOverview>
        </UpcomingColumn>
      </UpcomingRow>
    </View>
  );
}
const UpcomingRow = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 20px;
  /* margin-bottom: 20px; */
`;
const UpcomingPoster = styled.Image`
  width: 100px;
  height: 200px;
  background-color: grey;
  border-radius: 5px;
`;
const UpcomingTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.upcomingText};
`;

const UpcomingOverview = styled.Text`
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.upcomingText};
`;

const UpcomingColumn = styled.View`
  margin-left: 20px;
  width: 60%;
`;

const Release = styled.Text`
  font-size: 16px;
  font-weight: 300;
  color: ${(props) => props.theme.upcomingText};
  margin-top: 10px;
  margin-bottom: 10px;
`;

const UpcomingView = styled.View``;
