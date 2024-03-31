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

const image = {
  uri: "https://i.kym-cdn.com/photos/images/original/002/778/491/0c3.png",
};

export default function Button({ text, link }) {
  return (
    <Link href={link} asChild>
      <Pressable>
        <View
          style={styles.container}
          className="  m-2 border-fuchsia-500 border-2"
        >
          <ImageBackground
            style={styles.image}
            source={image}
            resizeMode="cover"
            blurRadius={35}
          >
            <Text
              className="text-left text-3xl font-bold text-white"
              style={styles.blurContainer}
            >
              {text}
            </Text>
            <View className=" p-3">
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={40}
                color="white"
              />
            </View>
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
