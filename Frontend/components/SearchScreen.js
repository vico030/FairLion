import env from "../env.js";
const { BACKEND_URL } = env;
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ItemSearch from "./ItemSearch";
import CheckBox from "@react-native-community/checkbox";
import { ActivityIndicator } from "react-native";

const SearchScreen = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [articles, setArticles] = useState([]);
  let savedArticles = [];
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

  const fetchArticles = async () => {
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
        BACKEND_URL + `articles/query/${searchInput}`,
        requestOptions
      );
      setLoading(false);
      resJson = await res.json();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    if (res.status === 200) {
      let array = [];

      for (const friendArticles of Object.values(resJson.data)) {
        array.push(...friendArticles);
      }

      setArticles(array);
      savedArticles=array;
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
    if (input.length != 0) {
      fetchArticles();
    };
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
      setArticles(await resJson.data);
      savedArticles = await resJson.data;
    }
  }

  function filterArticles(category) {
    setArticles(articles.filter(el => el.category===category))
  }


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
  }, [navigation]);

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

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Filme</Text>
            <CheckBox
              disabled={false}
              value={activeFilter.filme}
              onValueChange={() => {
                setArticles(savedArticles);
                setActiveFilter({
                  filme: true,
                  bücher: false,
                  spiele: false,
                  musik: false,
                  elektronik: false,
                  werkzeug: false,
                  kleidung: false,
                  haushalt: false,
                  sonstiges: false
                });
                filterArticles("filme");
                setFilterVisible(!filterVisible);
              }
              }
            />
          </View>

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Bücher</Text>
            <CheckBox
              disabled={false}
              value={activeFilter.bücher}
              onValueChange={() => {
                setArticles(savedArticles);
                setActiveFilter({
                  filme: false,
                  bücher: true,
                  spiele: false,
                  musik: false,
                  elektronik: false,
                  werkzeug: false,
                  kleidung: false,
                  haushalt: false,
                  sonstiges: false
                });
                filterArticles("bücher");
                setFilterVisible(!filterVisible);
              }
              }
            />
          </View>

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Spiele</Text>
            <CheckBox
              disabled={false}
              value={activeFilter.spiele}
              onValueChange={() => {
                setArticles(savedArticles);
                setActiveFilter({
                  filme: false,
                  bücher: false,
                  spiele: true,
                  musik: false,
                  elektronik: false,
                  werkzeug: false,
                  kleidung: false,
                  haushalt: false,
                  sonstiges: false
                });
                filterArticles("spiele");
                setFilterVisible(!filterVisible);
              }
              }
            />
          </View>

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Musik</Text>
            <CheckBox
              disabled={false}
              value={activeFilter.musik}
              onValueChange={() => {
                setArticles(savedArticles);
                setActiveFilter({
                  filme: false,
                  bücher: false,
                  spiele: false,
                  musik: true,
                  elektronik: false,
                  werkzeug: false,
                  kleidung: false,
                  haushalt: false,
                  sonstiges: false
                });
                filterArticles("musik");
                setFilterVisible(!filterVisible);
              }
              }
            />
          </View>

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Elektronik</Text>
            <CheckBox
              disabled={false}
              value={activeFilter.elektronik}
              onValueChange={() => {
                setArticles(savedArticles);
                setActiveFilter({
                  filme: false,
                  bücher: false,
                  spiele: false,
                  musik: false,
                  elektronik: true,
                  werkzeug: false,
                  kleidung: false,
                  haushalt: false,
                  sonstiges: false
                });
                filterArticles("elektronik");
                setFilterVisible(!filterVisible);
              }
              }
            />
          </View>

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Werkzeug</Text>
            <CheckBox
              disabled={false}
              value={activeFilter.werkzeug}
              onValueChange={() => {
                setArticles(savedArticles);
                setActiveFilter({
                  filme: false,
                  bücher: false,
                  spiele: false,
                  musik: false,
                  elektronik: false,
                  werkzeug: true,
                  kleidung: false,
                  haushalt: false,
                  sonstiges: false
                });
                filterArticles("werkzeug");
                setFilterVisible(!filterVisible);
              }
              }
            />
          </View>

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Kleidung</Text>
            <CheckBox
              disabled={false}
              value={activeFilter.kleidung}
              onValueChange={() => {
                setArticles(savedArticles);
                setActiveFilter({
                  filme: false,
                  bücher: false,
                  spiele: false,
                  musik: false,
                  elektronik: false,
                  werkzeug: false,
                  kleidung: true,
                  haushalt: false,
                  sonstiges: false
                });
                filterArticles("kleidung");
                setFilterVisible(!filterVisible);
              }
              }
            />
          </View>

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Haushalt</Text>
            <CheckBox
              disabled={false}
              value={activeFilter.haushalt}
              onValueChange={() => {
                setArticles(savedArticles);
                setActiveFilter({
                  filme: false,
                  bücher: false,
                  spiele: false,
                  musik: false,
                  elektronik: false,
                  werkzeug: false,
                  kleidung: false,
                  haushalt: true,
                  sonstiges: false
                });
                filterArticles("haushalt");
                setFilterVisible(!filterVisible);
              }
              }
            />
          </View>

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Sonstiges</Text>
            <CheckBox
              disabled={false}
              value={activeFilter.sonstiges}
              onValueChange={() => {
                setArticles(savedArticles);
                setActiveFilter({
                  filme: false,
                  bücher: false,
                  spiele: false,
                  musik: false,
                  elektronik: false,
                  werkzeug: false,
                  kleidung: false,
                  haushalt: false,
                  sonstiges: true
                });
                filterArticles("sonstiges");
                setFilterVisible(!filterVisible);
              }
              }
            />
          </View>

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Filter entfernen</Text>
            <CheckBox
              disabled={false}
              value={false}
              onValueChange={() => {
                setActiveFilter({
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
                setArticles(savedArticles);
                setFilterVisible(!filterVisible);
              }
              }
            />
          </View>

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
          setArticles([]);
          console.log(articles);
        }}
      />

      {searching ? (
        articles.length === 0 ? (
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
            beschreibung={item.description}
            favored={item.favourite}
            status={item.status}
            articleId={item._id}
            user={item.user}
            borrower={item.borrower}
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
