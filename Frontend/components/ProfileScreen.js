import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProfileInfoBox from "./ProfileInfoBox";
import ProfileStockItemList from "./ProfileStockItemList";
const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ProfileInfoBox />
      <ProfileStockItemList navigation={navigation} />
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ddd",
  },
});
