import env from "../env.js";
const { BACKEND_URL } = env;
import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

export default function FavouritesButton({ favored, articleId }) {
  //   console.log(favored);
  //   console.log(articleId);
  let favoredVar = favored;
  const [isFavored, setFavored] = useState(favoredVar);
  const toggleFavorite = async () => {
    const userId = await AsyncStorage.getItem("userId");
    let method = "put";
    if (isFavored) {
      method = "delete";
    }
    const requestOptionsPut = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        articleId: articleId,
      }),
      credentials: "include",
    };
    var res;
    var resJson;
    try {
      res = await fetch(BACKEND_URL + `favourites`, requestOptionsPut);
      resJson = await res.json();
      //   console.log(resJson);
    } catch (err) {
      console.log(err);
    }
    if (res.status === 201) {
      setFavored(!isFavored);
    }
  };

  return (
    <TouchableOpacity onPress={() => toggleFavorite()}>
      {isFavored == true ? (
        <MaterialCommunityIcons name="heart" size={24} color="#333740" />
      ) : (
        <MaterialCommunityIcons
          name="heart-outline"
          size={24}
          color="#333740"
        />
      )}
    </TouchableOpacity>
  );
}
