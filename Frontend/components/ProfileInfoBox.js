import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
export default function ProfileInfoBox() {
  return (
    <View style={{backgroundColor: "#fff"}}>

      <View style={styles.wrapper}>
        
        <Image
          style={styles.profilePicture}
          source={require(`../assets/testprofilpic.jpg`)}
        />

        <View style={styles.middleInfo}>
          <Text style={styles.textName}>Talha</Text>
          <Text stlye={styles.userAddress}>Karl-Marx-Straße 34</Text>
          <Text stlye={styles.userAddress}>12043 Berlin Neuköln</Text>
          <Text stlye={styles.userAddress}>Deutschland</Text>
        </View>

        <View style={styles.iconsWrapper}>
          <Feather style={styles.icon} name="phone" size={26} color="grey" />
          <FontAwesome name="envelope-o" size={26} color="grey" />
        </View>

      </View>

      <View style={styles.divider} />

      <View style={styles.about}>
        <Text style={styles.aboutHeader}>Über mich:</Text>
        <Text>
          Ich bin Hans und ich verleihe hauptsächlich Games und Briefmarken. Mit
          Schachzubehör kann ich auch aushelfen.
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
    padding: 15,
  },
  profilePicture: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  middleInfo: {
    marginHorizontal: 15,
    justifyContent: "center",
  },
  textName: {
    fontSize: 16,
    fontWeight: "700",
  },
  userAddress: {
    fontWeight: "300",
  },
  iconsWrapper: {
    position: "absolute",
    right: 15,
    flexDirection: "row",
    alignSelf: "flex-end",
    alignContent: "flex-end",
    justifyContent: "space-between",
    width: 72,
  },
  divider: {
    margin: 15,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  about: {
    padding: 15,
    paddingTop: 0,
    fontWeight: "300",
  },
  aboutHeader: {
    fontWeight: "700",
  },
});
