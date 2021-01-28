import env from "../env.js";
const { IMAGE_URL } = env;
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
import FavouritesButton from "./FavouritesButton";

export default function ItemLend({
  navigation,
  besitzer,
  produktName,
  beschreibung,
  ausleihfrist,
  kategorie,
  images,
  favored,
  returnDate,
  articleId,
  user,
}) {

  //console.log(images);
  // console.log(returnDate);
  let remainingTime = returnDate.getTime() - new Date().getTime();
  let remainingTimeSeconds = remainingTime / 1000;
  let remainingTimeMinutes = remainingTimeSeconds / 60;
  let remainingTimeHours = remainingTimeMinutes / 60;
  let remainingTimeDays = remainingTimeHours / 24;
  let remainingTimeMonths = remainingTimeDays / 31;
  //console.log(remainingTimeHours);
  //console.log(remainingTimeDays);
  // console.log(new Date().getTime());
  // console.log(new Date(returnDate.getTime));
  let displayRemainingTime = remainingTimeHours;
  let displayRemainingTimeUnit = "Stunde(n)";
  if (remainingTimeHours > 24) {
    displayRemainingTime = remainingTimeDays;
    displayRemainingTimeUnit = "Tag(e)";
  }
  if (remainingTimeHours < 1) {
    displayRemainingTime = remainingTimeMinutes;
    displayRemainingTimeUnit = "Minute(n)";
  }
  if (remainingTimeDays > 31) {
    displayRemainingTime = remainingTimeMonths;
    displayRemainingTimeUnit = "Monat(e)";
  }
  return (
    <TouchableOpacity
      style={styles.itemStyle}
      onPress={() => {
        /* navigation.setParams(
          {
            besitzer: besitzer,
            produktName: produktName,
            images: images,
            ausleihfrist: ausleihfrist,
            kategorie: kategorie,
            beschreibung: beschreibung,
            displayRemainingTime: Math.floor(displayRemainingTime),
            displayRemainingTimeUnit: displayRemainingTimeUnit,
            articleId: articleId,
            user: user,
          }
        ) */
        
        navigation.navigate("Details", {
          besitzer: besitzer,
          produktName: produktName,
          images: images,
          ausleihfrist: ausleihfrist,
          kategorie: kategorie,
          beschreibung: beschreibung,
          displayRemainingTime: Math.floor(displayRemainingTime),
          displayRemainingTimeUnit: displayRemainingTimeUnit,
          articleId: articleId,
          user: user,
          favored: favored
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
          <UserButton user={user} navigation={navigation} />
          {displayRemainingTime < 0 ? (
            <Text style={styles.itemExpired} numberOfLines={1}>
              Frist abgelaufen!
            </Text>
          ) : (
              <Text style={styles.itemTime} numberOfLines={1}>
                Noch: {Math.floor(displayRemainingTime)}{" "}
                {displayRemainingTimeUnit}
              </Text>
            )}
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
  itemExpired: {
    textAlign: "right",
    fontSize: 12,
    width: "45%",
    color: "red",
  },
});
