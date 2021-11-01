import React, { useLayoutEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import SendListItem from "../components/SendListItem";
import SendButton from "../components/SendButton";

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
    <SafeAreaView style={tw`flex-1 bg-white h-full`}>
      <ScrollView>
        <SendListItem />
        <SendListItem />
        <SendListItem />
        <SendListItem />
        <SendListItem />
        <SendListItem />
        <SendListItem />
        <SendListItem />
        <SendListItem />
        <SendListItem />
        <SendListItem />
        <SendListItem />
        <SendListItem />
      </ScrollView>
      <SendButton bg={"bg-gray-200"} disabled={true} />
    </SafeAreaView>
  );
}
