import React from "react";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation, useRoute } from "@react-navigation/native";
export default function SnapScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { img, setOpen } = route.params;

  return (
    <TouchableWithoutFeedback
      style={tw`w-full h-full`}
      onPress={() => {
        setOpen;
        navigation.goBack();
      }}
    >
      <Image source={{ uri: img }} style={tw`h-full w-full`} />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
