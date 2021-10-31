import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";

export default function Loading() {
  return (
    <SafeAreaView style={tw`h-full justify-center items-center`}>
      <Text style={tw`text-xl`}>Loading</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
