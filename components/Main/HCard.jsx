import React from 'react';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import Detail from '../../pages/Detail';
import { useQuery } from 'react-query';
import { getEventList } from '../../api';
import { View } from 'react-native';

export default function HCard({ realtime, imgId }) {
  const { navigate } = useNavigation();

  return (
    <HWrapper>
      <UpcomingRow
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
        <UpcomingPoster source={{ uri: realtime.MAIN_IMG }} />
        <UpcomingColumn>
          <UpcomingTitle>{realtime.TITLE}</UpcomingTitle>
          <Release>~ {realtime.DATE.split('~')[1]}</Release>
        </UpcomingColumn>
      </UpcomingRow>
    </HWrapper>
  );
}
const HWrapper = styled.View`
  width: 50%;
  align-items: center;
`;
const UpcomingRow = styled.TouchableOpacity`
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;
const UpcomingPoster = styled.Image`
  width: 95%;
  height: 200px;
  background-color: grey;
  border-radius: 5px;
`;

const UpcomingOverview = styled.Text`
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.pointText};
`;

const UpcomingColumn = styled.View``;

const Release = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.theme.pointTextGray};
  /* margin: 10px 0; */
`;

const UpcomingTitle = styled.Text`
  font-family: 'twayair';
  font-size: 18px;
  letter-spacing: -1.3px;
  font-weight: 600;
  padding: 15px 20px 8px 0;
  color: ${(props) => props.theme.pointText};
`;

const UpcomingView = styled.View``;
