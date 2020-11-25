import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
export default function ProfileInfoBox() {
  return (
    <View>
      <View style={styles.wrapper}>
        <Image
          style={styles.profilePicture}
          source={require(`../assets/testprofilpic.jpg`)}
        />

        <View style={styles.middleInfo}>
          <Text style={styles.textName}>Talha</Text>
          <Text>Karl-Marx-Straße 34</Text>
          <Text>12043 Berlin Neuköln</Text>
          <Text>Deutschland</Text>
        </View>
        <View style={styles.iconsWrapper}>
          <Feather style={styles.icon} name="phone" size={26} color="grey" />
          <FontAwesome name="envelope-o" size={26} color="grey" />
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.aboutText}>Über mich:</Text>
        <Text>
          Ich bin Hans und ich verleihe hauptsächlich Games und Briefmarken. Mit
          Schachzubehör kann ich auch aushelfen.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
  },
  profilePicture: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginVertical: 5,
    marginLeft: 5,
  },
  middleInfo: {
    marginHorizontal: 15,
  },
  textName: {
    fontWeight: "bold",
  },
  iconsWrapper: {
    position: "absolute",
    right: "2%",
    flexDirection: "row",
    alignSelf: "flex-end",
    alignContent: "flex-end",
    justifyContent: "space-between",
    width: 72,
  },
  about: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingBottom: 3,
  },
  aboutText: {
    fontWeight: "bold",
  },
});
