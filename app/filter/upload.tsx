import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import {
  Link,
  router,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import { Image } from "expo-image";
import * as FileSystem from "expo-file-system";
import * as Progress from "react-native-progress";
import * as Crypto from "expo-crypto";
import * as MediaLibrary from "expo-media-library";
import * as Haptics from "expo-haptics";
import LottieView from "lottie-react-native";

import { UploadImage } from "@/library/imageUpload";
import ShareButton from "@/components/ShareButton";

const imgDir = FileSystem.cacheDirectory + "img/";

const permImgDir = FileSystem.documentDirectory + "img/";

export default function Modal() {
  const confettiRef = useRef<LottieView>(null);
  const { img } = useLocalSearchParams();

  const randomValue = Math.floor(Math.random() * 30) + 5;
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState(randomValue);
  const [progress, setProgress] = useState(0);
  const [blurProgress, setBlurProgress] = useState(0);
  const [queueTotal, setQueueTotal] = useState(randomValue);
  const progressAdd = 1 / queueTotal;

  async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(permImgDir);
    if (!dirInfo.exists) {
      console.log("directory doesn't exist, creating…");
      await FileSystem.makeDirectoryAsync(permImgDir, { intermediates: true });
    } else {
      console.log("Dir exists");
      return true;
    }
  }

  async function startUpload() {
    const newIMG = await UploadImage(img);
    if (newIMG.img) {
      const img = await handleDownload(newIMG.img);
      setImage(img);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }

  const handleDownload = async (url) => {
    await ensureDirExists();
    const UUID = await Crypto.randomUUID();
    let fileUri = imgDir + `${UUID}.png`;
    try {
      const res = await FileSystem.downloadAsync(url, fileUri);
      return res.uri;
    } catch (err) {
      console.log("FS Err: ", err);
    }
  };

  useEffect(() => {
    setImage(imgDir + img);
    startUpload();
  }, []);

  useEffect(() => {
    if (queue <= 0) {
      setLoading(false);
      return;
    } else {
      const interval = setInterval(
        () => {
          setQueue((queue) => queue - 1);
          setProgress((progress) => progress + progressAdd);
          setBlurProgress(Math.floor(Math.random() * 500));
        },
        Math.floor(Math.random() * 1000) + 100
      );
      return () => clearInterval(interval);
    }
  }, [queue]);

  return (
    <View className=" p-4 py-10">
      {loading ? (
        <View className=" flex flex-col h-full justify-between">
          <Image
            height={400}
            width={null}
            contentFit="contain"
            source={{ uri: image }}
            blurRadius={blurProgress}
            transition={1000}
          />
          <View className=" space-y-4">
            <Text className=" text-center text-white">
              You are {queue}/{queueTotal} in line
            </Text>
            <Progress.Bar
              progress={progress}
              width={null}
              color="white"
              height={15}
              borderRadius={10}
            />

            <TouchableOpacity
              onPress={() => {
                router.navigate("Premium");
              }}
              className="w-full bg-black p-5 rounded-full "
            >
              <Text className="text-white text-center font-bold">
                Skip The Wait
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <LottieView
            ref={confettiRef}
            source={require("../../assets/animations/confetti.json")}
            autoPlay={true}
            loop={false}
            style={styles.lottie}
            resizeMode="cover"
          />
          <View className="flex flex-col space-y-6">
            <View>
              {image && (
                <Image
                  height={400}
                  width={null}
                  contentFit="contain"
                  source={{ uri: image }}
                  transition={1000}
                />
              )}
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
            <View className="flex flex-row justify-around">
              <ShareButton icon={"share"} url={image} />
              <ShareButton icon={"message-circle"} url={image} />
              <ShareButton icon={"instagram"} url={image} />
              <ShareButton icon={"twitter"} url={image} />
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  lottie: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: "none",
  },
});
