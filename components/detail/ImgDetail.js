import { SCREEN_HEIGHT } from "../../util";
import {
  StyleSheet,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "@emotion/native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import InfoImg from "../modal/InfoImg";

const ImgDetail = ({ main_img }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { navigate } = useNavigation();
  const ImgModalOpenHandler = () => {
    setModalVisible(true);
  };
  return (
    <>
      <ImgContainer>
        <TouchableOpacity
          // onPress={() =>
          //   navigate("Stacks", {
          //     screen: "InfoImg",
          //   })
          // }
          onPress={ImgModalOpenHandler}
        >
          <ImgBG source={{ uri: main_img }} imageStyle={{ opacity: 0.6 }} />
          <ImgDT
            resizeMode="contain"
            source={{ uri: main_img }}
            style={StyleSheet.absoluteFill}
          />
        </TouchableOpacity>
        <InfoImg
          main_img={main_img}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        ></InfoImg>
      </ImgContainer>
    </>
  );
};

const ImgContainer = styled.View`
  height: ${SCREEN_HEIGHT / 4 + "px"};
`;

const ImgDT = styled.Image`
  /* width: 100%; */
  height: 100%;
`;
const ImgBG = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export default ImgDetail;
