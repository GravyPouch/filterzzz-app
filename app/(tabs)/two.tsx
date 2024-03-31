import { StyleSheet, ScrollView, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Image } from "expo-image";

import * as FileSystem from "expo-file-system";

export default function TabTwoScreen() {
  const [images, setImages] = useState(null);
  const imgDir = FileSystem.cacheDirectory + "img/";

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
    <View className="aspect-square" style={styles.item}>
      <Image
        height={200}
        width={200}
        contentFit="contain"
        source={{ uri: image }}
        transition={1000}
      />
    </View>
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
    backgroundColor: "#f9c2ff",
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 32,
  },
});

{
  /**<FlatList>
  <View className="flex flex-row h-screen space-x-2 ">
  <View className=" basis-1/3 h-1/4 p-10 rounded-xl bg-red-500" />
  <View className=" basis-1/3 h-1/4 p-10 rounded-xl bg-red-500" />
</View>
</FlatList> */
}
