import { ScrollView, StyleSheet } from "react-native";
import Button from "@/components/FilterButton";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  return <ScrollView style={styles.scrollView}></ScrollView>;
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
