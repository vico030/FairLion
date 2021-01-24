import env from "../env.js";
const { BACKEND_URL } = env;
import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ItemSearch from "./ItemSearch";
import AsyncStorage from "@react-native-community/async-storage";

const SearchScreen = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [articles, setArticles] = useState([]);
  const [searching, setSearching] = useState(false);

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
      res = await fetch(
        BACKEND_URL + `articles/query/${searchInput}`,
        requestOptions
      );

      resJson = await res.json();
    } catch (err) {
      console.log(err);
    }
    if (res.status === 200) {
      let array = [];

      for (const friendArticles of Object.values(resJson.data)) {
        array.push(...friendArticles);
      }

      setArticles(array);
    }
  };

  const handleSearchInputChange = (input) => {
    setSearchInput(input);
    console.log(input);
    if (input.length != 0) setSearching(true);
    else {
      setSearching(false);
      getFavourites();
    }
    setArticles([]);
    if (input.length != 0) fetchArticles();
  };

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
      res = await fetch(BACKEND_URL + "favourites", requestOptions);
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
      if (searchInput.length === 0) getFavourites();
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
        inputContainerStyle={{
          backgroundColor: "white",
          height: 36,
        }}
        round
        searchIcon={
          <MaterialCommunityIcons name="magnify" color="grey" size={22} />
        }
        placeholder="Wonach suchst du?"
        value={searchInput}
        onChangeText={(input) => handleSearchInputChange(input)}
        onClear={() => {
          setArticles([]);
          console.log(articles);
        }}
      />

      {searching ? (
        articles.length === 0 ?
          (<Text style={styles.infoText}>Leider nichts gefunden!{"\n"}:(
          </Text>)
          :
          (<Text style={styles.text}> Suchergebnisse: </Text>)
      ) : (
          articles.length === 0 ?
            (<Text style={styles.infoText}>Hier erscheinen Artikel, die du als Favoriten gekennzeichnet hast!</Text>)
            :
            (<Text style={styles.text}> Meine Favoriten: </Text>)
        )}

      <FlatList
        data={articles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ItemSearch
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
};
const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333740",
    marginVertical: 5,
  },
  infoText: {
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333740",
    top: "50%",
    fontSize: 20,
    textAlign: "center",
  },
});
export default SearchScreen;
