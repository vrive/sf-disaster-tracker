import React, { useState } from 'react';
import { StyleSheet, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { View } from 'native-base';

import AddItemForm from '../components/AddItemForm';
import Firebase from '../database/Firebase';
import { IncidentTypes } from '../constants/Types';
import Incident from '../models/Incident';

const fb = Firebase.shared;


const IncidentsScreen = props => {
    const [isVisibleForm, setIsVisibleForm] = useState(false);

    const onSubmit = (type, location, image, notes, county) => {
        const incident = new Incident(type, location, image, notes, county);
        fb.AddIncident(incident).then(() => {
            Alert.alert('Success', 'Your incident has been posted',
                [
                    { text: "OK", onPress: () => setIsVisibleForm(false) }
                ],
                { cancelable: false });
        });
    };

    const onClose = () =>{
        setIsVisibleForm(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.btn}>

                <AddItemForm visible={isVisibleForm}
                    header='Add Incident'
                    onSubmit={onSubmit}
                    typesList={IncidentTypes}
                    county={props.county}  
                    onClose={onClose}
                />

                <View style={styles.btn}>
                    <Button title='ADD' onPress={() => setIsVisibleForm(true)} />
                </View>
            </View>
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

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        alignItems: 'center'
    },
    btn: {
        width: '95%',
        marginBottom: 15,
        marginTop: 10
    }
});


export default IncidentsScreen;