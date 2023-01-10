import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  useColorScheme,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styled from "@emotion/native";
import { authService, dbService } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Vote from "../components/Vote";
import { useFocusEffect } from "@react-navigation/native";
import { GREEN_COLOR, YELLOW_COLOR } from "../../colors";
import { signOut } from "firebase/auth";
import { SCREEN_WIDTH } from "../utils";

const Container = styled.ScrollView`
  padding: 20px;
`;
const ReviewWrapper = styled.TouchableOpacity``;
const ContentsBox = styled.View`
  padding: 10px 30px;
`;
const SeparateLine = styled.View`
  width: ${SCREEN_WIDTH / 1.1 + "px"};
  height: 1px;
  background-color: lightgray;
  margin-top: 10px;
`;
const ListTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.color.listTitle};
`;
const Title = styled.Text`
  color: ${(props) => props.theme.title};
  font-size: 20px;
`;

const Contents = styled.Text`
  color: ${(props) => props.theme.title};
  font-size: 17px;
  margin-top: 5px;
  margin-left: 2px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
`;

const ReviewAt = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.title};
`;
const VSeperator = styled.View`
  height: 10px;
`;

export default function MyReview({
  navigation: { navigate, reset, setOptions },
}) {
  const isDark = useColorScheme() === "dark";
  const [reviews, setReviews] = useState([]);

  const goToReview = (theReview) => {
    navigate("Stack", {
      screen: "Review",
      params: { review: theReview, from: "My" },
    });
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
        // 비로그인 상태에서 마이페이지 접근 시 로그인화면으로 이동하고, 뒤로가기 시 무비탭
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
              name: "Stack",
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
              <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
                로그아웃
              </Text>
            </TouchableOpacity>
          );
        },
      });

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
    <FlatList
      contentContainerStyle={{ padding: 20 }}
      data={reviews}
      ItemSeparatorComponent={VSeperator}
      ListHeaderComponent={
        <ListTitle style={{ marginBottom: 20 }}>내가 쓴 글</ListTitle>
      }
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewWrapper onPress={() => goToReview(item)}>
          <ContentsBox>
            <Title numberOfLines={1}>{item.title}</Title>
            <Contents numberOfLines={1}>{item.contents}</Contents>
            <Row>
              <Vote vote_average={item.rating} />
              <ReviewAt>
                {new Date(item.createdAt).toLocaleDateString("kr")}
              </ReviewAt>
            </Row>
          </ContentsBox>
          <SeparateLine />
        </ReviewWrapper>
      )}
    />
  );
}
