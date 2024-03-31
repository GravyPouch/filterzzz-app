import { ScrollView, StyleSheet } from "react-native";
import Button from "@/components/FilterButton";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <Button text={"PS2ify"} link={"/filter/ps2"} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
