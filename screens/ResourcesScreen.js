import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'

import AddItemForm from '../components/AddItemForm';
import Firebase from '../database/Firebase';
import { ResourceTypes } from '../constants/Types';
import Resource from '../models/Resource';


const fb = Firebase.shared;

const numColumns = 3;
const ResourcesScreen = props => {
    const [isVisibleForm, setIsVisibleForm] = useState(false);
    const [resources, setResources] = useState([]);

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

    const onClose = () => {
        setIsVisibleForm(false);
    }

    useEffect(() => {
        //MUST change 'broward' to correct value from prop!
        const county = props.county;
        const onValueChange = fb.GetResourcesRef(county)
            .orderByChild("county")
            .equalTo(county)
            .on('value', snapshot => {
                let items = [];
                let obj = snapshot.val();
                for (let key in obj) {
                    items.push(obj[key]);
                }

                setResources(items);
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
                    header='Add Resource'
                    onSubmit={onSubmit}
                    typesList={ResourceTypes}
                    county={props.county}   //<--------needs to be passed down from prop later
                    onClose={onClose}
                />

                <View style={styles.btn}>
                    <Button title='ADD' onPress={() => setIsVisibleForm(true)} />
                </View>
            </View>
            <SafeAreaView >
            <ScrollView>
            <Card style={styles.card} >
            {resources.map((item, index) => {
                return (
                    <View>
                     <Card.Title>{item.county}</Card.Title>
                     <Card.Divider/>
                     <Card.Image source={{ uri: item.photo }} />
                     <Text style={{}}>
                         {item.type}
                     </Text>
                    </View>
                );
            })}
            </Card>
            </ScrollView>
            </SafeAreaView >

                {/* <SafeAreaView style={styles.container}>
                <FlatList 
                data={resources}
                numColumns = {numColumns}
                renderItem={({item}) => (
                    <Card containerStyle={styles.card}>
                    <CardItem>
                    <Thumbnail src={item.photo}/>
                    </CardItem>
                    <TouchableOpacity>
                      <Text>{item.type}</Text>
                      <Text>{item.notes}</Text>
                    </TouchableOpacity>
                  </Card>
                )}
                />
            </SafeAreaView> */}
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
    },
    card: {
        backgroundColor: '#2089dc',
        margin: 20,
        width: '100%', 
        height: 100,
        justifyContent: 'center',
    },
    btn: {
        width: '95%',
        marginBottom: 15,
        marginTop: 10
    }
});

export default ResourcesScreen;