import React from "react";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";

export default function VCard({ realtime }) {
  const { navigate } = useNavigation();
  return (
    <VWrapper
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
      <TRPoster source={{ uri: realtime.MAIN_IMG }} />
      <TRColumn>
        <Rating>{realtime.DATE}</Rating>
        <TRTitle>
          {realtime.USE_FEE.slice(0, 11)}
          {realtime.USE_FEE.length > 11 && "..."}
        </TRTitle>
        <TRTitle>{realtime.THEMECODE}</TRTitle>
      </TRColumn>
    </VWrapper>
  );
}

const VWrapper = styled.TouchableOpacity`
  background-color: black;
  border-radius: 5px;
  /* margin-right: 10px; */
`;

const TRColumn = styled.View`
  padding: 5px;
`;
const TRPoster = styled.Image`
  width: 100%;
  height: 200px;
  background-color: grey;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;
const TRTitle = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: white;
`;
const Rating = styled.Text`
  color: white;
  margin-top: 5px;
  margin-bottom: 5px;
`;
