import React from 'react'
import { View, Text,StyleSheet,Image,Dimensions} from 'react-native'
import UserButton from './UserButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ItemLend({besitzer,produktName,ausleihfrist,image}) {
    return (
            // change image link to correct parameter url
            <View style={styles.itemStyle}>
                
                    <View>
                        <Image style={styles.itemImage} source={require(`../assets/testprofilpic.jpg`)}/>
                    </View>
                    <View style={styles.itemBottomView}>
                        <View style={styles.itemUpper}>
                            <Text style={styles.itemName}>{produktName}</Text>
                            <MaterialCommunityIcons name='heart-outline' size={24}/>
                        </View>
                        <View style={styles.itemBottom} >
                            <UserButton userName={besitzer}/>
                            <Text style={styles.itemTime}>Noch: {ausleihfrist}</Text>
                        </View>
                       
                    </View>
                    
            </View>
           
            )
        }
        const styles = StyleSheet.create({
            itemStyle:{
                backgroundColor:'#ddd',
                flexDirection:'row',
                alignSelf:'stretch',
                width:Dimensions.get('window').width-5,
                marginVertical:3,
                
            },
            itemImage:{height:100,width:100},
            itemBottom:{
                marginLeft:5,
                width:'68%',
                flexDirection:'row',
                justifyContent: 'space-between',
                alignItems:'center',
            },
            itemUpper:{
                width:'68%',
                flexDirection:'row',
                justifyContent: 'space-between',
                marginTop:10,
                marginLeft:10,
            },
            itemButton:{
                flexDirection:'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#E77F23',
                borderRadius:50,
                
            },
            itemBottomView:{
               
                flexDirection:'column',
                justifyContent:'space-between'
            },
            itemTime:{
                fontSize:12,
                marginBottom:10,
                
            },
            itemName:{
                fontWeight:'bold'
            }
    
    
            
        })
    

