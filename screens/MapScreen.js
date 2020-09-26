import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView from 'react-native-maps';

class MapScreen extends React.Component {


    
    render(){
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0,
                    longitudeDelta: 0.0,
                    }}
        >
                <MapView.Marker
                coordinate={{latitude: 25.7712,
                longitude: -80.1895}}
                title={"title"}
                description={"description"}
            />
        </MapView>

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
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }
  
  });

export default MapScreen;