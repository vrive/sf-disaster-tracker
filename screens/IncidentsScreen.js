import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

class IncidentsScreen extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Incident Page</Text>    
            </View>
        );
    };
    }


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ACCCBC',
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export default IncidentsScreen;