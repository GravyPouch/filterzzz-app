import * as FileSystem from "expo-file-system";
const imgDir = FileSystem.cacheDirectory + "img/";

const URL = "http://100.71.54.70:3000/image/upload";

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

/*
import * as FileSystem from "expo-file-system";

try {
  const response = await FileSystem.uploadAsync(
    `http://192.168.0.1:1234/binary-upload`,
    fileUri,
    {
      fieldName: "file",
      httpMethod: "PATCH",
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
    }
  );
  console.log(JSON.stringify(response, null, 4));
} catch (error) {
  console.log(error);
}
*/
