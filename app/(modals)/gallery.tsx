import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Pressable, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import * as Haptics from "expo-haptics";

export default function ModalScreen() {
  const { image, filter } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image
        height={400}
        width={400}
        contentFit="contain"
        source={{ uri: image }}
        transition={1000}
      />
      <Pressable
        onPress={() => {
          Alert.alert("Save to Photos?", "", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                MediaLibrary.saveToLibraryAsync(image);
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                );
              },
            },
          ]);
        }}
      >
        <View className=" mt-5 p-4 bg-gray-600 rounded-2xl">
          <Text className=" text-center font-bold text-white text-2xl">
            Save to Photos
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
