import React from "react";
import { StyleSheet, View } from "react-native";
import { SCREEN_HEIGHT } from "../../util";
import styled from "@emotion/native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function Slide({ realtime, imgId }) {
  const { navigate } = useNavigation();

  return (
    <SwiperChildView>
      <BackgroundImg
        style={StyleSheet.absoluteFill}
        source={{
          uri: realtime.MAIN_IMG,
        }}
      />
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["transparent", "black"]}
      />
      <Row
        onPress={() =>
          navigate("Stacks", {
            screen: "Detail",
            params: {
              itemId: imgId(realtime.MAIN_IMG),
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
        <Poster
          source={{
            uri: realtime.MAIN_IMG,
          }}
        />
        <Column>
          <Title>{realtime.TITLE}</Title>
          <Rating>{realtime.DATE}</Rating>
        </Column>
      </Row>
    </SwiperChildView>
  );
}
const SwiperChildView = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  height: ${SCREEN_HEIGHT / 2 + "px"};
  background-color: green;
`;

const BackgroundImg = styled.Image`
  height: 100%;
  width: 100%;
`;

const Row = styled.TouchableOpacity`
  flex: 1;
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
`;

const Column = styled.View`
  width: 68%;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Poster = styled.Image`
  width: 200px;
  height: 280px;
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
`;

const Title = styled.Text`
  font-family: "twayair";
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-top: 20px;
  letter-spacing: -0.5px;
  text-align: center;
`;

const Rating = styled.Text`
  color: white;
  margin-top: 10px;
  /* margin-bottom: 5px; */
  text-align: center;
`;
