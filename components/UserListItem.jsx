import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Avatar } from "react-native-elements";
import { useState } from "react";
import RoundedInlineButton from "./RoundedInlineButton";
import { auth } from "../firebase";

export default function UserListItem({ addUser, item, handleAddUser, id }) {
  const [enabled, setEnabled] = useState(false);

  const toggleSwitch = () => {
    setEnabled((prev) => (prev = !prev));
  };

  return (
    <View
      style={tw.style(
        `items-center flex-row w-full p-3 bg-${
          enabled ? "blue-300" : "white"
        } border-b-2 border-gray-100`
      )}
    >
      <View style={tw`flex-1`}>
        <Avatar
          size={40}
          rounded
          source={{
            uri: item?.photoURL,
          }}
        />
      </View>
      <View style={tw.style(``, { flex: 4 })}>
        <View style={tw``}>
          <Text style={tw`font-bold text-lg`}>{item?.displayName}</Text>
          <Text style={tw`text-sm`}>37🔥</Text>
        </View>
      </View>
      <View style={tw`flex-1 mr-2`}>
        {id !== auth.currentUser.uid && (
          <>
            {addUser ? (
              <RoundedInlineButton
                nameIcon="plus"
                typeIcon="antdesign"
                sizeIcon={20}
                disabled={id === auth.currentUser.uid && true}
                onPress={() => {
                  handleAddUser(id);
                }}
              />
            ) : (
              <Switch
                trackColor={{ false: "white", true: "black" }}
                thumbColor={enabled ? "rgba(147, 197, 253,1)" : "white"}
                ios_backgroundColor="#3e3e3e"
                value={enabled}
                onValueChange={toggleSwitch}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
