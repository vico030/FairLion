import env from "../env.js";
const { BACKEND_URL } = env;
import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
export default function ProfileInfoBox({
  name,
  wohnort,
  artikelzahl,
  image,
  strasse,
  plz,
  land,
  info,
  email,
  telefon,
  friendId,
  navigation
}) {

  async function unFriend() {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    let res;
    let resJson;
    let success;
    try {
      res = await fetch(BACKEND_URL + `users/${await AsyncStorage.getItem("userId")}/friends/${friendId}`, requestOptions);
      resJson = await res.json();

    }
    catch(err){
      console.log(err);
    }
    if(res.status===201){
      navigation.goBack();
    }
    else {
      Alert.alert("Fehler", resJson.message);
    }
  }

  return (
    <View style={{ backgroundColor: "#fff" }}>

      <View style={styles.wrapper}>

        <Image
          style={styles.profilePicture}
          source={{ uri: image }}
        />

        <View style={styles.middleInfo}>
          <Text style={styles.textName}>{name}</Text>
          <Text stlye={styles.userAddress}>{strasse}</Text>
          <Text stlye={styles.userAddress}>{plz} {wohnort}</Text>
          <Text stlye={styles.userAddress}>{land}</Text>
        </View>

        <TouchableOpacity style={styles.deleteFriend} onPress={() => {
          Alert.alert("Freund entfernen", "Wirklich entfernen?", [
            {
              text: "Nein",
              style: "cancel"
            },
            { text: "Ja", onPress: () => unFriend() }
          ])

        }}>
          <Feather
            name="trash"
            size={24}
            color="grey"
          />
        </TouchableOpacity>

        <View style={styles.iconsWrapper}>
          <TouchableOpacity onPress={async () => {
            await Linking.openURL("tel://" + telefon);
          }}>
            <Feather style={styles.icon} name="phone" size={26} color="grey" />
          </TouchableOpacity>

          <TouchableOpacity onPress={async () => {
            await Linking.openURL("mailto://" + email);
          }}>
            <FontAwesome name="envelope-o" size={26} color="grey" />
          </TouchableOpacity>
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
  deleteFriend:{
    paddingTop: 15,
    position: "absolute",
    right: 15,
  }
});
