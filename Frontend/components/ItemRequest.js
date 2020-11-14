import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import UserButton from "./UserButton";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function ItemRequest({ besitzer, produktName, image }) {
  return (
    // change image link to correct parameter url
    <View style={styles.wrapper}>
      <View>
        <Image
          style={styles.itemImage}
          source={require(`../assets/testprofilpic.jpg`)}
        />
      </View>
      <View style={styles.itemBottomView}>
        <View style={styles.itemUpper}>
          <Text style={styles.itemName} numberOfLines={1}>{produktName}</Text>
        </View>
        <View style={styles.bottomRowRight}>
          <UserButton userName={besitzer} />
          <View style={styles.icons}>
            <AntDesign name="check" size={24} color="green" />
            <Feather name="x" size={24} color="red" />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#ddd",
    flexDirection: "row",
    alignSelf: "stretch",
    width: Dimensions.get("window").width - 5,
    marginVertical: 3,
  },
  itemImage: { height: 90, width: 120 },
  bottomRowRight: {
    marginLeft: 10,
    width: "72%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemUpper: {
    width: "68%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 10,
  },
  itemButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E77F23",
    borderRadius: 50,
  },
  itemBottomView: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  itemTime: {
    fontSize: 12,
    marginBottom: 10,
  },
  itemName: {
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "23%",
  },
});
