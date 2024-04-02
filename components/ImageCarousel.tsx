import React from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import TestItem from "./TestItem";

const windowDimensions = Dimensions.get("screen");

export default function TestScreen() {
  const data = [...Array(3).keys()];

  const baseOptions = {
    parallaxScrollingOffset: 220,
    parallaxScrollingScale: 1,
    parallaxAdjacentItemScale: 1,
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop={true}
        autoPlay={true}
        autoPlayInterval={2000}
        width={styles.container.width}
        defaultIndex={1}
        height={300}
        data={data}
        style={{ backgroundColor: "green" }}
        modeConfig={baseOptions}
        renderItem={({ index }) => <TestItem index={index} />}
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
    width: windowDimensions.width,
  },
});
