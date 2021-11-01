import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SendScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { height, width, uri } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Send",
    });
  }, []);
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Text>Send Snap</Text>
      <Text>{height}</Text>
      <Text>{width}</Text>
      <Text>{uri}</Text>
    </SafeAreaView>
  );
}
