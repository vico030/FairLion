import React from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import ItemProfile from "./ItemProfile";
var array = [
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "peter",
    produktName: "Stichsäge Holz Metall",
    produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
    verliehen: "Verliehen",
    key: "1",
  },
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "frank",
    produktName: "supercooles mega Produkt mit langem Namen",
    produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
    verliehen: "Verliehen",
    key: "2",
  },
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "langerName",
    produktName: "Stichsäge Holz Metall",
    produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
    verliehen: "Verliehen",
    key: "3",
  },
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "franz",
    produktName: "Stichsäge Holz Metall",
    produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
    verliehen: "Verliehen",
    key: "4",
  },
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "peter",
    produktName: "Stichsäge Holz Metall",
    produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
    verliehen: "Verliehen",
    key: "5",
  },
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "peter",
    produktName: "Stichsäge Holz Metall",
    produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
    verliehen: "Verliehen",
    key: "6",
  },
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "1234567890",
    produktName: "Stichsäge Holz Metall",
    produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
    verliehen: "Verliehen",
    key: "7",
  },
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "peter",
    produktName: "Stichsäge Holz Metall",
    produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
    verliehen: "Verliehen",
    key: "8",
  },
  {
    image: "../assets/testprofilpic.jpg",
    besitzer: "abcdefghij",
    produktName: "Stichsäge Holz Metall",
    produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
    verliehen: "Verliehen",
    key: "9",
  },
];

export default function ProfileStockItemList({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.ItemCountText}>{array.length} Artikel:</Text>

      <FlatList
        style={styles.list}
        data={array}
        renderItem={({ item }) => (
          <ItemProfile
            navigation={navigation}
            besitzer={item.besitzer}
            beschreibung={item.produktBeschreibung}
            produktName={item.produktName}
            verliehen={item.verliehen}
            image={item.image}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  ItemCountText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
