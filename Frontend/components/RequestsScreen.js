import { BACKEND_URL } from "@env";
import { View, FlatList, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import FriendRequest from "./FriendRequest";
import ItemRequest from "./ItemRequest";
import { Alert } from "react-native";

//Test data to display
let array = [{ name: "Marvin", wohnort: "Berlin Reinickendorf", key: "1" }];

const RequestsScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState({
    occured: false,
    label: ""
  })

  useEffect(() => {
    fetch(BACKEND_URL + "articleRequest")
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { data: incomingRequests } = data;
        setRequests(incomingRequests);
      })
      .catch(err => setError({
        occured: true,
        label: "Something went wrong trying to display incoming requests."
      }))
  }, [])

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.listHeader}>Freunde:</Text>
      <FriendRequest name={array[0].name} wohnort={array[0].wohnort} />

      <Text style={styles.listHeader}>Artikel-Anfrage:</Text>
      {error.occured && alert(error.label)}
      <FlatList
        data={requests}
        renderItem={({ item }) => (
          <ItemRequest
            navigation={navigation}
            besitzer={item.ownerName}
            produktName={item.title}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  listHeader: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    alignSelf: "flex-start",
    margin: 5,
  },
  friendList: {
    height: 58,
  },
});
export default RequestsScreen;
