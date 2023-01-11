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

const ImgDetail = ({ main_img }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { navigate } = useNavigation();

  return (
    <>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ImgDT source={{ uri: main_img }} />
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Text>Hide Modal</Text>
        </Pressable>
      </Modal> */}

      <ImgContainer>
        <TouchableOpacity
          onPress={() =>
            navigate("Stacks", {
              screen: "InfoImg",
            })
          }
        >
          <ImgBG source={{ uri: main_img }} imageStyle={{ opacity: 0.6 }} />
          {/* <Pressable onPress={() => setModalVisible(true)}> */}
          <ImgDT
            resizeMode="contain"
            source={{ uri: main_img }}
            style={StyleSheet.absoluteFill}
          />
        </TouchableOpacity>
        {/* </Pressable> */}
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
