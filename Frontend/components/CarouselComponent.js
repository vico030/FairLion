import { IMAGE_URL } from "@env";
import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function Carousel({ images }) {
  console.log(images);
  const slideList = Array.from(images).map((_, i) => {
    return {
      id: i.toString(),
      image: IMAGE_URL + images[i],
    };
  });

  function Slide({ data }) {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: data.image }} style={styles.image} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={slideList}
        style={styles.carousel}
        renderItem={({ item }) => {
          return <Slide data={item} />;
        }}
        pagingEnabled
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "25%",
  },
  carousel: {
    flex: 1,
  },
  slide: {
    width: windowWidth,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
