import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Card, CardItem,ListItem, Icon, Divider } from 'react-native-elements'


import AddItemForm from '../components/AddItemForm';
import Firebase from '../database/Firebase';
import { IncidentTypes } from '../constants/Types';
import Incident from '../models/Incident';

const fb = Firebase.shared;


const IncidentsScreen = props => {
    const [isVisibleForm, setIsVisibleForm] = useState(false);
    const [incidents, setIncidents] = useState([]);


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

    useEffect(() => {
        //MUST change 'broward' to correct value from prop!
        const county = 'Miami-Dade';
        const onValueChange = fb.GetIncidentsRef(county)
            .orderByChild("county")
            .equalTo(county)
            .on('value', snapshot => {
                let items = [];
                let obj = snapshot.val();
                for (let key in obj) {
                    items.push(obj[key]);
                }

                setIncidents(items);
            });

            // Stop listening for updates when no longer required
        return () =>
        fb.GetResourcesRef(county)
            .off('value', onValueChange);
}, [isVisibleForm]);

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
            
            {/* {incidents.map((item, index) => {
                return (
               <TouchableOpacity
               key = {item.id}
               style = {styles.text}>
               <Text style = {styles.text}>{item.county} | {item.type} | {item.notes}</Text></TouchableOpacity> 
                );
            })} */}

            <SafeAreaView>
            <ScrollView >
            <Card>
            {incidents.map((item, index) => {
                return (
                    <View >
                     <Card.Title>{item.county}</Card.Title>
                     <Card.Divider/>
                     <Card.Image source={{ uri: item.photo }} />
                     <Text style={{fontSize: 20, paddingBottom:10}}>
                         {item.type}
                     </Text>
                     <Divider style={{}}/>
                    </View>
                );
            })}
            </Card>
            </ScrollView>
            </SafeAreaView>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:0,
        margin: 10,
        justifyContent: 'space-between',
        

    },
    card: {
        flex:2,
        backgroundColor: 'black',
        paddingBottom: 10,
        justifyContent:'space-between'
    },

    btn: {
        width: '95%',
    },
    text: {
      padding: 5,
      width: '100%',
      marginTop: 5,
      backgroundColor: 'white',
      alignItems: 'center',
    }
});


export default IncidentsScreen;