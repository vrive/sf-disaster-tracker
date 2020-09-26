import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView from 'react-native-maps';

class MapScreen extends React.Component {

    render(){
        return (
        <View style={styles.container}> 
            <Text>Maps pageeee!</Text>
        </View>
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

export default MapScreen;