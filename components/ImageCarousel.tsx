import React from "react";
import { View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import TestItem from "./TestItem";

export default function ImageCarousel({ images }) {
  const dataArray = images.split(",");

  const data = [];

  dataArray.forEach((element, index) => {
    data.push({
      image: element,
      id: index,
    });
  });

  return (
    <View style={styles.container}>
      <Carousel
        loop={true}
        autoPlay={true}
        autoPlayInterval={2000}
        width={400}
        defaultIndex={1}
        height={300}
        data={data}
        style={{ backgroundColor: "green" }}
        renderItem={({ item }) => (
          <TestItem image={item.image} index={item.id} />
        )}
      ></Carousel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
