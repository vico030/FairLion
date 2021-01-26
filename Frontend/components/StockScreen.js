import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-community/async-storage";
import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ItemStock from "./ItemStock";
import { ActivityIndicator } from "react-native";

const StockScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getArticles() {
    setLoading(true);
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
      setLoading(false);
      resJson = await res.json();
    } catch (err) {
      setLoading(false);
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
      {loading && <ActivityIndicator color="#E77F23" size="large" />}
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
            borrower={item.borrower}
          />
        )}
      />
    </View>
  );
};

export default StockScreen;
