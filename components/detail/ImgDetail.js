import { SCREEN_HEIGHT } from "../../util";
import { StyleSheet, Modal, Text, Animated } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import styled from "@emotion/native";
import { useState } from "react";
const ImgDetail = ({ main_img }) => {
  scale = new Animated.Value(1);
  onZoomEvent = Animated.event(
    [
      {
        nativeEvent: { scale: this.scale },
      },
    ],
    {
      useNativeDriver: true, // 중요..
    }
  );

  onZoomStateChange = (event) => {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      Animated.spring(this.scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      <ImgContainer>
        <ImgBG source={{ uri: main_img }} imageStyle={{ opacity: 0.6 }} />
        <PinchGestureHandler
          onGestureEvent={this.onZoomEvent}
          onHandlerStateChange={this.onZoomStateChange}
        >
          <Animated.Image
            resizeMode="contain"
            source={{ uri: main_img }}
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{ scale: this.scale }],
            }}
          />
        </PinchGestureHandler>
      </ImgContainer>
    </>
  );
};

const ImgContainer = styled.View`
  height: ${SCREEN_HEIGHT / 4 + "px"};
`;

// const ImgDT = styled.Animated.Image`
//   /* width: 100%; */
//   height: 100%;

// `;
const ImgBG = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export default ImgDetail;
