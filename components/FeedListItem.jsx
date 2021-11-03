import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/Feather";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
export default function FeedListItem({ item }) {
  const [timeAgo, setTimeAgo] = useState("");
  const navigation = useNavigation();

  const handleOpenSnap = async () => {
    if (!item.data.open) {
      const docRef = doc(db, "users", auth.currentUser.uid, "snaps", item.id);
      await setDoc(docRef, { open: true }, { merge: true });
      navigation.navigate("SnapScreen", {
        img: item.data.img,
      });
    }
  };

  useEffect(() => {
    setTimeAgo(item.data.timestamp.toDate().toLocaleTimeString("fr-FR"));
  }, []);

  return (
    <TouchableWithoutFeedback
      style={tw` `}
      onPress={() => {
        handleOpenSnap();
      }}
    >
      <View
        style={tw`flex-row items-center pt-3 pb-3 border-b border-gray-100 `}
      >
        <TouchableOpacity style={tw`ml-3 flex-1`}>
          <Avatar
            rounded
            source={{
              uri: item.data.photoUrl,
            }}
            size={40}
          />
        </TouchableOpacity>
        <View style={tw.style(`ml-2 `, { flex: 4 })}>
          <Text style={tw`text-xl font-bold`}>{item.data.username}</Text>
          <View style={tw`flex-row items-center`}>
            {!item.data.open ? (
              <>
                <View style={tw`w-3 h-3 bg-red-500 mr-1`}></View>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-red-500 font-bold`}>Nouveau Snap</Text>
                  <View
                    style={tw`w-1 h-1 bg-gray-300 ml-2 mr-2 rounded-full `}
                  ></View>
                  <Text style={tw`text-xs text-gray-500`}>{timeAgo}</Text>
                </View>
              </>
            ) : (
              <Text>ouvert</Text>
            )}
          </View>
        </View>
        <View style={tw.style(``, { flex: 1 })}>
          <Text>😂🥲</Text>
        </View>
        <View
          style={tw.style(
            `border-l-2 border-gray-100 pl-2 items-center justify-center`,
            {
              flex: 1,
            }
          )}
        >
          <Icon name="message-square" size={25} color="gray" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
