import { useState, useCallback } from "react";
import { useColorScheme, FlatList } from "react-native";
import styled from "@emotion/native";
import { authService, dbService } from "../../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Vote from "./Vote";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function MyReview({ review }) {
  const isDark = useColorScheme() === "dark";
  const [reviews, setReviews] = useState([]);

  const { navigate } = useNavigation();
  const goToReview = () => {
    navigate("Review", {
      review,
      from: "MyPage",
    });
  };
  useFocusEffect(
    useCallback(() => {
      const q = query(
        collection(dbService, "reviews"),
        orderBy("createdAt", "desc"),
        where("userId", "==", authService.currentUser?.uid)
      );
      const unsubcribe = onSnapshot(q, (snapshot) => {
        const newReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(newReviews);
      });
      return unsubcribe;
    }, [])
  );

  return (
    // <FlatList
    //   contentContainerStyle={{ padding: 20 }}
    //   data={reviews}
    //   ItemSeparatorComponent={VSeperator}
    //   ListHeaderComponent={
    //     <ListTitle style={{ marginBottom: 20 }}>내가 쓴 글</ListTitle>
    //   }
    //   keyExtractor={(item) => item.id}
    //   renderItem={({ item }) => (
    //     <ReviewWrapper onPress={() => goToReview(item)}>
    //       <ContentsBox>
    //         <Title numberOfLines={1}>{item.title}</Title>
    //         <Contents numberOfLines={1}>{item.contents}</Contents>
    //         <Row>
    //           <Vote vote_average={item.rating} />
    //           <ReviewAt>
    //             {new Date(item.createdAt).toLocaleDateString("kr")}
    //           </ReviewAt>
    //         </Row>
    //       </ContentsBox>
    //       <SeparateLine />
    //     </ReviewWrapper>
    // />

    <FlatList
      horizontal
      contentContainerStyle={{ paddingHorizontal: 20 }}
      showsHorizontalScrollIndicator={false}
      data={reviews}
      // ListHeaderComponent={}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MyReviewWrap onPress={() => goToReview(item)}>
          <ReviewItem>
            <ReviewTitle numberOfLines={1}>{item.title}</ReviewTitle>
            <ReviewText numberOfLines={1}>{item.contents}</ReviewText>
            <Vote vote_average={item.rating} />
            <ReviewDate>
              {new Date(item.createdAt).toLocaleDateString("kr")}
            </ReviewDate>
          </ReviewItem>
        </MyReviewWrap>
      )}
    />
  );
}

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
