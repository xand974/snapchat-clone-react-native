import React, { useLayoutEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";
import tw from "tailwind-react-native-classnames";
import { auth } from "../firebase";
import CustomListItem from "../components/CustomListItem";
import { signOut } from "@firebase/auth";

//#region WaitFunction
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
//#endregion

export default function FeedScreen() {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const [refreshing, setRefreshing] = React.useState(false);

  //#region refresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  //#endregion

  const logout = async () => {
    try {
      await signOut(auth).then(() => {
        navigation.replace("LoginScreen");
      });
    } catch (err) {
      console.log(err);
    }
  };

  //#region  Layout
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
          <TouchableOpacity onPress={() => logout()}>
            <Avatar rounded source={{ uri: user.photoURL }} />
          </TouchableOpacity>
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
  //#endregion

  return (
    <SafeAreaView style={tw`bg-white`}>
      <ScrollView
        style={tw` h-full pt-3`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
}
