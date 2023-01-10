import { Linking, TouchableOpacity, View, Text } from "react-native";
import styled from "@emotion/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../util";

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
        <EVTitle>
          <EVTitleText>{title}</EVTitleText>
        </EVTitle>
        <EVCategory>
          <EVCategoryText>{codename}</EVCategoryText>
        </EVCategory>
      </RowTitleSection>
      <Column>
        <Row>
          <InfoLabel>
            <InfoLabelText>날짜</InfoLabelText>
          </InfoLabel>
          <InfoBox>
            <InfoBoxText>{date}</InfoBoxText>
          </InfoBox>
        </Row>
        <Row>
          <InfoLabel>
            <InfoLabelText>장소</InfoLabelText>
          </InfoLabel>

          <InfoBox>
            <InfoBoxText>{place}</InfoBoxText>
          </InfoBox>
        </Row>
        <Row>
          <InfoLabel>
            <InfoLabelText>이용대상</InfoLabelText>
          </InfoLabel>
          <InfoBox>
            <InfoBoxText>{target}</InfoBoxText>
          </InfoBox>
        </Row>
        <Row>
          <InfoLabel>
            <InfoLabelText>이용금액</InfoLabelText>
          </InfoLabel>
          <InfoBox>
            <InfoBoxText>
              {target_fee}
              {target_fee.length === 0 && "무료"}
            </InfoBoxText>
          </InfoBox>
        </Row>
      </Column>
      <Column>
        <InfoLabel>
          <InfoLabelText>상세설명</InfoLabelText>
        </InfoLabel>
        <Column>
          <Overview>
            {program.slice(0, 250)}
            {program.length > 250 && "..."}
            {program.length == 0 && "없음"}
          </Overview>
        </Column>
        <InfoLabel>
          <InfoLabelText>홈페이지</InfoLabelText>
        </InfoLabel>
        <TouchableOpacity onPress={() => openURL(link)}>
          <Text>웹사이트로 이동</Text>
        </TouchableOpacity>
      </Column>
    </>
  );
};

const ImgContainer = styled.View`
  height: ${SCREEN_HEIGHT / 4 + "px"};
`;

const RowTitleSection = styled.View`
  flex-direction: row;
  margin: 15px;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Row = styled.View`
  width: ${SCREEN_WIDTH + "px"};
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
`;
const Column = styled.View`
  width: 90%;
  flex-direction: column;
  align-content: center;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const InfoLabel = styled.View`
  width: 80px;
  margin-bottom: 10px;
  justify-content: center;
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
  /* 부모컨테이너를 벗어날 시 줄바꿈 */
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
// 행사 타이틀
const EVTitle = styled.View`
  /* align-items: center; */
  /* justify-content: center; */
`;
const EVTitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
// 행사 카테고리 텍스트 ex)연극
const EVCategory = styled.View`
  justify-content: center;
  flex-wrap: wrap;
`;
const EVCategoryText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  flex-wrap: wrap;
`;
// 상세설명 섹션
const Section = styled.View`
  margin: 10px 15px;
`;

export default Info;
