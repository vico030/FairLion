import React from "react";
import env from "../env.js";
const {BACKEND_URL} = env;
import { View, Text, StyleSheet, Image, Dimensions, Alert, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

export default function ProfileInfoBox({
  name,
  wohnort,
  artikelzahl,
  image,
  friendId,
  strasse,
  plz,
  land,
  info,
  email,
  telefon,
  navigation
}) {

  const alertDelete = () => {
    Alert.alert(
      "Freund entfernen",
      "Achtung! Möchtest Du "+name+" wirklich als Freund entfernen?",
      [
        {
          text: "Abbrechen",
          style: "cancel"
        },
        { text: "Ja", onPress: () => deleteFriend() }
      ],
      { cancelable: false }
    );
  }

  const deleteFriend = async () => {
    console.log("Removing Friend "+friendId)
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    var res;
    var resJson;
    try {
      res = await fetch(
        BACKEND_URL +
          `users/${await AsyncStorage.getItem("userId")}/friends/${friendId}`,
        requestOptions
      );
      resJson = await res.json();
    } catch (err) {
      console.log(err);
    }
    if (res.status === 200) {
      Alert.alert("Du bist nun nicht mehr mit "+name+" befreundet.")
      navigation.goBack()
    }
  }
  return (
    <View style={{ backgroundColor: "#fff" }}>

      <View style={styles.wrapper}>

        <Image
          style={styles.profilePicture}
          source={{uri: image}}
        />

        <View style={styles.middleInfo}>
          <Text style={styles.textName}>{name}</Text>
          <Text stlye={styles.userAddress}>{strasse}</Text>
          <Text stlye={styles.userAddress}>{plz} {wohnort}</Text>
          <Text stlye={styles.userAddress}>{land}</Text>
        </View>

        <TouchableOpacity onPress={() => alertDelete()}>
            <MaterialCommunityIcons name="account-remove-outline" size={26} color="grey" />
        </TouchableOpacity>
        
        <View style={styles.iconsWrapper}>
          <Feather style={styles.icon} name="phone" size={26} color="grey" />
          <FontAwesome name="envelope-o" size={26} color="grey" />
        </View>

      </View>

      <View style={styles.divider} />

      <View style={styles.about}>
        <Text style={styles.aboutHeader}>Über mich:</Text>
        <Text>{info}</Text>
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
