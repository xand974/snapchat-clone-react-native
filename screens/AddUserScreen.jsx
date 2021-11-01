import React, { useLayoutEffect } from "react";
import { ScrollView, View } from "react-native";
import { Input } from "react-native-elements";
import UserListItem from "../components/UserListItem";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { useEffect } from "react";
import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

export default function AddUserScreen() {
  const navigation = useNavigation();
  const [userInput, setUserInput] = useState("");
  const [userFound, setUserFound] = useState([]);

  const handleAddUser = async () => {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        docRef,
        {
          friends: [],
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  console.log(typeof userFound);

  useEffect(() => {
    userInput.length == 0 && setUserFound([]);
  }, [userInput]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const docRef = collection(db, "users");
        const res = await getDocs(docRef);

        setUserFound(
          res.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };
    userInput.length >= 3 && fetchUsers();
  }, [userInput]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Ajouter un utilisateur",
    });
  }, []);

  return (
    <View style={tw`h-full bg-white pt-3`}>
      <Input
        placeholder="entrer un nom d'utilisateur"
        value={userInput}
        onChangeText={(text) => setUserInput(text)}
      />
      <ScrollView>
        {userFound
          .filter((user) => {
            return user.data.displayName
              .toLowerCase()
              .includes(userInput.toLowerCase());
          })
          .map((user) => (
            <UserListItem
              key={user.id}
              addUser={true}
              handleAddUser={handleAddUser}
              item={user.data}
            />
          ))}
      </ScrollView>
    </View>
  );
}
