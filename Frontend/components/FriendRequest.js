import React from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function FriendRequest({ name, wohnort }) {
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.profilePicture}
        source={require(`../assets/testprofilpic.jpg`)}
      />

      <View style={styles.wrapperRight}>
        <View style={styles.upperRowRight}>
          <Text style={styles.userName}>{name}</Text>
        </View>
        <View style={styles.bottomRowRight}>
          <Text style={styles.wohnort}>{wohnort}</Text>
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
    marginVertical: 3,
    width: Dimensions.get("window").width - 5,
  },
  profilePicture: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginVertical: 5,
    marginLeft: 5
  },
  userName: {
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Roboto",
  },
  wohnort: {
    fontFamily: "Roboto",
    width: 'auto'
  },
  bottomRowRight: {
    marginLeft: 5,
    paddingRight: 5,
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
    width:Dimensions.get('window').width - 80,
    paddingHorizontal: 10,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 72,
  },
});
