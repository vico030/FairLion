import { View, FlatList } from "react-native";
import React from "react";
import ItemLend from "./ItemLend";
import AsyncStorage from "@react-native-community/async-storage";

const BorrowedScreen = ({ navigation }) => {
  // Test data to display
  let array = [
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter Lustig",
      produktName: "Stichsäge Holz Metall",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "2 Stunden",
      key: "1",
    },
    {
      image: "../asset/stestprofilpic.jpg",
      besitzer: "frank fritz",
      produktName: "Stichsäge",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "3 Stunden",
      key: "2",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "2 Stunden",
      key: "3",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "2 Stunden",
      key: "4",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "2 Stunden",
      key: "5",
    },
  ];

  
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 3,
      }}
    >
      <FlatList
        data={array}
        renderItem={({ item }) => (
          <ItemLend
            navigation={navigation}
            besitzer={item.besitzer}
            produktName={item.produktName}
            beschreibung={item.produktBeschreibung}
            ausleihfrist={item.ausleihfrist}
            image={item.image}
          />
        )}
      />
    </View>
  );
};

export default BorrowedScreen;
