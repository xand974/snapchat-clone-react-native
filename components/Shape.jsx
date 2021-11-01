import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

export default function Shape() {
  return (
    <View
      style={tw.style(`absolute bg-yellow-100 w-full h-full`, {
        transform: [{ rotate: "-250deg" }],
      })}
    ></View>
  );
}

const styles = StyleSheet.create({});
