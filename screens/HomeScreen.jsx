import React, { useLayoutEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";
import tw from "tailwind-react-native-classnames";
import { auth } from "../firebase";
import ListItem from "../components/ListItem";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleStyle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
      },
      headerShadowVisible: false,
      headerLeft: () => (
        <View style={tw`flex-row items-center`}>
          <Avatar rounded source={{ uri: user.photoURL }} />
          <TouchableOpacity style={tw`bg-gray-100 p-2 ml-3 rounded-full`}>
            <Icon name="magnifying-glass" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity style={tw`bg-gray-100 rounded-full p-2`}>
          <AntIcon name="adduser" size={20} color="gray" />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <ScrollView
      style={tw` h-full pt-3 bg-white`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ListItem />
    </ScrollView>
  );
}
