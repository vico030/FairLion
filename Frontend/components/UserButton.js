import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// change profile pic with correct link and not local
export default function UserButton({ navigation, userName, image }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
      <View style={styles.button}>
        <Image
          style={styles.profileImage}
          source={image}
        />
        <Text style={styles.buttonText} numberOfLines={1}>
          {userName}
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
  },
  buttonText: {
    fontSize: 12,
    textAlign: "center",
    borderColor: "#e77e23",
    alignSelf: "center",
    color: "black",
    width: "65%",
    marginHorizontal: 5,
  },
  profileImage: {
    marginLeft: 2,
    borderRadius: 20,
    height: 22,
    width: 22,
    alignSelf: "center",
  },
});
