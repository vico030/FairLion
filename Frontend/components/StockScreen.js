import env from "../env.js";
const {BACKEND_URL} = env;
import AsyncStorage from "@react-native-community/async-storage";
import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ItemStock from "./ItemStock";

const StockScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);

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
      setArticles(await resJson.data);
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
        data={articles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ItemStock
            navigation={navigation}
            besitzer={item.owner}
            produktName={item.title}
            ausleihfrist={item.duration}
            images={item.images}
            kategorie={item.category}
            beschreibung={item.description}
          />
        )}
      />
    </View>
  );
};

export default StockScreen;
