import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-community/async-storage";
import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ItemStock from "./ItemStock";

const StockScreen = ({ navigation }) => {
  const [array, setArray] = useState([]);

  async function getArticles() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    var res;
    var resJson;
    try {
      res = await fetch(
        BACKEND_URL +
          `users/${await AsyncStorage.getItem("userId")}/ownedArticles`,
        requestOptions
      );
      resJson = await res.json();
    } catch (err) {
      console.log(err);
    }
    if (res.status === 200) {
      setArray(await resJson.data);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getArticles();
    });
    return unsubscribe;
  }, [navigation]);

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
        keyExtractor={(item) => item._id}
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
