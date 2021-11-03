import React from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import CountDownTimer from "../components/CountDownTimer";
export default function SnapScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { img } = route.params;

  useEffect(() => {
    if (!img) exit();
  }, [img]);

  const exit = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback
      style={tw`w-full h-full`}
      onPress={() => {
        navigation.replace("MainScreen");
      }}
    >
      <View>
        <CountDownTimer></CountDownTimer>
        <Image source={{ uri: img }} style={tw`h-full w-full`} />
      </View>
    </TouchableWithoutFeedback>
  );
}
