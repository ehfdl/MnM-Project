import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import styled from "@emotion/native";

const InfoImg = ({
  //  navigation: { navigate, goBack }
  main_img,
  modalVisible,
  setModalVisible,
}) => {
  const images = [
    {
      // Simplest usage.
      url: main_img,
      // width: number
      // height: number
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {
        // headers: ...
      },
    },
    // {
    //   url: "",
    //   props: {
    //     // Or you can set source directory.
    //     //   source: require("../background.png"),
    //   },
    // },
  ];
  return (
    <Modal visible={modalVisible} transparent={true}>
      <ImageViewer
        imageUrls={images}
        enableSwipeDown={true}
        onSwipeDown={() => {
          setModalVisible(false);
        }}
      />
    </Modal>
  );
};

export default InfoImg;
