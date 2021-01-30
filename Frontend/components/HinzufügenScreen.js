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
  const [friends, setFriends] = useState([])
  const [disabledUsers, setDisabledUsers] = useState([]);
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

      const array = await cleanOutput(resJson.data, friends)
      setUsers(array);
    }
  };

  const fetchFriends = async () => {
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
    var userId = await AsyncStorage.getItem("userId");
    try {
      res = await fetch(
        BACKEND_URL + `users/${userId}/friends`,
        requestOptions
      );
      resJson = await res.json();
    } catch (err) {
      console.log(err);
    }
    if (res.status === 200) {
      return resJson.data;
      //console.log(resJson.data)
    }
  };

  const fetchFriendRequests = async () => {
    const requestOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    };
    let userId = await AsyncStorage.getItem("userId")

    var res;
    var resJson;
    try {
      res = await fetch(
        BACKEND_URL + `users/${userId}/friendrequests/outgoing`,
        requestOptions
      );

      resJson = await res.json();
    } catch (err) {
      console.log(err);
    }
    if (res.status === 200) {
      let friendRequests = resJson.data;
      console.log("FriendRequests", friendRequests)

      let disabledUsersArray = [];
      for(let user of users) {
        for(let friendRequest of friendRequests) {
          if(user._id == friendRequest.receiverId && !friendRequest.confirmed) {
            disabledUsersArray.push(user._id)
          }
        }
      }
      setDisabledUsers(disabledUsersArray)
      
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
      let friendsTmp = await fetchFriends()
      setFriends(friendsTmp)
      const array = await cleanOutput(resJson.data, friendsTmp)
      //console.log(array);
      setUsers(array);
    }
  }

  const cleanOutput = async (array, friends) => {
    var newArray = [];
    //const friends = JSON.parse(await AsyncStorage.getItem("friends"));
    for (var item of array) {
      let isFriend = false;
      for(let friend of friends) {
        if(friend._id == item._id) isFriend = true;
      }
      if (!(item._id === await AsyncStorage.getItem("userId")) && !(isFriend)) {
        newArray.push(item);
      }
    }
    return newArray;
  }

  useEffect(() => {
    if(users.length!=0) {
      fetchFriendRequests();
    }
  }, [users])


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (searchInput.length === 0) {
        getAllUsers();
      }
    });
    return unsubscribe;
  }, [navigation]);

  console.log("Friend state", friends)
  console.log("Users state", users)
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
          getAllUsers();
          fetchFriendRequests();
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
            disabled={disabledUsers.includes(item._id)}
          />
        )}
      />
    </View>
  );
}
