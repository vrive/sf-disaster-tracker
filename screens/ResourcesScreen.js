import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';

import AddItemForm from '../components/AddItemForm';
import Firebase from '../database/Firebase';
import { ResourceTypes } from '../constants/Types';
import Resource from '../models/Resource';


const fb = Firebase.shared;

const ResourcesScreen = props => {
    const [isVisibleForm, setIsVisibleForm] = useState(false);

    const onSubmit = (type, location, image, notes, county) => {
        const resource = new Resource(type, location, image, notes, county);
        fb.AddResource(resource).then(() => {
            Alert.alert('Success', 'Your resource has been posted',
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
                    header='Add Resource'
                    onSubmit={onSubmit}
                    typesList={ResourceTypes}
                    county='Miami-Dade'   //<--------needs to be passed down from prop later
                    onClose={onClose}
                />

                <View style={styles.btn}>
                    <Button title='ADD' onPress={() => setIsVisibleForm(true)} />
                </View>

                </View>
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

export default ResourcesScreen;