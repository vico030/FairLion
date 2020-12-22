import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-community/async-storage";
import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import ItemStock from "./ItemStock";

const StockScreen = ({ navigation }) => {
  var array;

  const getArticles = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    };
    var res;
    var resJson;
    try {
      res = await fetch(BACKEND_URL + `users/${await AsyncStorage.getItem("userId")}/ownedArticles`, requestOptions);
      resJson = await res.json();
    }
    catch (err) {
      console.log(err);
    }
    if (res.status === 200) {
      array = await resJson.data;
      console.log(array);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);


  /* array = [
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "1",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "frank",
      produktName: "supercooles mega Produkt mit langem Namen",
      ausleihfrist: "3 Stunden",
      kategorie: "Sonstiges",
      key: "2",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "langerName",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "3",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "franz",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "4",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "5",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "6",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "1234567890",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "7",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "peter",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "8",
    },
    {
      image: "../assets/testprofilpic.jpg",
      besitzer: "abcdefghij",
      produktName: "Stichsäge Holz Metall",
      ausleihfrist: "2 Stunden",
      kategorie: "Werkzeug",
      key: "9",
    },
  ]; */

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
            besitzer={item.owner}
            produktName={item.title}
            ausleihfrist={item.duration}
            image={item.image}
            kategorie={item.category}
          />
        )}
      />
    </View>
  );
};

export default StockScreen;
