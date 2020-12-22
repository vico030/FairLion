import { View, Text, FlatList } from "react-native";
import React from "react";
import ItemStock from "./ItemStock";

const StockScreen = ({ navigation }) => {
  let array = [
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "1",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "frank",
      produktName: "supercooles mega Produkt mit langem Namen",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "3 Stunden",
      kategorie: "Sonstiges",
      key: "2",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "langerName",
      produktName: "Stichsäge Holz Metall",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "3",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "franz",
      produktName: "Stichsäge Holz Metall",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "4",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "5",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "6",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "1234567890",
      produktName: "Stichsäge Holz Metall",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "7",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "8",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "abcdefghij",
      produktName: "Stichsäge Holz Metall",
      produktBeschreibung: "Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits. Etwas ältere aber immer noch sehr brauchbare Schlagbohrmaschine von Bosch. Inklusive Griff und diversen Bohrköpfen und Bits.",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "9",
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
          <ItemStock
            navigation={navigation}
            besitzer={item.besitzer}
            produktName={item.produktName}
            beschreibung = {item.produktBeschreibung}
            ausleihfrist={item.ausleihfrist}
            image={item.image}
            kategorie={item.kategorie}
          />
        )}
      />
    </View>
  );
};

export default StockScreen;
