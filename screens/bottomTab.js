// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import Counties from './CountiesScreen'
import MapScreen from './MapScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Tab = createBottomTabNavigator();


class BottomTab extends React.Component {
    render(){
      return (
        <Tab.Navigator >
            <Tab.Screen name="Home" component={Counties} />
            <Tab.Screen name="Maps" component={MapScreen} />
        </Tab.Navigator>
        );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontSize: 20,
      backgroundColor: '#ACCCBC',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  });
          
export default BottomTab;
          