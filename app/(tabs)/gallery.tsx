import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Image } from "expo-image";
import { Link } from "expo-router";

import * as FileSystem from "expo-file-system";

export default function Screen() {
  const [images, setImages] = useState(null);
  const imgDir = FileSystem.documentDirectory + "img/";

  async function checkFiles() {
    const files = await FileSystem.readDirectoryAsync(imgDir);
    let newData = [];
    files.forEach((file, index) => {
      console.log(imgDir + file);
      newData.push({
        image: imgDir + file,
        id: index,
      });
    });
    setImages(newData);
  }

  useEffect(() => {
    checkFiles();
  }, []);

  const Item = ({ image }) => (
    <Link
      href={{
        pathname: "/(modals)/gallery",
        params: { image: image },
      }}
      asChild
    >
      <Pressable>
        <View className="aspect-square" style={styles.item}>
          <Image
            height={175}
            width={175}
            contentFit="contain"
            source={{ uri: image }}
            transition={1000}
          />
        </View>
      </Pressable>
    </Link>
  );

  return (
    <FlatList
      data={images}
      renderItem={({ item }) => <Item image={item.image} />}
      keyExtractor={(item) => item.id}
      horizontal={false}
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 32,
  },
});
