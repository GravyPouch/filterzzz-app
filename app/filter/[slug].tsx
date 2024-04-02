import { useLocalSearchParams } from "expo-router";

import { Text, View, ImageBackground, StyleSheet } from "react-native";

import GenButton from "@/components/GenerateButton";

import ImageCarousel from "@/components/ImageCarousel";

export default function Page() {
  const { slug, id, image, images } = useLocalSearchParams();

  const bgImage = { uri: image };

  return (
    <View
      className=" m-5 flex flex-col justify-evenly"
      style={styles.container}
    >
      <Text className=" text-white text-6xl font-extrabold">{slug}</Text>

      <ImageCarousel images={images} />

      <GenButton filter={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
