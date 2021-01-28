import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
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
          <Text style={styles.buttonText}>Password ändern</Text>
          <MaterialIcons name="chevron-right" size={24} color="#bbb" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.deleteButton}>
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
