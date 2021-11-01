import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import tw from "tailwind-react-native-classnames";
export default function RoundedInlineButton({
  typeIcon,
  nameIcon,
  sizeIcon,
  colorIcon,
  onPress,
  styles,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={tw.style(`bg-gray-100 p-2 rounded-full`, styles)}
      onPress={onPress}
    >
      <Icon type={typeIcon} name={nameIcon} size={sizeIcon} color={colorIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
