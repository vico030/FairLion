import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AddButton() {
  return (
    <TouchableOpacity>
      <View style={styles.button}>
        <Text style={styles.buttonText} numberOfLines={1}>
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
  buttonText: {
    fontSize: 14,
    textAlign: "center",
    borderColor: "#e77e23",
    alignSelf: "center",
    color: "black",
    width: "65%",
    marginHorizontal: 5,
  },
});
