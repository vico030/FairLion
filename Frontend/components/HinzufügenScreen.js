import env from "../env.js";
const {BACKEND_URL, IMAGE_URL} = env;
import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddFriend from "./AddFriend";
import AsyncStorage from "@react-native-community/async-storage";

export default function HinzufügenScreen({ navigation }) {
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);
  const [searching, setSearching] = useState(false);

  const fetchUsers = async () => {
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
        BACKEND_URL + `users/query/${searchInput}`,
        requestOptions
      );

      resJson = await res.json();
    } catch (err) {
      console.log(err);
    }
    if (res.status === 200) {

      const array = cleanOutput(await resJson.data)
      setUsers(await array);
    }
  };

  const handleSearchInputChange = (input) => {
    setSearchInput(input);
    console.log(input);
    if (input.length != 0) {
      setSearching(true);
      setUsers([]);
      fetchUsers();
    }
    else {
      setSearching(false);
      getAllUsers();
    }
  };

  async function getAllUsers() {
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
      res = await fetch(BACKEND_URL + "users", requestOptions);
      resJson = await res.json();
    } catch (err) {
      console.log(err);
    }
    if (res.status === 200) {
      const array = await cleanOutput(await resJson.data)
      console.log(array);
      setUsers(array);
    }
  }

  const cleanOutput = async (array) => {
    var newArray = [];
    const friends = JSON.parse(await AsyncStorage.getItem("friends"));
    for (var item of array) {
      if (!(item._id === await AsyncStorage.getItem("userId") || friends?.includes(item._id))) {
        newArray.push(item);
      }
    }

    return newArray;
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (searchInput.length === 0) getAllUsers();
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
        value={searchInput}
        onChangeText={(input) => handleSearchInputChange(input)}
        onClear={() => {
          setArticles([]);
          console.log(articles);
        }}
      />


      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <AddFriend
            name={item.username}
            wohnort={item.city}
            image={IMAGE_URL + item.image}
            friendId={item._id}
          />
        )}
      />
    </View>
  );
}
