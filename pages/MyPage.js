import styled from "@emotion/native";
import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
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
import { signOut, updateProfile } from "firebase/auth";
import MyReview from "../components/review/MyReview";

const MyPage = ({ navigation: { navigate, reset, setOptions } }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [profile, setProfile] = useState([]);
  const [nickName, setNickName] = useState("");
  const [profileText, setProfileText] = useState("");

  const newProfile = {
    nickName,
    profileText,
    userId: authService.currentUser?.uid,
    createdAt: Date.now(),
  };

  const addProfile = async () => {
    if (nickName && profileText) {
      await addDoc(collection(dbService, "profile"), newProfile);
      await updateProfile(authService.currentUser, {
        displayName: nickName ? nickName : null,
      });
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
        navigate("Main");
      })
      .catch((err) => alert(err));
  };

  useFocusEffect(
    useCallback(() => {
      if (!authService.currentUser) {
        reset({
          index: 1,
          routes: [
            {
              name: "Tabs",
              params: {
                screen: "Main",
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
              <HeaderRightText>로그아웃</HeaderRightText>
            </TouchableOpacity>
          );
        },
      });

      const q = query(
        collection(dbService, "profile"),
        orderBy("createdAt", "desc"),
        where("userId", "==", authService.currentUser?.uid)
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
    }, [])
  );
  const profileFirst = profile[0];

  return (
    <>
      <MypageTop>
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

      {authService.currentUser ? <MyReview /> : null}

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

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.title}; ;
`;
//Title
const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

// 프로필
const MypageTop = styled.View`
  padding: 40px 20px;
  align-items: center;
  position: relative;
`;

const ProfileId = styled.Text`
  font-weight: 600;
  font-size: 24px;
  margin: 24px 0 8px;
  color: ${(props) => props.theme.text};
`;

const ProfileText = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color: ${(props) => props.theme.text};
`;

const ProfileBTN = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: ${(props) => props.theme.pointColor};
  padding: 8px 16px;
  border-radius: 4px;
`;

const BTNText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
`;

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
