import styled from '@emotion/native';
import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import MyInfor from '../components/modal/MyInfor';

const MyPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <MypageTop>
        <ImageWrapper
          source={{
            uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/200608/htm_20060824163946c000c010-001.JPG',
          }}
        />
        <ProfileId>아이디아이디</ProfileId>
        <ProfileText>
          자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개
        </ProfileText>
        <ProfileBTN
          onPress={() => {
            setIsOpenModal(true);
          }}
        >
          <BTNText>내 정보 수정</BTNText>
        </ProfileBTN>
      </MypageTop>

      <MyReviewWrap>
        <Title>내가 쓴 리뷰</Title>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
        >
          <ReviewItem>
            <ReveiwTitle>리뷰제목</ReveiwTitle>
            <ReveiwText>
              리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용
              리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용
            </ReveiwText>
            <ReveiwDate>2023.01.06</ReveiwDate>
          </ReviewItem>

          <ReviewItem>
            <ReveiwTitle>리뷰제목</ReveiwTitle>
            <ReveiwText>
              리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용
            </ReveiwText>
            <ReveiwDate>2023.01.06</ReveiwDate>
          </ReviewItem>

          <ReviewItem>
            <ReveiwTitle>리뷰제목</ReveiwTitle>
            <ReveiwText>
              리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용
              리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용
            </ReveiwText>
            <ReveiwDate>2023.01.06</ReveiwDate>
          </ReviewItem>
        </ScrollView>
      </MyReviewWrap>

      <MyInfor isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </>
  );
};

export default MyPage;

//Title
const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

// 프로필
const MypageTop = styled.View`
  padding: 40px 20px;
  background-color: #f2f4f5;
  align-items: center;
`;

const ImageWrapper = styled.Image`
  width: 100px;
  height: 100px;
  background: red;
  border-radius: 100%;
`;

const ProfileId = styled.Text`
  font-weight: 600;
  font-size: 24px;
  margin: 24px 0;
`;

const ProfileText = styled.Text`
  font-size: 16px;
  margin-bottom: 16px;
`;

const ProfileBTN = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #e50015;
  padding: 8px 16px;
  border-radius: 4px;
`;

const BTNText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
`;

// 내가쓴 리뷰
// const ScrollView = styled.ScrollView`
//   align-items: center;
// `;
const MyReviewWrap = styled.View`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  flex: 1;
  padding: 40px 16px;
`;

const ReviewItem = styled.TouchableOpacity`
  width: 300px;
  /* height: 80px; */
  background-color: rgba(255, 255, 255, 0.3);
  border: 3px solid #ddd;
  border-radius: 16px;
  /* flex: 0.3; */
  justify-content: space-between;
  height: 200px;
  padding: 24px 16px;
  margin-right: 16px;
`;
const ReveiwTitle = styled.Text`
  font-weight: 600;
  font-size: 20px;
`;
const ReveiwText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  margin: 16px 0;
`;
const ReveiwDate = styled.Text`
  font-weight: 600;
  font-size: 16px;
  text-align: right;
`;
