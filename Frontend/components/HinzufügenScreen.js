import React from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddFriend from "./AddFriend";
export default function HinzufügenScreen() {
  return (
    <View>
      <SearchBar
        containerStyle={{
          backgroundColor: "#333740",
          height: 48,
          justifyContent: "center",
        }}
        inputContainerStyle={{ backgroundColor: "white", height: 36 }}
        round
        searchIcon={
          <MaterialCommunityIcons name="magnify" color="grey" size={22} />
        }
        placeholder="Suche nach einem Nutzernamen"
      />

      <AddFriend name="Marvin" wohnort="Berlin Reinickendorf" />
      <AddFriend name="hallo" wohnort="test" />
    </View>
  );
}
