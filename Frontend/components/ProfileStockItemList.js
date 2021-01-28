import env from "../env.js";
const { BACKEND_URL } = env;
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import ItemProfile from "./ItemProfile";
import AsyncStorage from "@react-native-community/async-storage";

export default function ProfileStockItemList({ artikelzahl, navigation, id }) {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const requestOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    };

    var res;
    var resJson;
    try {
      const favourerId = await AsyncStorage.getItem("userId");
      console.log(favourerId)
      res = await fetch(
        BACKEND_URL + `users/${id}/ownedArticles/${favourerId}`,
        requestOptions
      );

      resJson = await res.json();
    } catch (err) {
      console.log(err);
    }
    if (res.status === 200) {
      setArticles(resJson.data);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setArticles([]);
      fetchArticles();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.ItemCountText}>{artikelzahl} Artikel:</Text>

      <FlatList
        style={styles.list}
        data={articles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ItemProfile
            navigation={navigation}
            besitzer={item.owner}
            produktName={item.title}
            ausleihfrist={item.duration}
            images={item.images}
            kategorie={item.category}
            beschreibung={item.description}
            favored={item.favourite}
            status={item.status}
            articleId={item._id}
            user={item.user}
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
