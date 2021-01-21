import { BACKEND_URL, IMAGE_URL } from "@env";
import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Friend from "./Friend";
import AsyncStorage from "@react-native-community/async-storage";
import ItemLend from "./ItemLend";
import { ActivityIndicator } from "react-native";

const FriendsScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFriends = async () => {
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
    var userId = await AsyncStorage.getItem("userId");
    try {
      res = await fetch(
        BACKEND_URL + `users/${userId}/friends`,
        requestOptions
      );
      setLoading(false);
      resJson = await res.json();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    if (res.status === 200) {
      setFriends(resJson.data);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchFriends();
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
      {loading && <ActivityIndicator color="#E77F23" size="large" />}
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <Friend
            friendId={item._id}
            name={item.username}
            strasse={item.street}
            plz={item.zipCode}
            wohnort={item.city}
            land={item.country}
            info={item.info}
            email={item.email}
            telefon={item.phone}
            image={IMAGE_URL + item.image}
            artikelzahl={"99999"}
            navigation={navigation}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default FriendsScreen;
