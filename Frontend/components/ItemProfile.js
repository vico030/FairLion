import env from "../env.js";
const { IMAGE_URL } = env;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ProfileUserButton from "./ProfileUserButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FavouritesButton from "./FavouritesButton";
import AsyncStorage from "@react-native-community/async-storage";
import { formatDuration } from "../helpers/format.js";


export default function ItemProfile({
  navigation,
  besitzer,
  produktName,
  beschreibung,
  verliehen,
  images,
  ausleihfrist,
  kategorie,
  favored,
  returnDate,
  status,
  articleId,
  user,
  borrower,
}) {
  

  let duration = formatDuration(ausleihfrist)
  return (
    // change image link to correct parameter url
    <TouchableOpacity
      style={styles.itemStyle}
      onPress={async () => {
        const userId = await AsyncStorage.getItem("userId");
        let screen;
        if (borrower) {          
          if (borrower == userId) {
            screen = "ReturnDetails";
          }
        }
        else {
          screen = "ViewDetails";
        }
        navigation.navigate(screen, {
          besitzer: besitzer,
          produktName: produktName,
          beschreibung: beschreibung,
          verliehen: verliehen,
          images: images,
          ausleihfrist,
          kategorie,
          ausleihfrist: duration,
          favored: favored,
          status: status,
          returnDate: returnDate,
          articleId: articleId,
          user: user,
        })
      }
      }
    >
      <View>
        <Image
          style={styles.itemImage}
          source={{ uri: IMAGE_URL + images[0] }}
        />
      </View>
      <View style={styles.itemBottomView}>
        <View style={styles.items}>
          <Text style={styles.itemName} numberOfLines={1}>
            {produktName}
          </Text>
          <FavouritesButton favored={favored} articleId={articleId} />
        </View>
        <View style={styles.items}>
          <ProfileUserButton user={user} />
          <Text style={styles.itemTime} numberOfLines={1}>
            {verliehen}
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
  itemImage: {
    height: 90,
    width: 120,
  },
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
    color: "red",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    width: "85%",
  },
  icon: {
    color: "grey",
  },
});
