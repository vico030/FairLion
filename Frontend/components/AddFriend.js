import React from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import AddButton from "./AddButton";
export default function AddFriend({ name, wohnort, image, friendId }) {
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.profilePicture}
        source={{uri: image}}
      />

      <View style={styles.wrapperRight}>
        <View style={styles.upperRowRight}>
          <Text style={styles.userName}>{name}</Text>
        </View>
        <View style={styles.bottomRowRight}>
          <Text style={styles.wohnort}>{wohnort}</Text>
          <AddButton friendId={friendId}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    flexDirection: "row",
    marginVertical: 3,
    width: Dimensions.get("window").width - 5,
  },
  profilePicture: {
    height: 49,
    width: 49,
    borderRadius: 35,
    marginVertical: 5,
    marginLeft: 5,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Roboto",
  },
  wohnort: {
    fontFamily: "Roboto",
    width: "auto",
  },
  bottomRowRight: {
    marginLeft: 5,
    // paddingRight: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperRowRight: {
    marginLeft: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapperRight: {
    justifyContent: "center",
    width: Dimensions.get("window").width - 60,
    paddingHorizontal: 10,
  },
});
