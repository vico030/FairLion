import { View, Text,FlatList,Image, StyleSheet,Dimensions} from 'react-native'
import React from 'react';
import ItemLend from './ItemLend';
const BorrowedScreen = ({ navigation }) => {
    // Test data to display
    let array = [{image:'../assetstestprofilpic.jpg',besitzer:'peter',produktName:"Stichsäge Holz Metall",ausleihfrist:"2 Stunden",key:'1'}
    ,{image:'../assetstestprofilpic.jpg',besitzer:'frank',produktName:"Stichsäge Holz Metall",ausleihfrist:"3 Stunden",key:'2'},
    {image:'../assetstestprofilpic.jpg',besitzer:'peter',produktName:"Stichsäge Holz Metall",ausleihfrist:"2 Stunden",key:'3'},
    {image:'../assetstestprofilpic.jpg',besitzer:'peter',produktName:"Stichsäge Holz Metall",ausleihfrist:"2 Stunden",key:'4'},
    {image:'../assetstestprofilpic.jpg',besitzer:'peter',produktName:"Stichsäge Holz Metall",ausleihfrist:"2 Stunden",key:'5'},]
  
    return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                data={array}
                renderItem={({item})=>(
                    <ItemLend besitzer={item.besitzer} produktName={item.produktName} ausleihfrist={item.ausleihfrist} image={item.image}/>
                    )}
                    />        
            </View>    
    )
}

export default BorrowedScreen;