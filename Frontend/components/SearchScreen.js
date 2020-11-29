import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ItemLend from "./ItemLend";
// Test data to display
let array = [
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "peter",
    produktName: "Stichsäge Holz Metall",
    ausleihfrist: "2 Stunden",
    key: "1",
    favored: true,
  },
  {
    image: "../asset/stestprofilpic.jpg",
    besitzer: "frank fritz",
    produktName: "Stichsäge",
    ausleihfrist: "3 Stunden",
    key: "2",
    favored: true,
  },
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "peter",
    produktName: "Stichsäge Holz Metall",
    ausleihfrist: "2 Stunden",
    key: "3",
    favored: true,
  },
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "peter",
    produktName: "Stichsäge Holz Metall",
    ausleihfrist: "2 Stunden",
    key: "4",
    favored: true,
  },
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "peter",
    produktName: "Stichsäge Holz Metall",
    ausleihfrist: "2 Stunden",
    key: "5",
    favored: true,
  },
];

const SearchScreen = ({ navigation }) => {
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
      <Text style={styles.text}>Meine Favoriten:</Text>
      <FlatList
        data={array}
        renderItem={({ item }) => (
          <ItemLend
            navigation={navigation}
            besitzer={item.besitzer}
            produktName={item.produktName}
            ausleihfrist={item.ausleihfrist}
            image={item.image}
            favored={item.favored}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333740",
    marginVertical: 5,
  },
});
export default SearchScreen;
