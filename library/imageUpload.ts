import * as FileSystem from "expo-file-system";
const imgDir = FileSystem.cacheDirectory + "img/";

export async function UploadImage(img) {
  async function upload(formData) {
    try {
      const response = await fetch("http://100.71.54.70:3000/image/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const formData = new FormData();

  let filename = img.split("/").pop();

  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  formData.append("image", { uri: imgDir + img, name: img, type });

  const res = await upload(formData);
  console.log(res);
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
