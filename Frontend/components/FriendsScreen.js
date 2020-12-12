import { View, Text, FlatList } from "react-native";
import React from "react";
import Friend from "./Friend";

const FriendsScreen = ({ navigation }) => {
  let array = [
    {
      name: "Lukas",
      wohnort: "Berlin-Charlottenburg",
      artikelzahl: "1211",
      image: "../assets/tesprofilpic.jpg",
    },
    {
      name: "Moritz",
      wohnort: "Berlin-Pankow",
      artikelzahl: "13",
      image: "../assets/tesprofilpic.jpg",
    },
    {
      name: "Talha",
      wohnort: "Berlin-Neukölln",
      artikelzahl: "3",
      image: "../assets/tesprofilpic.jpg",
    },
    {
      name: "Vico",
      wohnort: "Berlin-Lichtenrade",
      artikelzahl: "5",
      image: "../assets/tesprofilpic.jpg",
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 3,
      }}
    >
      <FlatList
        data={array}
        renderItem={({ item }) => (
          <Friend
            name={item.name}
            wohnort={item.wohnort}
            image={item.image}
            artikelzahl={item.artikelzahl}
            navigation={navigation}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default FriendsScreen;
