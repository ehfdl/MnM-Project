import React, { useEffect, useState } from "react";
import { FlatList, Linking, StyleSheet, useColorScheme } from "react-native";
import styled from "@emotion/native";
import { getImgPath, SCREEN_WIDTH } from "../utils";
import { SCREEN_HEIGHT } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { getDetail } from "../api";
import Loader from "../components/Loader";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { authService, dbService } from "../firebase";
import ReviewCard from "../components/ReviewCard";
import ReviewModal from "../components/ReviewModal";

export default function Detail({
  navigation: { navigate },
  route: {
    params: {
      /* movieId */
    },
  },
}) {
  const [reviews, setReviews] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // const isDark = useColorScheme() === "dark";

  const handleAdding = async () => {
    const isLogin = !!authService.currentUser;
    if (!isLogin) {
      navigate("Login");
      return;
    }
    setIsOpenModal(true);
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "reviews"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newReviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(newReviews);
    });
    return unsubscribe;
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <SectionTitle>Reviews</SectionTitle>
      <AddReview onPress={handleAdding}>
        <TempText>리뷰 추가</TempText>
      </AddReview>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          marginBottom: 50,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        keyExtractor={(item) => item.id}
        data={reviews}
        ItemSeparatorComponent={HSeprator}
        // renderItem={({ item }) => {
        //   if (item.movieId === movieId) {
        //     return <ReviewCard review={item} />;
        //   }
        // }}
      />
      <ReviewModal
        // movieId={movieId}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </Container>
  );
}
