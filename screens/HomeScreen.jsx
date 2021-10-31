import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
    });
  }, []);
  return (
    <View>
      <Text>SNAP HIER WE GO</Text>
    </View>
  );
}
