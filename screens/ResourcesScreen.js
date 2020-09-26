import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

class ResourcesScreen extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <Text>HELLOOOO</Text>
                <Text>HELLOOOO</Text>
                <Text>HELLOOOO</Text>
                <Text>HELLOOOO</Text>
                <Text>HELLOOOO</Text>
                <Text>HELLOOOO</Text>
                <Text>HELLOOOO</Text>
            </View>
        );
    }
    
};

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        marginLeft:20
    }
});

export default ResourcesScreen;