import * as ImagePicker from "expo-image-picker";
import React, { useCallback } from "react";
import { Image, View } from "react-native";
import DynamicButton from "./dynamicButton";
import SizedBox from "./sizedBox";
export default function CircleAvatar() {
  const [image, setImage] = React.useState({
    uri: "https://i.pravatar.cc/150",
    isLocal: false,
  });

  const pickImage = useCallback(async () => {
    console.log("pickImage");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage({
        uri: result.assets[0].uri,
        isLocal: true,
      });
    } else {
      alert("You did not select any image.");
    }
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 130, height: 130, borderRadius: 65 }}
        source={{
          uri: image.uri,
        }}
      ></Image>
      <SizedBox height={20} />
      <DynamicButton
        style={{
          width: 100,
        }}
        onPressed={pickImage}
        title="Chose Profile Picture"
        type="onPrimary"
      />
    </View>
  );
}
