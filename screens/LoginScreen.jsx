import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/AntDesign";
import { GoogleAuthProvider } from "@firebase/auth";
import { logInAsync } from "expo-google-app-auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { signInWithCredential } from "firebase/auth";
import { REACT_APP_IOS_CLIENT_ID, REACT_APP_ANDROID_CLIENT_ID } from "@env";

export default function LoginScreen() {
  const navigation = useNavigation();

  const login = async () => {
    try {
      const result = await logInAsync({
        androidClientId: REACT_APP_ANDROID_CLIENT_ID,
        iosClientId: REACT_APP_IOS_CLIENT_ID,
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        await signInWithCredential(auth, credential);
        navigation.replace("MainScreen");
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={tw`bg-green-100 h-full justify-center items-center`}>
      <View
        style={tw.style(`absolute bg-yellow-100 w-full h-full`, {
          transform: [{ rotate: "-250deg" }],
        })}
      ></View>
      <TouchableOpacity
        onPress={() => login()}
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
        <Text style={tw`text-xl `}>
          <Icon name="google" size={30} color="white" />
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
