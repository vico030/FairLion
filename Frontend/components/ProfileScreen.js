import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProfileInfoBox from "./ProfileInfoBox";
import ProfileStockItemList from "./ProfileStockItemList";
const ProfileScreen = ({
  route,
  navigation,
}) => {
  const {
    id,
    name,
    wohnort,
    artikelzahl,
    image,
    strasse,
    plz,
    land,
    info,
    email,
    telefon,
  } = route.params;
  
  return (
    <View style={styles.container}>
      <ProfileInfoBox
        name={name}
        wohnort={wohnort}
        artikelzahl={artikelzahl}
        image={image}
        navigation={navigation}
        strasse={strasse}
        plz={plz}
        land={land}
        info={info}
        email={email}
        telefon={telefon}
      />
      <ProfileStockItemList
        navigation={navigation}
        artikelzahl={artikelzahl}
        id={id}
        />
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
