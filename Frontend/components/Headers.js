import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import {MaterialIcons} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import BorrowedScreen from './BorrowedScreen';
import StockScreen from './StockScreen';
import SearchScreen from './SearchScreen';
import RequestsScreen from './RequestsScreen';
import FriendsScreen from './FriendsScreen';

const inactiveTintColor = "#333740";
const BurrowedStack = createStackNavigator();
const StockStack = createStackNavigator();
const SearchStack = createStackNavigator();
const RequestStack = createStackNavigator();
const FriendsStack=createStackNavigator();


const FriendsStackScreen=()=>(
    <FriendsStack.Navigator >
      <FriendsStack.Screen name="Freunde" component={FriendsScreen} options={{title:'Freunde',headerStyle: {
              backgroundColor: inactiveTintColor,
            },headerTitleAlign: 'center',headerTintColor: '#fff',headerTitleStyle: {
              fontFamily:'Roboto',
            },
            headerRight:()=>(
      
              <MaterialIcons name='add' size={28} color='#fff' onPress={() => alert('This is a button!')}/>
            ),
    
            headerLeft:()=>(
      
              <MaterialIcons name='menu' size={28} color='#fff' />
             )}}/>
    </FriendsStack.Navigator>
  )
  
  const RequestsStackScreen=()=>(
    <RequestStack.Navigator >
      <RequestStack.Screen name="Anfragen" component={RequestsScreen} options={{title:'Lager',headerStyle: {
              backgroundColor: inactiveTintColor,
            },headerTitleAlign: 'center',headerTintColor: '#fff',headerTitleStyle: {
              fontFamily:'Roboto',
            },
    
    headerLeft:()=>(
      
      <MaterialIcons name='menu' size={28} color='#fff' />
    )}}/>
    </RequestStack.Navigator>
  )
  
  const BurrowedStackScreen=()=>(
    <BurrowedStack.Navigator >
      <BurrowedStack.Screen name="Ausgeliehen" component={BorrowedScreen} options={{title:'Ausgeliehen',headerStyle: {
              backgroundColor: inactiveTintColor,
            },headerTitleAlign: 'center',headerTintColor: '#fff',headerTitleStyle: {
              fontFamily:'Roboto',
            },
    headerLeft:()=>(
      
      <MaterialIcons name='menu' size={28} color='#fff'  />
    )}}/>
    </BurrowedStack.Navigator>
  )
  const StockStackScreen=()=>(
    <StockStack.Navigator >
      <StockStack.Screen name="Lager" component={StockScreen} options={{title:'Lager',headerStyle: {
              backgroundColor: inactiveTintColor,
            },headerTitleAlign: 'center',headerTintColor: '#fff',headerTitleStyle: {
              fontFamily:'Roboto',
            },
    headerRight:()=>(
      
      <MaterialIcons name='add' size={28} color='#fff' />
    ),
    headerLeft:()=>(
      
      <MaterialIcons name='menu' size={28} color='#fff' />
    )}}/>
    </StockStack.Navigator>
  )
  const SearchStackScreen=()=>(
    <SearchStack.Navigator >
    <SearchStack.Screen name="Suche" component={SearchScreen} options={{title:'Suche',headerStyle: {
            backgroundColor: inactiveTintColor,
          },headerTitleAlign: 'center',headerTintColor: '#fff',headerTitleStyle: {
            fontFamily:'Roboto',
          },
  headerRight:()=>(
    
    <MaterialCommunityIcons name='dns-outline' size={28} color='#fff' />
  ),
  headerLeft:()=>(
    
    <MaterialIcons name='menu' size={28} color='#fff' />
  )}}/>
  </SearchStack.Navigator>
  )
  export{
      BurrowedStackScreen,
      StockStackScreen,
      SearchStackScreen,
      RequestsStackScreen,
      FriendsStackScreen
  }