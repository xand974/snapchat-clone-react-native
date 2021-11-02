import React, { useLayoutEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserListItem from "../components/UserListItem";
import SendButton from "../components/SendButton";
import { useEffect } from "react";
import { db, storage } from "../firebase";
import { ref } from "@firebase/storage";
import { auth } from "../firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "@firebase/firestore";
import { useState } from "react";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function SendScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { height, width, uri } = route.params;
  const [friends, setFriends] = useState([]);
  const [selected, setSelected] = useState(null);

  const toggleSwitch = (id) => {
    setSelected(() => (id === selected ? null : id));
  };

  console.log(selected === null);

  const sendSnap = async () => {
    try {
      const docRef = collection(db, "users", selected, "snaps");
      const fileName = Date.now() + "_" + uri;
      const storageRef = ref(storage, `snap/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, uri);
      uploadTask.on(
        "state_changes",
        (snapshot) => {
          const progress =
            (snapshot.byteTransferred / snapshot.totalBytes) * 100;
          console.log("upload is " + progress + "% done.");
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
          });
        }
      );

      // await setDoc(docRef, { img: fileName, open: false }).then(() => {
      //   navigation.replace("HomeScreen");
      // });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUsersFriends = async () => {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const res = await getDoc(userRef);
        const friendsArray = res.data().friends;
        if (!friendsArray) return;

        const arr = await Promise.all(
          friendsArray.map((f) => {
            return getDoc(doc(db, "users", f));
          })
        );
        setFriends(arr.map((a) => ({ id: a.id, data: a.data() })));
      } catch (err) {
        console.log(err);
      }
    };
    getUsersFriends();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Send",
    });
  }, []);
  return (
    <SafeAreaView style={tw`flex-1 bg-white h-full`}>
      <ScrollView>
        {friends.map((friend) => (
          <UserListItem
            key={friend.id}
            item={friend.data}
            value={selected === friend.id}
            onValueChange={() => toggleSwitch(friend.id)}
          />
        ))}
      </ScrollView>
      <SendButton
        bg={selected === null ? "bg-white" : "bg-gray-200"}
        disabled={selected === null ? true : false}
        onPress={() => sendSnap()}
      />
    </SafeAreaView>
  );
}
