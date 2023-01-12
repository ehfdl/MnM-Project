import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

const InfoImg = ({ main_img, modalVisible, setModalVisible }) => {
  const images = [
    {
      url: main_img,
      props: {},
    },
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
