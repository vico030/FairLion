import { View, Text, FlatList } from 'react-native'
import React from 'react';
import ItemStock from './ItemStock'

const StockScreen = ({ navigation }) => {
    
    let array = [{image:'../assets/testprofilpic.jpg',besitzer:'peter',produktName:"Stichsäge Holz Metall",ausleihfrist:"2 Stunden",key:'1'}
    ,{image:'../assets/testprofilpic.jpg',besitzer:'frank',produktName:"Stichsäge Holz Metall",ausleihfrist:"3 Stunden",key:'2'},
    {image:'../assets/testprofilpic.jpg',besitzer:'peter',produktName:"Stichsäge Holz Metall",ausleihfrist:"2 Stunden",key:'3'},
    {image:'../assets/testprofilpic.jpg',besitzer:'peter',produktName:"Stichsäge Holz Metall",ausleihfrist:"2 Stunden",key:'4'},
    {image:'../assets/testprofilpic.jpg',besitzer:'peter',produktName:"Stichsäge Holz Metall",ausleihfrist:"2 Stunden",key:'5'},]

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                data={array}
                renderItem={({item})=>(
                    <ItemStock besitzer={item.besitzer} produktName={item.produktName} ausleihfrist={item.ausleihfrist} image={item.image}/>
                    )}
                    /> 
        </View>
    )
}

export default StockScreen;