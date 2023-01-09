import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import Loader from "../components/Loader";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { authService, dbService } from "../firebase";
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
