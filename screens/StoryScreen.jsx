import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";

export default function StoryScreen() {
  return (
    <SafeAreaView style={tw`items-center justify-center bg-green-400`}>
      <Text>Story</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
