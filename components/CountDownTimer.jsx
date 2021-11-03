import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
export default function CountDownTimer() {
  const navigation = useNavigation();
  let [timer, setTimer] = useState(10);
  useEffect(() => {
    const token = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      } else if (timer <= 0) {
        setTimer(0);
        navigation.replace("MainScreen");
      }
    }, 1000);
    return function cleanUp() {
      clearInterval(token);
    };
  }, [timer]);

  return (
    <View
      style={tw`absolute z-30 w-20 h-20 bg-black right-4 top-28 rounded-full justify-center items-center`}
    >
      <View
        style={tw`w-16 h-16 bg-gray-300 rounded-full justify-center items-center`}
      >
        <Text style={tw`font-bold text-xl`}>{timer}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
