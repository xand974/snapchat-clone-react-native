import React, { useEffect, useLayoutEffect } from "react";
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
import { auth, db } from "../firebase";
import FeedListItem from "../components/FeedListItem";
import { logout } from "../firebaseCalls";
import RoundedInlineButton from "../components/RoundedInlineButton";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

//#region WaitFunction
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
//#endregion

export default function FeedScreen() {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const [refreshing, setRefreshing] = React.useState(false);
  const [snaps, setSnaps] = React.useState([]);

  //#region refresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  //#endregion

  //#region Nav Layout
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
          <TouchableOpacity onPress={() => logout(navigation)}>
            <Avatar rounded source={{ uri: user.photoURL }} />
          </TouchableOpacity>
          <RoundedInlineButton
            typeIcon="entypo"
            sizeIcon={20}
            colorIcon="black"
            styles={{ marginLeft: 10 }}
            nameIcon="magnifying-glass"
            onPress={() => navigation.navigate("FindUserScreen")}
          />
        </View>
      ),
      headerRight: () => (
        <RoundedInlineButton
          typeIcon="antdesign"
          nameIcon="adduser"
          sizeIcon={20}
          colorIcon="gray"
          onPress={() => {
            navigation.navigate("AddUserScreen");
          }}
        />
      ),
    });
  }, []);
  //#endregion

  useEffect(() => {
    const fetchSnaps = async () => {
      try {
        const docRef = collection(db, "users", auth.currentUser.uid, "snaps");
        const q = query(docRef, orderBy("timestamp", "desc"));
        const res = await getDocs(q);

        setSnaps(
          res.docs.map((doc) => {
            return { id: doc.id, data: doc.data() };
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    return fetchSnaps();
  }, []);

  console.log(snaps);

  return (
    <SafeAreaView style={tw`bg-white`}>
      <ScrollView
        style={tw` h-full pt-3`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {snaps.map((snap) => (
          <FeedListItem key={snap.id} item={snap} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
