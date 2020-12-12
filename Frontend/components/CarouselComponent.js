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

const slideList = Array.from({ length: 5 }).map((_, i) => {
  return {
    id: i.toString(),
    image: `https://picsum.photos/1440/2842?random=${i}`,
    title: "Bohrmaschine Bosch",
  };
});

function Slide({ data }) {
  return (
    <View style={styles.slide}>
      <Image source={{ uri: data.image }} style={styles.image} />
    </View>
  );
}

export default function Carousel({ images }) {
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
