import { Linking, TouchableOpacity, View, Text } from "react-native";
import styled from "@emotion/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../util";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const Info = ({
  title,
  codename,
  target,
  target_fee,
  date,
  place,
  program,
  link,
}) => {
  // 홈페이지 연결
  const openURL = async (url) => {
    const res_url = `${url}`;
    await Linking.openURL(res_url);
  };
  return (
    <>
      <RowTitleSection>
        <EVCategory>
          <EVCategoryText>{codename}</EVCategoryText>
        </EVCategory>
        <EVTitle>
          <EVTitleText>{title}</EVTitleText>
        </EVTitle>
      </RowTitleSection>
      <Column>
        <RowTop>
          <InfoLabel>
            <InfoLabelText>
              <AntDesign name="calendar" size={24} color="black" title="날짜" />
            </InfoLabelText>
            <InfoBoxText>{date}</InfoBoxText>
          </InfoLabel>
          <InfoLabel>
            <InfoLabelText>
              <MaterialIcons
                name="place"
                size={24}
                color="black"
                title="위치"
              />
            </InfoLabelText>
            <InfoBoxText>{place}</InfoBoxText>
          </InfoLabel>

          <InfoLabel>
            <InfoLabelText>
              <FontAwesome5
                name="exclamation-circle"
                size={24}
                color="black"
                title="이용제한"
              />
            </InfoLabelText>
            <InfoBoxText>{target}</InfoBoxText>
          </InfoLabel>

          <InfoLabel>
            <InfoLabelText>
              <AntDesign
                name="heart"
                size={24}
                color="black"
                title="이용금액"
              />
            </InfoLabelText>
            <InfoBoxText>
              {target_fee}
              {target_fee.length === 0 && "무료"}
            </InfoBoxText>
          </InfoLabel>

          <InfoLabel>
            <InfoLabelText>
              <FontAwesome5
                name="home"
                size={22}
                color="black"
                title="홈페이지"
              />
            </InfoLabelText>
            <TouchableOpacity onPress={() => openURL(link)}>
              <InfoBoxText>바로가기</InfoBoxText>
            </TouchableOpacity>
          </InfoLabel>
        </RowTop>
      </Column>
      <Column>
        <InfoLabel>
          <InfoLabelText>상세설명</InfoLabelText>
        </InfoLabel>
        {program.length === 0 ? (
          <Overview>없음</Overview>
        ) : (
          <Overview>
            {program.slice(0, 250)}
            {program.length > 250 && "..."}
            {/* {program.length == 0 && "없음"} */}
          </Overview>
        )}
      </Column>
    </>
  );
};

const ImgContainer = styled.View`
  height: ${SCREEN_HEIGHT / 4 + "px"};
`;

// 행사 타이틀
const RowTitleSection = styled.View`
  padding: 15px;
  align-items: flex-start;
`;

const EVTitle = styled.View`
  margin-top: 10px;
`;
const EVTitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
// 행사 카테고리 텍스트 ex)연극
const EVCategory = styled.View`
  justify-content: center;
  background-color: ${(props) => props.theme.pointColor};
  border-radius: 60px;
  justify-content: flex-end;
`;
const EVCategoryText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.pointTextWhite};
  padding: 8px;
`;

const RowTop = styled.View`
  width: 100%;
  padding: 8px 16px;
  justify-content: flex-start;
`;

const Column = styled.View`
  flex: 1;
  padding: 8px 15px;
`;

const InfoLabel = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  justify-content: flex-start;
  align-items: center;
`;

const InfoLabelText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
const InfoBox = styled.View`
  margin-right: 15px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: red;
`;
const InfoBoxText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  flex-wrap: wrap;
  padding: 0 10px;
`;

// 상세설명 텍스트
const Overview = styled.Text`
  word-break: keep-all;
  margin-bottom: 15px;
  line-height: 20px;
`;

// 상세설명 섹션
const Section = styled.View`
  margin: 10px 15px;
`;

export default Info;
