import { useEffect } from "react";
import styled from "@emotion/native";
import { useColorScheme, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GREEN_COLOR, YELLOW_COLOR } from "../colors";
import { authService } from "../firebase";

export const Container = styled.ScrollView`
  padding: 30px;
`;
export const Row = styled.View`
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${(props) => props.theme.title};
`;
export const ShowDate = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.text};
  margin-left: 52px;
  align-self: center;
`;
export const Contents = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.text};
  margin-left: 70px;
  align-self: center;
`;

export default function Review({
  navigation,
  route: {
    params: { review, from },
  },
}) {
  const isDark = useColorScheme() === "dark";

  const onEdit = () => {
    navigation.navigate("ReviewEdit", { review, from });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerRight: () => {
        if (authService.currentUser) {
          return (
            <TouchableOpacity onPress={onEdit}>
              <AntDesign
                name="edit"
                size={24}
                color={isDark ? YELLOW_COLOR : GREEN_COLOR}
              />
            </TouchableOpacity>
          );
        }
      },
    });
  }, []);

  return (
    <Container>
      <Row>
        <SectionTitle>작성일</SectionTitle>
        <ShowDate>
          {new Date(review?.createdAt).toLocaleDateString("kr")}
        </ShowDate>
      </Row>
      <Row>
        <SectionTitle>별점</SectionTitle>
        <Contents>⭐️ {review?.rating} / 5</Contents>
      </Row>
      <Row>
        <SectionTitle>제목</SectionTitle>
        <Contents>{review?.title}</Contents>
      </Row>
      <Row>
        <SectionTitle>내용</SectionTitle>
        <Contents>{review?.contents}</Contents>
      </Row>
    </Container>
  );
}
