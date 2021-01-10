import { BACKEND_URL } from "@env";
import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ItemLend from "./ItemLend";


const SearchScreen = ({ navigation }) => {
  
  const [articles, setArticles] = useState([]);

  async function getFavourites() {
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
          'favourites',
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
      getFavourites();
    });
    return unsubscribe;
  }, [navigation]);
  
  return (
    <View>
      <SearchBar
        containerStyle={{
          backgroundColor: "#333740",
          height: 48,
          justifyContent: "center",
        }}
        inputContainerStyle={{ backgroundColor: "white", height: 36 }}
        round
        searchIcon={
          <MaterialCommunityIcons name="magnify" color="grey" size={22} />
        }
        placeholder="Suche nach einem Nutzernamen"
      />
      <Text style={styles.text} onPress={() => console.log(articles)}>Meine Favoriten:</Text>
      <FlatList
        data={articles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ItemLend
            navigation={navigation}
            besitzer={item.owner}
            articleId={item._id}
            produktName={item.title}
            beschreibung={item.description}
            ausleihfrist={item.duration}
            images={item.images}
            favored={item.favored}
            kategorie={item.category}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333740",
    marginVertical: 5,
  },
});
export default SearchScreen;
