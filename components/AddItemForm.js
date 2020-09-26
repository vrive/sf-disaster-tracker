import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform, TextInput, Button, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const AddItemForm = props => {
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [notes, setNotes] = useState('');
    const [location, setLocation] = useState(null);

    const getDropDownItems = () => {
        if (!props.typesList) {
            return [];
        }

        let items = [];
        let types = props.typesList;
        for (let key in types) {
            items.push({
                label: types[key], value: key, icon: () => { }
            });
        }

        return items;
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                //Alreer('Permission to access location was denied');
            }

            const result =  await Location.getCurrentPositionAsync({});
            setLocation({latitude:result.coords.latitude, longitude:result.coords.longitude});
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('camera roll permission is needed to upload pcitures. Pictures are optional.');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const getLocationText = () =>{
        if(!location){
            return '';
        }else{
            return `${location.longitude} , ${location.latitude}`;
        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.rowItem, styles.textRow]}>
                <Text style={styles.label}>Type: </Text>
                <DropDownPicker
                    items={getDropDownItems()}
                    defaultValue={type}
                    containerStyle={{ height: 40, width: 200 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => setType(item.value)}
                />
            </View>
            <View style={[styles.rowItem, styles.textRow]}>
                <Text style={styles.label}>Location: </Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        editable={false}
                        maxLength={40}
                        onChangeText={text => setNotes(text)}
                        value={getLocationText()}
                    />
                </View>
            </View>
            <View style={[styles.rowItem, styles.textRow]}>
                <Text style={styles.label}>Notes: </Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        maxLength={40}
                        multiline
                        onChangeText={text => setNotes(text)}
                        value={notes}
                    />
                </View>
            </View>
            <View style={styles.rowItem}>
                <Text style={styles.label}>Photo: </Text>
                <Button title='pick an image' onPress={pickImage} />
                <View style={styles.removeBtn}>
                    {image && <Button title='Remove' color='red' onPress={() => setImage(null)} />}
                </View>
            </View>
            <View style={styles.imageContainer}>
                {image && <Image borderRadius={20} source={{ uri: image }} style={styles.image} />}

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    rowItem: {
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 10
    },
    label: {
        fontSize: 19,
        paddingVertical: 20,
        paddingRight: 20
    },
    textInputContainer: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        width: 170
    },
    textRow: {
        justifyContent: 'space-between'
    },
    imageContainer: {
        alignItems: "center",
        color: 'red'
    },
    image: {
        width: 200,
        height: 200,
        margin: 20
    },
    removeBtn: {
        padding: 10
    }
});

export default AddItemForm;

