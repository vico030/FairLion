import env from "../env.js";
const { BACKEND_URL } = env;
import { View, FlatList, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ItemLend from "./ItemLend";
import AsyncStorage from "@react-native-community/async-storage";
import { ActivityIndicator } from "react-native";

const BorrowedScreen = ({ navigation }) => {
  // Test data to display
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const getArticles = async () => {
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
        `users/${await AsyncStorage.getItem("userId")}/borrowedArticles`,
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
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getArticles();
      console.log(articles);
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
      {articles.length === 0 && !loading &&
        <Text style={styles.infoText}>Hier erscheinen Artikel, die du dir ausgeliehen hast!</Text>
      }
      {loading && <ActivityIndicator color="#E77F23" size="large" />}
      <FlatList
        data={articles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ItemLend
            navigation={navigation}
            besitzer={item.owner}
            produktName={item.title}
            beschreibung={item.description}
            ausleihfrist={item.duration}
            images={item.images}
            kategorie={item.category}
            returnDate={new Date(item.returnDate)}
            articleId={item._id}
            user={item.user}
          />
        )}
      />
    </View>
  );
};

export default BorrowedScreen;

const styles = StyleSheet.create({
  infoText: {
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333740",
    top: "50%",
    fontSize: 20,
    textAlign: "center",
  },
});