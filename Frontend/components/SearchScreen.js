import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ItemSearch from "./ItemSearch";
import { BACKEND_URL } from "@env";
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
    else setSearching(false);
    setArticles([]);
    if (input.length != 0) fetchArticles();
  };

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
        <Text style={styles.text}> Suchergebnisse: </Text>
      ) : (
        <Text style={styles.text}> Meine Favoriten: </Text>
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
