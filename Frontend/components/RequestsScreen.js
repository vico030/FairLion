import { View, FlatList, Text, StyleSheet } from "react-native";
import React from "react";
import FriendRequest from "./FriendRequest";
import ItemRequest from "./ItemRequest";

//Test data to display
let array = [{ name: "Marvin", wohnort: "Berlin Reinickendorf", key: "1" }];
let arrayItems = [
  {
    image: "../assetstestprofilpic.jpg",
    besitzer: "peter",
    produktName: "Stichsäge",
    ausleihfrist: "2 Stunden",
    key: "1",
  },
  {
    image: "../assetstestprofilpic.jpg",
    besitzer: "frank",
    produktName: "Stichsäge Holz Metall",
    ausleihfrist: "3 Stunden",
    key: "2",
  },
  {
    image: "../assetstestprofilpic.jpg",
    besitzer: "peter",
    produktName: "Stichsäge Holz Metall",
    ausleihfrist: "2 Stunden",
    key: "3",
  },
  {
    image: "../assetstestprofilpic.jpg",
    besitzer: "peter",
    produktName: "Stichsäge Holz Metall",
    ausleihfrist: "2 Stunden",
    key: "4",
  },
  {
    image: "../assetstestprofilpic.jpg",
    besitzer: "peter",
    produktName: "Stichsäge Holz Metall",
    ausleihfrist: "2 Stunden",
    key: "5",
  },
];
const RequestsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.listHeader}>Freunde:</Text>
      <FriendRequest name={array[0].name} wohnort={array[0].wohnort} />

      <Text style={styles.listHeader}>Artikel-Anfrage:</Text>
      <FlatList
        data={arrayItems}
        renderItem={({ item }) => (
          <ItemRequest
            besitzer={item.besitzer}
            produktName={item.produktName}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  listHeader: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    alignSelf: "flex-start",
    margin: 5,
  },
  friendList: {
    height: 58,
  },
});
export default RequestsScreen;
