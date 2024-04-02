import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Link } from "expo-router";

export default function Button({ text, link, image, id, images }) {
  const imageURI = {
    uri: image,
  };

  return (
    <Link
      href={{
        pathname: link,
        params: { id: id, image: image, images: images },
      }}
      asChild
    >
      <Pressable>
        <View
          style={styles.container}
          className="  m-2 border-purple-500 border-2"
        >
          <ImageBackground
            style={styles.image}
            source={imageURI}
            resizeMode="cover"
            blurRadius={35}
          >
            <Text
              className="text-left text-3xl font-bold text-white"
              style={styles.blurContainer}
            >
              {text}
            </Text>
            <Pressable>
              <View className=" p-5">
                <MaterialCommunityIcons
                  name="cards-heart-outline"
                  size={40}
                  color="white"
                />
              </View>
            </Pressable>
          </ImageBackground>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    borderRadius: 20,
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 8,
    overflow: "hidden",
  },
});
