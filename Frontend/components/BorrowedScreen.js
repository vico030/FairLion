import env from "../env.js";
const {BACKEND_URL} = env;
import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ItemLend from "./ItemLend";
import AsyncStorage from "@react-native-community/async-storage";

const BorrowedScreen = ({ navigation }) => {
  // Test data to display
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
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
      resJson = await res.json();
    } catch (err) {
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
          />
        )}
      />
    </View>
  );
};

export default BorrowedScreen;
