import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {View} from 'native-base'
import { Button } from 'react-native-elements';
import Firebase from '../database/Firebase'
import { getResources, getIncidents } from '../database/Firebase'


class IncidentsScreen extends React.Component {
    render(){
        const fb = Firebase.shared;
        return (
            <View>
                <Button title='ADD' onPress={()=> {
                    console.log({getIncidents})
                    console.log({getResources})
                }}/>
                <View style={styles.container}>  
                <Text>Incident Page</Text>  
                <Text>Incident Page</Text>  
                <Text>Incident Page</Text>  
                <Text>Incident Page</Text>  
                <Text>Incident Page</Text>  
                <Text>Incident Page</Text>  
                <Text>Incident Page</Text>    
            </View>

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