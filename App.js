// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Counties from './screens/CountiesScreen'
import Incident from './screens/IncidentsScreen'
import BottomTab from './screens/bottomTab'

const Stack = createStackNavigator();

class App extends React.Component {
  render(){
    return (
      <NavigationContainer >
            <Stack.Navigator >
              <Stack.Screen  name="Hurricane Disaster Tracking" component={Counties} />
              <Stack.Screen  name="Incident" component={Incident} />
              <Stack.Screen name="Tab" component={BottomTab} />
            </Stack.Navigator>
        {/* <Tab.Navigator>
            <Tab.Screen name="Home" component={Counties} />
            <Tab.Screen name="Maps" component={MapScreen} />
        </Tab.Navigator> */}
        </NavigationContainer>
      );

    }
  
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ACCCBC',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    Tab:{
      flex: 1,
      fontSize: 30,
      alignItems: 'center',
      justifyContent: 'center',
    }
  
  });
  
  export default App;
