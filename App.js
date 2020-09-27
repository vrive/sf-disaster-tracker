// import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import County from './screens/CountiesScreen';
// import IncidentPage from './screens/IncidentsScreen'
import { YellowBox } from 'react-native';
import _ from 'lodash';;
import MapsPage from './screens/MapScreen';
import ReportPage from './screens/ReportPage';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Settings = createStackNavigator();

YellowBox.ignoreWarnings(['Setting a timer']);
YellowBox.ignoreWarnings(['Setting a timer', 'Deprecation in'])
const _console = _.clone(console);
console.ignoredYellowBox = ['Setting a timer'];
console.disableYellowBox = true
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


function Counties() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={County}
        options={{ tabBarLabel: 'Home!' }}
      />
      <Stack.Screen  
      name="Report" 
      component={Report}
      options={{ tabBarLabel: 'Report Page' }} />

    </Stack.Navigator>
  );
}

function Report() {
  return (
    <Settings.Navigator>
      <Settings.Screen
        name="Report"
        component={ReportPage}
        options={{ tabBarLabel: 'Report' }}
      />
      <Settings.Screen
        name="Maps"
        component={MapsPage}
        options={{ tabBarLabel: 'Maps' }}
      />
    </Settings.Navigator>
  );
}

class App extends React.Component {
  render(){
    return (
      <NavigationContainer >
        <Tab.Navigator
          tabBarOptions={{
          labelStyle: { fontSize: 25, padding: 10 }
          }}
        >
            <Tab.Screen 
              name="Home" 
              component={Counties} 
            />
            <Tab.Screen 
              name="Maps" 
              component={MapsPage} 
            />
        </Tab.Navigator>
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
    }
  
  });

  
  
  export default App;
