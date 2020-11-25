import { View, Text, FlatList } from "react-native";
import React from "react";
import ItemStock from "./ItemStock";

const StockScreen = ({ navigation }) => {
  let array = [
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      key: "1",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "frank",
      produktName: "supercooles mega Produkt mit langem Namen",
      ausleihfrist: "3 Stunden",
      key: "2",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "langerName",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      key: "3",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "franz",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      key: "4",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      key: "5",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      key: "6",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "1234567890",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      key: "7",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      key: "8",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "abcdefghij",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
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
            besitzer={item.besitzer}
            produktName={item.produktName}
            ausleihfrist={item.ausleihfrist}
            image={item.image}
          />
        )}
      />
    </View>
  );
};

export default StockScreen;
