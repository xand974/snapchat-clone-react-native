import React from "react";
import { StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import CameraScreen from "./CameraScreen";
import FeedScreen from "./FeedScreen";
import StoryScreen from "./StoryScreen";

export default function MainScreen() {
  return (
    <Swiper loop={false} showsPagination={false}>
      <FeedScreen />
      <CameraScreen />
      <StoryScreen />
    </Swiper>
  );
}

const styles = StyleSheet.create({});
