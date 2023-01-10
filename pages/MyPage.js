import styled from "@emotion/native";
import React, { useEffect, useState, useCallback } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import MyInfor from "../components/modal/MyInfor";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { authService, dbService } from "../firebase";
import { useFocusEffect } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import MyReview from "../components/review/MyReview";

const MyPage = ({ navigation: { navigate, reset, setOptions } }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [profile, setProfile] = useState([]);
  const [nickName, setNickName] = useState("");
  const [profileText, setProfileText] = useState("");

  const newProfile = {
    nickName,
    profileText,
    isEdit: false,
    createdAt: Date.now(),
  };

  const addProfile = async () => {
    if (nickName && profileText) {
      await addDoc(collection(dbService, "profile"), newProfile);
      setIsOpenModal(!isOpenModal);
      setNickName("");
      setProfileText("");
    } else {
      if (!nickName) {
        alert("닉네임을 입력해주세요.");
      } else if (!profileText) {
        alert("자기소개를 입력해주세요.");
      }
    }
  };
  const logout = () => {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공");
        navigate("Slide");
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "profile"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const newProfiles = snapshot.docs.map((doc) => {
        const newProfile = {
          id: doc.id,
          ...doc.data(),
        };
        return newProfile;
      });
      setProfile(newProfiles);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!authService.currentUser) {
        reset({
          index: 1,
          routes: [
            {
              name: "Tabs",
              params: {
                screen: "Slide",
              },
            },
            {
              name: "Stacks",
              params: {
                screen: "Login",
              },
            },
          ],
        });
        return;
      }

      setOptions({
        headerRight: () => {
          return (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={logout}>
              <Text>로그아웃</Text>
            </TouchableOpacity>
          );
        },
      });
    }, [])
  );

  const profileFirst = profile[0];

  return (
    <>
      <MypageTop>
        {/* <ImageWrapper
          source={{
            uri: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/200608/htm_20060824163946c000c010-001.JPG',
          }}
        /> */}
        <ProfileId>{profileFirst?.nickName ?? "닉네임없음"}</ProfileId>
        <ProfileText>
          {profileFirst?.profileText ?? "안녕하세요. 반갑습니다."}
        </ProfileText>
        <ProfileBTN
          onPress={() => {
            setIsOpenModal(true);
          }}
        >
          <BTNText>내 정보 수정</BTNText>
        </ProfileBTN>
      </MypageTop>

      <MyReview />

      <MyInfor
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        nickName={nickName}
        setNickName={setNickName}
        profileText={profileText}
        setProfileText={setProfileText}
        addProfile={addProfile}
      />
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
  margin: 24px 0 8px;
`;

const ProfileText = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
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
//
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
const ReviewTitle = styled.Text`
  font-weight: 600;
  font-size: 20px;
`;
const ReviewText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  margin: 16px 0;
`;
const ReviewDate = styled.Text`
  font-weight: 600;
  font-size: 16px;
  text-align: right;
`;
