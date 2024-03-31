import { useLocalSearchParams } from "expo-router";

import { Text, View } from "react-native";

import GenButton from "@/components/GenerateButton";

export default function Page() {
  const { slug } = useLocalSearchParams();

  return (
    <View>
      <Text className=" text-white text-2xl font-extrabold">{slug}</Text>
      <GenButton model={"ps2"} />
    </View>
  );
}
