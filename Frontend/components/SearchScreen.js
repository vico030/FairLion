import env from "../env.js";
const { BACKEND_URL } = env;
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ItemSearch from "./ItemSearch";
import CheckBox from "@react-native-community/checkbox";
import { ActivityIndicator } from "react-native";

const categories = ["Filme", "Bücher", "Spiele", "Musik", "Elektronik", "Werkzeug", "Kleidung", "Haushalt", "Sonstiges", "Filter entfernen"];

const SearchScreen = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState({
    filme: false,
    bücher: false,
    spiele: false,
    musik: false,
    elektronik: false,
    werkzeug: false,
    kleidung: false,
    haushalt: false,
    sonstiges: false
  });
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchArticles = async (input) => {
    setLoading(true);
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
        BACKEND_URL + `articles/query/${input}`,
        requestOptions
      );
      setLoading(false);
      resJson = await res.json();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    console.log(resJson.message);
    if (res.status === 200) {
      let array = [];

      for (const friendArticles of Object.values(resJson.data)) {
        array.push(...friendArticles);
      }
      setArticles(array.filter(el => el.isVisible));
      setSavedArticles(array.filter(el => el.isVisible));
    }
  };

  const handleSearchInputChange = (input) => {
    setSearchInput(input);
    console.log(input);
    if (input.length != 0) {
      setSearching(true);
      fetchArticles(input);
      return;
    }
    else {
      setSearching(false);
      getFavourites();
      return;
    }
  };

  async function getFavourites() {
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
      res = await fetch(BACKEND_URL + "favourites", requestOptions);
      setLoading(false);
      resJson = await res.json();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    if (res.status === 200) {
      let array = await resJson.data;
      setArticles(array.filter(el => el.isVisible));
      setSavedArticles(array.filter(el => el.isVisible));
    }
  }

  function filterArticles() {
    if (selectedCategory) {
      setArticles(savedArticles.filter(el => el.category === selectedCategory));
    }
    else {
      setArticles(savedArticles);
    }
  }

  useEffect(() => {
    filterArticles();
  }, [selectedCategory, searchInput, savedArticles])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => {
          // Filter View
          console.log(filterVisible);
          setFilterVisible(true);
        }}>

          <MaterialCommunityIcons
            name="dns-outline"
            size={28}
            style={styles.rightIcon}
            color={selectedCategory ? "#e77f23" : "white"}
          />
        </TouchableOpacity>
      ),
    });
    const unsubscribe = navigation.addListener("focus", () => {
      if (searchInput.length === 0) {
        getFavourites();
      };
    });
    return unsubscribe;
  }, [navigation, searchInput]);

  return (
    <View>
      <Modal
        animationType="fade"
        visible={filterVisible}
        transparent={true}
        onRequestClose={() => {
          console.log(filterVisible);
          setFilterVisible(!filterVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.text}>Kategorie filtern</Text>
          <View style={styles.verticalLine} />

          {categories.map(category => {
            const lowerCaseCategory = category.toLowerCase();
            const selectedCategory = category.includes("entfernen") ? "" : lowerCaseCategory;
            const newActiveFilter = { ...activeFilter };
            for (const filter of Object.keys(newActiveFilter)) {
              if (newActiveFilter[filter]) newActiveFilter[filter] = false;
            }
            return (
              <View style={styles.element} key={category}>
                <Text style={styles.elementTextLeft}>{category}</Text>
                <CheckBox
                  disabled={false}
                  value={activeFilter[lowerCaseCategory]}
                  onValueChange={() => {
                    setArticles(savedArticles);
                    setActiveFilter({
                      ...newActiveFilter,
                      [lowerCaseCategory]: selectedCategory ? true : false
                    })
                    setSelectedCategory(selectedCategory);
                    setFilterVisible(!filterVisible);
                  }
                  }
                />
              </View>
            )
          })}
        </View>
      </Modal>

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
          handleSearchInputChange("");
          //setArticles([]);
        }}
      />

      {searching ? (
        articles.length === 0 ? (
          !loading &&
          <Text style={styles.infoText}>Leider nichts gefunden!{"\n"}:(</Text>
        ) : (
            <Text style={styles.text}> Suchergebnisse: </Text>
          )
      ) : articles.length === 0 ? (
        !loading &&
        <Text style={styles.infoText}>
          Hier erscheinen Artikel, die du als Favoriten gekennzeichnet hast!
        </Text>
      ) :
          (<Text style={styles.text}> Meine Favoriten: </Text>)
      }
      {loading && <ActivityIndicator color="#E77F23" size="large" />}

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
            returnDate={item.returnDate}
            beschreibung={item.description}
            favored={item.favourite}
            status={item.status}
            articleId={item._id}
            user={item.user}
            borrower={item.borrower}
            isVisible={item.isVisible}
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
  rightIcon: {
    color: "#fff",
    marginRight: 15,
  },
  modalView: {
    margin: 10,
    marginTop: 60,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  verticalLine: {
    borderBottomColor: "#CFCFCF",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  element: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  elementTextLeft: {
    fontSize: 12,
  },
  elementTextRight: {
    fontSize: 12,
    textAlign: "right",
  },
});
export default SearchScreen;
