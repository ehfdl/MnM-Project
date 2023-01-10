import { SCREEN_HEIGHT } from "../../util";
import { StyleSheet, Modal, Pressable, Text } from "react-native";
import styled from "@emotion/native";
import { useState } from "react";
const ImgDetail = ({ main_img }) => {
  const [modalVisible, setModalVisible] = useState(false);
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
        <ImgBG source={{ uri: main_img }} imageStyle={{ opacity: 0.6 }} />
        {/* <Pressable onPress={() => setModalVisible(true)}> */}
        <ImgDT
          resizeMode="contain"
          source={{ uri: main_img }}
          style={StyleSheet.absoluteFill}
        />
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
