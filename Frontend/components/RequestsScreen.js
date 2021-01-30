import env from "../env.js";
const { BACKEND_URL, IMAGE_URL } = env;
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FriendRequest from "./FriendRequest";
import ItemRequest from "./ItemRequest";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "../context";
import { Alert } from "react-native";
console.log(BACKEND_URL);

const RequestsScreen = ({ navigation }) => {
  const [pendingArticleRequests, setPendingArticleRequests] = useState([]);
  const [returnedArticles, setReturnedArticles] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [error, setError] = useState({
    occured: false,
    label: ""
  });
  const [userId, setUserId] = useState(null);
  const { signOut } = useContext(AuthContext);
  const [loadingFriendRequests, setLoadingFriendRequests] = useState(false);
  const [loadingArticleRequests, setLoadingArticleRequests] = useState(false);

  const acceptFriendRequest = async (id) => {
    fetch(`${BACKEND_URL}users/${await AsyncStorage.getItem("userId")}/friendrequests/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        confirmed: true
      })
    })
      .then(async (response) => {
        if (response.ok) {
          fetch(`${BACKEND_URL}users/${await AsyncStorage.getItem("userId")}/friendrequests/${id}`, {
            method: "DELETE",
            credentials: "include"
          })
            .then(async response => {
              if (response.ok) {
                const acceptedReq = friendRequests.find(request => request._id === id);
                const newRequests = friendRequests.filter(request => request._id !== id);
                setFriendRequests(newRequests);
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

  const declineFriendRequest = async (id) => {
    fetch(`${BACKEND_URL}users/${await AsyncStorage.getItem("userId")}/friendrequests/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
      .then(async (response) => {
        console.log(`${BACKEND_URL}${await AsyncStorage.getItem("userId")}/friendrequests/${id}`, response.status);
        if (response.ok) {
          const newRequests = friendRequests.filter(request => request._id !== id);
          setFriendRequests(newRequests);
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
                const newRequests = pendingArticleRequests.filter(request => request._id !== id);
                setPendingArticleRequests(newRequests);
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
          const newRequests = pendingArticleRequests.filter(request => request._id !== id);
          setPendingArticleRequests(newRequests);
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

  const acceptReturnedArticleRequest = id => {
    fetch(BACKEND_URL + "articleRequest" + "/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        status: "returned"
      })
    })
      .then(response => {
        if (response.ok) {
          const newRequests = returnedArticles.filter(request => request._id !== id);
          setReturnedArticles(newRequests);
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

 /*  AsyncStorage.getItem("userId")
    .then(userId => setUserId(userId))
 */
  const getArticleRequests = () => {
    setLoadingArticleRequests(true);
    let status = null;
    fetch(BACKEND_URL + "articleRequest")
      .then(response => {
        setLoadingArticleRequests(false);
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
          const returnedRequests = incomingRequests.filter(request => request.status === "returnPending");
          const pendingRequests = incomingRequests.filter(request => request.status === "pending");
          setPendingArticleRequests(pendingRequests);
          setReturnedArticles(returnedRequests);
        }
      })
      .catch(err => {
        setLoadingArticleRequests(false);
        console.log(err);
        setError({
          occured: true,
          label: "Something went wrong trying to display incoming requests."
        })
      })
  }

  const getFriendRequests = async () => {
    setLoadingFriendRequests(true);
    let status = null;
    fetch(BACKEND_URL + "users" + "/" + await AsyncStorage.getItem("userId") + "/" + "friendrequests")
      .then(response => {
        setLoadingFriendRequests(false);
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
        else if (status === 500) return;
        else { //200
          const { data: incomingFriendRequests } = data;
          setFriendRequests(incomingFriendRequests);
        }
      })
      .catch(err => {
        setLoadingFriendRequests(false);
        console.log(err);
        setError({
          occured: true,
          label: "Internal Server Error. Please try later again."
        })
      })
  }

/*   useEffect(() => {
    if (userId) {
      getFriendRequests();
      getArticleRequests();
    }
  }, [userId]) */

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFriendRequests();
      getArticleRequests();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>

      {friendRequests.length !== 0 && <Text style={styles.listHeader}>Freundesanfragen:</Text>}
      {loadingFriendRequests && <View style={styles.spinner}><ActivityIndicator color="#E77F23" size="large" /></View>}
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

      {pendingArticleRequests.length !== 0 && <Text style={styles.listHeader}>Artikelanfragen:</Text>}
      {error.occured && Alert.alert(error.label)}

      {(friendRequests.length === 0 && pendingArticleRequests.length === 0 && returnedArticles.length === 0) && !loadingArticleRequests && !loadingFriendRequests &&
        <Text style={styles.infoText}>Hier erscheinen Anfragen von Nutzern, die deine Freunde sein oder deine Artikel ausleihen möchten!</Text>
      }
      {loadingArticleRequests && <View style={styles.spinner}><ActivityIndicator color="#E77F23" size="large" /></View>}
      <FlatList
        data={pendingArticleRequests}
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
      {returnedArticles.length !== 0 && <Text style={styles.listHeader}>Rückgabeanfragen:</Text>}
      <FlatList
        data={returnedArticles}
        renderItem={({ item }) => (
          <ItemRequest
            navigation={navigation}
            produktName={item.title}
            requestId={item._id}
            acceptRequest={acceptReturnedArticleRequest}
            image={IMAGE_URL + item.images[0]}
            user={item.user}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {error.occured && Alert(error.label)}
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
