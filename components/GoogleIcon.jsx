import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/AntDesign";
export default function GoogleIcon({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        `bg-red-300 w-28 h-28 justify-center items-center rounded-full`,
        {
          shadowColor: "#ff7277",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.79,
          shadowRadius: 7.0,
        }
      )}
    >
      <Text style={tw`text-xl`}>
        <Icon name="google" size={30} color="white" />
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
