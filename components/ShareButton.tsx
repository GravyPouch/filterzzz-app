import { View, Text, Pressable } from "react-native";

import { Feather } from "@expo/vector-icons";

import * as Sharing from "expo-sharing";

export default function ShareButton({ icon, url }) {
  return (
    <Pressable onPress={() => Sharing.shareAsync(url)}>
      <View className=" bg-gray-700 p-5 rounded-full">
        <Feather name={icon} size={24} color="white" />
      </View>
    </Pressable>
  );
}
