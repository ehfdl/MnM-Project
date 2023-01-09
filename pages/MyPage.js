import React from "react";
import { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import styled from "@emotion/native";
import EditProfile from "../components/EditProfile";

const MyPage = () => {
  const [isOpenEditProfileModal, setIsOpenEditProfileModal] = useState(false);

  const MypageEditHandler = () => {
    setIsOpenEditProfileModal(true);
  };

  return (
    <View>
      <DText onPress={MypageEditHandler}>mypage</DText>
      <EditProfile
        isOpenEditProfileModal={isOpenEditProfileModal}
        setIsOpenEditProfileModal={setIsOpenEditProfileModal}
      />
    </View>
  );
};

export default MyPage;

const DText = styled.Text`
  color: ${(props) => props.theme.text};
`;
