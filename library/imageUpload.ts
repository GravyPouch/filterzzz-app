import * as FileSystem from "expo-file-system";
const imgDir = FileSystem.cacheDirectory + "img/";

const URL = "http://localhost:3000/image/upload";

export async function UploadImage(img, filter) {
  const response = await FileSystem.uploadAsync(URL, imgDir + img, {
    fieldName: "image",
    httpMethod: "POST",
    parameters: { filter: filter },
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
  });

  const res = JSON.parse(response.body);

  return res;
}
