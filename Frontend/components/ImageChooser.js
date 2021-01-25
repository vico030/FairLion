import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function ImageChooser(props) {
  const [imageSource, setImageSource] = useState(null);

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("FairLION braucht Berechtigungen für das Hochladen von Bildern");
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.uri) props.handleImages([result.uri]);

    if (!result.cancelled) {
      setImageSource(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => selectImage()}>
        {!imageSource && (
          <MaterialIcons name="add-a-photo" style={styles.icon} size={36} />
        )}
        {imageSource && (
          <Image source={{ uri: imageSource }} style={styles.image} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 150,
    borderWidth: 1,
    borderColor: "#C6C6C8",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 150,
  },
  icon: {
    color: "#C6C6C8",
  },
});
