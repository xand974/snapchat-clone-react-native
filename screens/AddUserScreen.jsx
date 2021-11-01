import React, { useLayoutEffect } from "react";
import { ScrollView, View } from "react-native";
import { Input } from "react-native-elements";
import UserListItem from "../components/UserListItem";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

export default function AddUserScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Ajouter un utilisateur",
    });
  }, []);

  return (
    <View style={tw`h-full bg-white pt-3`}>
      <Input placeholder="entrer un nom d'utilisateur" />
      <ScrollView>
        <UserListItem addUser={true} />
      </ScrollView>
    </View>
  );
}
