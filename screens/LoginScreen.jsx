import React from "react";
import { SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { login } from "../firebaseCalls";
import Shape from "../components/Shape";
import GoogleIcon from "../components/GoogleIcon";

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-green-100 h-full justify-center items-center`}>
      <Shape />
      <GoogleIcon onPress={() => login(navigation)} />
    </SafeAreaView>
  );
}
