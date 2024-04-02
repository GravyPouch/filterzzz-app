import { Pressable } from "react-native";
import { Text, View } from "./Themed";

import * as Linking from "expo-linking";

export default function SupportLinks({ text, link }) {
  return (
    <Pressable
      className=" p-4 rounded-full w-9/12  bg-gray-800"
      onPress={() => Linking.openURL("https://" + link)}
    >
      <Text className=" font-bold text-white text-center text-xl">{text}</Text>
    </Pressable>
  );
}
