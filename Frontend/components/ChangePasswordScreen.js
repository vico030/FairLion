import env from "../env.js";
const { BACKEND_URL } = env;
import React, { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export const ChangePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  

  const submitPassword = async () => {
    if (!password || !confirmPassword || (!password && !confirmPassword)) {
      Alert.alert("Fehler", "Es müssen beide Felder ausgefüllt sein!");
    } else if (password === confirmPassword) {

      const email = await AsyncStorage.getItem("email");

      const formdata = new FormData();
      formdata.append("password", password);

      let res;
      let requestOptions = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      try {
        res = await fetch(
          BACKEND_URL +
            `auth/pwchange`,
          requestOptions
        );
      } catch (err) {
        console.log(err);
      }
      if (res.status === 200) {
        const resJson = await res.json();
        Alert.alert(
          "Update erfolgreich",
          "Dein Passwort wurde erfolgreich gesetzt und ist ab dem nächsten Login erforderlich."
        );
      } else {
        const errMess = await res.json();
        Alert.alert("Update gescheitert ", errMess.message);
      }
      navigation.goBack();
    } else {
      Alert.alert("Fehler", "Die Passwörter stimmen nicht überein!");
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.view}>
        <View style={styles.textContainer}>
          <Text style={styles.baseText}>
            Geben Sie ein Ihr neues Passwort ein:
          </Text>
        </View>

        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Passwort"
            placeholderTextColor="#7E7E7E"
            clearButtonMode="while-editing"
            onChangeText={(value) => handlePasswordChange(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Passwort bestätigen"
            placeholderTextColor="#7E7E7E"
            clearButtonMode="while-editing"
            onChangeText={(value) => handleConfirmPasswordChange(value)}
          />
        </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.submitBtn} onPress={submitPassword}>
          <Text style={styles.submitText}>Absenden</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: 30,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: "100%",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    paddingVertical: 15,
  },
  baseText: {
    fontSize: 14,
    marginHorizontal: 20,
  },
  inputView: {
    width: "100%",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    height: 50,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 16,
    height: 50,
    color: "#000",
    marginLeft: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtn: {
    width: "80%",
    backgroundColor: "#E77F23",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  submitText: {
    color: "#fff",
    fontSize: 20,
  },
});
