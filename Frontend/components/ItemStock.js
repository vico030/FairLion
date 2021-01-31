import env from "../env.js";
const {IMAGE_URL} = env;
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
import { formatDuration } from "../helpers/format.js";

export default function ItemStock({
  besitzer,
  produktName,
  ausleihfrist,
  images,
  kategorie,
  navigation,
  beschreibung,
  user,
  borrower,
  articleId,
}) {
  // Hier steht nur Text, damit da Bilder sind
  let duration = formatDuration(ausleihfrist)
  return (
    // change image link to correct parameter url
    <TouchableOpacity
      style={styles.itemStyle}
      onPress={() =>
        navigation.navigate("StockDetails", {
          besitzer: besitzer,
          images: images,
          produktName: produktName,
          ausleihfrist: duration,
          kategorie: kategorie,
          beschreibung: beschreibung,
          user: user,
          articleId: articleId,
          borrower: borrower
        })
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
          <View>
            {borrower && <Text style={styles.borrowed}>Verliehen</Text>}
          </View>
          {/*<MaterialCommunityIcons
            name="heart-outline"
            size={24}
            style={styles.icon}
          />*/}
        </View>
        <View style={styles.items}>
          <UserButton user={user} navigation={navigation} disabled={true} />
          <Text style={styles.itemTime} numberOfLines={1}>
            Frist: {duration}
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
    flex: 0.5
  },
  icon: {
    color: "#fff",
  },
  borrowed: {
    color: "red",
  }
});
