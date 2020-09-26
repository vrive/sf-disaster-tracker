import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {View} from 'native-base'

class IncidentsScreen extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Incident Page</Text>  
                <Text>Incident Page</Text>  
                <Text>Incident Page</Text>  
                <Text>Incident Page</Text>  
                <Text>Incident Page</Text>  
                <Text>Incident Page</Text>  
                <Text>Incident Page</Text>    
            </View>
        );
    };
    }


const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        marginLeft:20
    }
});


export default IncidentsScreen;