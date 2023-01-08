import React from "react";
import { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { authService, dbService } from "../firebase";

const MyPage = () => {
  return (
    <View>
      <Text>mypage</Text>
    </View>
  );
};

export default MyPage;
