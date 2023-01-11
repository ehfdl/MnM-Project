import React from 'react';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export default function VCard({ realtime, imgId }) {
  const { navigate } = useNavigation();
  return (
    <VWrapper
      onPress={() =>
        navigate('Stacks', {
          screen: 'Detail',
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
      <TRPoster source={{ uri: realtime.MAIN_IMG }} />
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={['transparent', 'rgba(0,0,0,.9)']}
      />
      <TRColumn>
        {/* <Rating>{realtime.DATE}</Rating> */}
        <TRText> {realtime.USE_FEE.length > 11 && '...'}</TRText>
        <TRText>{realtime.THEMECODE}</TRText>
        <TRTitle>
          {/* {realtime.USE_FEE.slice(0, 11)} */}
          {realtime.TITLE}
        </TRTitle>
      </TRColumn>
    </VWrapper>
  );
}

const VWrapper = styled.TouchableOpacity`
  /* background-color: black; */
  border-radius: 5px;
  /* margin-right: 10px; */
  width: 300px;
  position: relative;
`;

const TRColumn = styled.View`
  padding: 5px;
  position: absolute;
  left: 10px;
  bottom: 20px;
`;
const TRPoster = styled.Image`
  width: 100%;
  height: 300px;
  background-color: grey;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;
const TRTitle = styled.Text`
  font-weight: 600;
  color: white;
  font-size: 18px;
  margin-top: 8px;
`;
const TRText = styled.Text`
  font-weight: 600;
  color: white;
`;
const Rating = styled.Text`
  color: white;
  margin-top: 5px;
  margin-bottom: 5px;
`;
