import { BACKEND_URL, IMAGE_URL } from "@env";
import { View, FlatList, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import FriendRequest from "./FriendRequest";
import ItemRequest from "./ItemRequest";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const RequestsScreen = ({ navigation }) => {
  const [articleRequests, setArticleRequests] = useState([]);
  const [friendRequests, setFiendRequests] = useState([]);
  const [error, setError] = useState({
    occured: false,
    label: ""
  });
  const [userId, setUserId] = useState(null);

  const acceptFriendRequest = id => {
    fetch(`${BACKEND_URL}/${userId}/friendrequests/${id}`, {
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
          const newRequests = friendRequests.filter(request => request._id !== id);
          setFiendRequests(newRequests);
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
    fetch(`${BACKEND_URL}/${userId}/friendrequests/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
      .then(response => {
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
          const newRequests = articleRequests.filter(request => request._id !== id);
          setArticleRequests(newRequests);
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

  useEffect(() => {
    const fillState = async () => {
      const userId = await AsyncStorage.getItem("userId");
      setUserId(userId);

      fetch(BACKEND_URL + "articleRequest")
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { data: incomingRequests } = data;
          setArticleRequests(incomingRequests);
        })
        .catch(err => {
          console.log(err);
          setError({
            occured: true,
            label: "Something went wrong trying to display incoming requests."
          })
        })

      console.log(userId);
      let status = null;
      fetch(BACKEND_URL + "users" + "/" + userId + "/" + "friendrequests")
        .then(response => {
          console.log(response.status);
          if (response.ok) return response.json();
          else if (response.status === 401) {
            setError({
              occured: true,
              label: "Login first"
            });
          }
          else if (response.status === 500) {
            status = 500;
            return response.json();
          }
        })
        .then(data => {
          if (status === 500) {
            setError({
              occured: true,
              label: data.message
            })
          }
          else {
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
    fillState();
  }, [])

  console.log(friendRequests);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.listHeader}>Freunde:</Text>
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

      <Text style={styles.listHeader}>Artikel-Anfrage:</Text>
      {error.occured && alert(error.label)}
      <FlatList
        data={articleRequests}
        renderItem={({ item }) => (
          <ItemRequest
            navigation={navigation}
            borrower={item.borrowerName}
            borrowerImage={IMAGE_URL + item.borrowerImage}
            produktName={item.title}
            requestId={item._id}
            acceptRequest={acceptArticleRequest}
            declineRequest={declineArticleRequest}
            image={IMAGE_URL + item.images[0]}
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
