import env from "../env.js";
const { BACKEND_URL } = env;
import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { AuthContext } from "../context";

const SettingsScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  async function deleteAccount() {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    };
    let res;
    let resJson;
    try {
      res = await fetch(BACKEND_URL + `users/${await AsyncStorage.getItem("userId")}`, requestOptions);
      resJson = await res.json();
    } catch (error) {
      console.log(error);
    }
    if (res.status === 200) {
      signOut();
    }
    else {
      Alert.alert("Fehler", resJson.message);
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.subMenuBottom}>
          <Text style={styles.buttonText}>Über fairLION</Text>
          <MaterialIcons name="chevron-right" size={24} color="#bbb" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.subMenu}>
          <Text style={styles.buttonText}>FAQ</Text>
          <MaterialIcons name="chevron-right" size={24} color="#bbb" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.subMenu}>
          <Text style={styles.buttonText}>Nutzungsbedingungen</Text>
          <MaterialIcons name="chevron-right" size={24} color="#bbb" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.subMenu}>
          <Text style={styles.buttonText}>Datenschutzerklärung</Text>
          <MaterialIcons name="chevron-right" size={24} color="#bbb" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.subMenuBottom}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.buttonText}>Passwort ändern</Text>
          <MaterialIcons name="chevron-right" size={24} color="#bbb" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            Alert.alert("Account löschen", "Möchten Sie Ihren FairLion Account wirklich löschen?",
              [
                {
                  text: "Nein",
                  style: "cancel"
                },
                { text: "Ja", onPress: () => deleteAccount() }
              ])
          }
        >
          <Text style={styles.deleteText}>Account löschen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const dividerColor = "#ddd";

const styles = StyleSheet.create({
  main: {
    paddingTop: 30,
  },
  container: {
    backgroundColor: "#fff",
    marginBottom: 25,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: dividerColor,
  },
  subMenu: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: dividerColor,
    marginLeft: 15,
  },
  subMenuBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginLeft: 15,
  },
  buttonText: {
    width: "90%",
    fontSize: 16,
    fontWeight: "300",
  },
  deleteButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    fontSize: 16,
    color: "red",
  },
});

export default SettingsScreen;
