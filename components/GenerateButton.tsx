import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";

import React, { useState, useEffect } from "react";

import { router } from "expo-router";

import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";

const backroundImage = {
  uri: "https://i.kym-cdn.com/photos/images/original/002/778/491/0c3.png",
};

const imgDir = FileSystem.cacheDirectory + "img/";

async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    console.log("directory doesn't exist, creating…");
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
}

export default function GenButton({ filter }) {
  const [image, setImage] = useState(null);

  async function generate() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    //console.log(result);

    if (!result.canceled) {
      await ensureDirExists();

      setImage(result.assets[0].uri);

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      const imageURI = await result.assets[0].uri;

      const saveResult = /[^/]*$/.exec(imageURI)[0];

      await FileSystem.moveAsync({
        from: imageURI,
        to: `${FileSystem.cacheDirectory}img/${saveResult}`,
      });

      router.push({
        pathname: "/filter/upload",
        params: {
          img: saveResult,
          filter: filter,
        },
      });
    } else {
      console.log("canceled");
    }
  }

  return (
    <Pressable onPress={() => generate()}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#8a3cde", "#ea2bff"]}
          className=" rounded-3xl p-5"
        >
          <Text className="text-center text-3xl font-bold text-white">
            Generate
          </Text>
        </LinearGradient>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
  },
});
