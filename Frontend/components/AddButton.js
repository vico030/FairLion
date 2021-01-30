import env from "../env.js";
const {BACKEND_URL} = env;
import AsyncStorage from "@react-native-community/async-storage";
import React, {useState} from "react";
import { Alert } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AddButton({ friendId, disabled:disabledProp }) {

  const [disabled, setDisabled] = useState(false)

  const sendFriendrequest = async () => {
    const requestOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ "receiverId": friendId })
    };

    var res;
    var resJson;
    try {
      res = await fetch(
        BACKEND_URL + `users/${await AsyncStorage.getItem("userId")}/friendrequests`,
        requestOptions
      );

      resJson = await res.json();
    } catch (err) {
      console.log(err);
    }
    if (res.status === 201) {
      console.log(resJson.message)
      setDisabled(true)
      Alert.alert("", "Freundesanfrage wurde versendet!", [{
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }], {
        cancelable: true
      });
    }
  }


  return (
    <TouchableOpacity disabled={disabled || disabledProp}
      onPress={()=>sendFriendrequest()}
    >
      <View style={!disabled && !disabledProp ? styles.button : styles.disabledButton}>
        <Text style={!disabled && !disabledProp ? styles.buttonText : styles.disabledButtonText} numberOfLines={1}>
          Hinzufügen
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: "white",
    borderColor: "#e77e23",
    borderWidth: 1,
    height: 30,
    width: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent: "center",
  },
  disabledButton: {
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: "white",
    borderColor: "#ddd",
    borderWidth: 1,
    height: 30,
    width: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    textAlign: "center",
    borderColor: "#e77e23",
    alignSelf: "center",
    color: "black",
    width: "65%",
    marginHorizontal: 5,
  },
  disabledButtonText: {
    fontSize: 14,
    textAlign: "center",
    borderColor: "#e77e23",
    alignSelf: "center",
    color: "#ddd",
    width: "65%",
    marginHorizontal: 5,
  },
});
