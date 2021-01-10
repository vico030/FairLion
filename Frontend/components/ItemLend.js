import {IMAGE_URL} from '@env';
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import UserButton from "./UserButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ItemLend({
  navigation,
  besitzer,
  produktName,
  beschreibung,
  ausleihfrist,
  kategorie,
  images,
  favored
}) {
  console.log(images)
  return (
    <TouchableOpacity
      style={styles.itemStyle}
      onPress={() =>
        navigation.navigate("Details", {
          besitzer: besitzer,
          produktName: produktName,
          images: images,
          ausleihfrist: ausleihfrist,
          kategorie: kategorie,
          beschreibung: beschreibung
        })
      }
    >
      <View>
        <Image
          style={styles.itemImage}
          source={{uri: IMAGE_URL+images[0]}}
        />
      </View>
      <View style={styles.itemBottomView}>
        <View style={styles.items}>
          <Text style={styles.itemName} numberOfLines={1}>
            {produktName}
          </Text>
          {favored == true ? (
            <MaterialCommunityIcons name="heart" size={24} color="#333740" />
          ) : (
            <MaterialCommunityIcons name="heart-outline" size={24} />
          )}
        </View>
        <View style={styles.items}>
          <UserButton userName={String(besitzer)} navigation={navigation} />

          <Text style={styles.itemTime} numberOfLines={1}>
            Noch: {ausleihfrist}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignSelf: "stretch",
    width: Dimensions.get("window").width - 5,
    marginVertical: 3,
  },
  itemImage: { height: 90, width: 120 },
  items: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  itemButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E77F23",
    borderRadius: 50,
  },
  itemBottomView: {
    width: Dimensions.get("window").width - 125,
    paddingVertical: 5,
  },
  itemTime: {
    textAlign: "right",
    fontSize: 12,
    width: "45%",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    width: "85%",
  },
});
