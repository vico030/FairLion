import env from "../env.js";
const { BACKEND_URL, IMAGE_URL } = env;
import { View, FlatList, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FriendRequest from "./FriendRequest";
import ItemRequest from "./ItemRequest";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "../context";
import { Alert } from "react-native";

const RequestsScreen = ({ navigation }) => {
  const [articleRequests, setArticleRequests] = useState([]);
  const [friendRequests, setFiendRequests] = useState([]);
  const [error, setError] = useState({
    occured: false,
    label: ""
  });
  const [userId, setUserId] = useState(null);
  const { signOut } = useContext(AuthContext);

  const acceptFriendRequest = id => {
    fetch(`${BACKEND_URL}users/${userId}/friendrequests/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        confirmed: true
      })
    })
      .then(response => {
        if (response.ok) {
          fetch(`${BACKEND_URL}users/${userId}/friendrequests/${id}`, {
            method: "DELETE",
            credentials: "include"
          })
            .then(async response => {
              if (response.ok) {
                const acceptedReq = friendRequests.find(request => request._id === id);
                const newRequests = friendRequests.filter(request => request._id !== id);
                setFiendRequests(newRequests);
                let newFriends = JSON.parse(await AsyncStorage.getItem("friends"));
                newFriends.push(acceptedReq.requesterId);
                AsyncStorage.setItem("friends", JSON.stringify(newFriends));
              }
            })
        }
        else if (response.status === 401) {
          setError({
            occured: true,
            label: "Please Login first."
          })
        }
      })
      .catch(err => {
        console.log(err);
        setError({
          occured: true,
          label: "Something went wrong trying to decline your request. Please try later again."
        })
      })
  }

  const declineFriendRequest = id => {
    fetch(`${BACKEND_URL}users/${userId}/friendrequests/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
      .then(response => {
        console.log(`${BACKEND_URL}${userId}/friendrequests/${id}`, response.status);
        if (response.ok) {
          const newRequests = friendRequests.filter(request => request._id !== id);
          setFiendRequests(newRequests);
        }
        else if (response.status === 401) {
          setError({
            occured: true,
            label: "Please Login first."
          })
        }
        else throw null;
      })
      .catch(err => {
        console.log(err);
        setError({
          occured: true,
          label: "Something went wrong trying to decline your request. Please try later again."
        })
      })
  }

  const declineArticleRequest = (id) => {
    fetch(BACKEND_URL + "articleRequest" + "/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        status: "declined"
      })
    })
      .then(response => {
        if (response.ok) {
          fetch(BACKEND_URL + "articleRequest" + "/" + id, {
            method: "DELETE",
            credentials: "include"
          })
            .then(response => {
              if (response.ok) {
                const newRequests = articleRequests.filter(request => request._id !== id);
                setArticleRequests(newRequests);
              }
            })
        }
      })
      .catch(err => setError({
        occured: true,
        label: "Something went wrong trying to accept your request. Please try later again."
      }))
  }

  const acceptArticleRequest = (id) => {
    fetch(BACKEND_URL + "articleRequest" + "/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        status: "confirmed"
      })
    })
      .then(response => {
        if (response.ok) {
          const newRequests = articleRequests.filter(request => request._id !== id);
          setArticleRequests(newRequests);
        }
      })
      .catch(err => {
        console.log(err);
        setError({
          occured: true,
          label: "Something went wrong trying to accept your request. Please try later again."
        })
      })
  }

  AsyncStorage.getItem("userId")
    .then(userId => setUserId(userId))

  const getArticleRequests = () => {
    let status = null;
    fetch(BACKEND_URL + "articleRequest")
      .then(response => {
        if (response.status === 200) return response.json();
        else if (response.status === 401) {
          status = 401;
          return response.text();
        }
        else if (response.status === 500) {
          status = 500;
          return response.json();
        }
      })
      .then(data => {
        if (status === 401) {
          signOut();
          setError({
            occured: true,
            label: data
          })
        }
        else if (status === 500) {
          setError({
            occured: true,
            label: data.message
          })
        }
        else {
          const { data: incomingRequests } = data;
          setArticleRequests(incomingRequests);
        }
      })
      .catch(err => {
        console.log(err);
        setError({
          occured: true,
          label: "Something went wrong trying to display incoming requests."
        })
      })
  }

  useEffect(() => {
    getArticleRequests();
  }, [])

  const getFriendRequests = () => {
    if (!userId) return;
    let status = null;
    fetch(BACKEND_URL + "users" + "/" + userId + "/" + "friendrequests")
      .then(response => {
        console.log(response.status);
        if (response.ok) return response.json();
        else if (response.status === 401) {
          status = 401;
          return response.text();
        }
        else if (response.status === 500) {
          status = 500;
          return response.json();
        }
      })
      .then(data => {
        if (status === 401) {
          signOut();
          setError({
            occured: true,
            label: data
          })
        }
        else if (status === 500) {
          setError({
            occured: true,
            label: data.message
          })
        }
        else { //200
          const { data: incomingFriendRequests } = data;
          setFiendRequests(incomingFriendRequests);
        }
      })
      .catch(err => {
        console.log(err);
        setError({
          occured: true,
          label: "Internal Server Error. Please try later again."
        })
      })
  }

  useEffect(() => {
    getFriendRequests();
  }, [userId])


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFriendRequests();

    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>

      {friendRequests.length !== 0 && <Text style={styles.listHeader}>Freundesanfragen:</Text>}
      <FlatList
        data={friendRequests}
        renderItem={({ item }) => (
          <FriendRequest
            requesterName={item.requesterName}
            city={item.requesterCity}
            requestId={item._id}
            acceptRequest={acceptFriendRequest}
            declineRequest={declineFriendRequest}
            requesterImage={IMAGE_URL + item.requesterImage}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {articleRequests.length !== 0 && <Text style={styles.listHeader}>Artikelanfragen:</Text>}
      {error.occured && Alert(error.label)}

      {(friendRequests.length === 0 && articleRequests.length === 0) &&
        <Text style={styles.infoText}>Hier erscheinen Anfragen von Nutzern, die deine Freunde sein oder deine Artikel ausleihen möchten!</Text>
      }
      <FlatList
        data={articleRequests}
        renderItem={({ item }) => (
          <ItemRequest
            navigation={navigation}
            produktName={item.title}
            requestId={item._id}
            acceptRequest={acceptArticleRequest}
            declineRequest={declineArticleRequest}
            image={IMAGE_URL + item.images[0]}
            user={item.user}
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
  infoText: {
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333740",
    top: "50%",
    fontSize: 20,
    textAlign: "center",
  },
});
export default RequestsScreen;
