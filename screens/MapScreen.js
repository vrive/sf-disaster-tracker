import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import Firebase from '../database/Firebase';
import {county} from '../App'

const fb = Firebase.shared;

const MapScreen = props => {

    const [incidents, setIncidents] = useState([]);
    const [resources, setResources] = useState([]);
    const [region, setRegion] = useState({
        latitude: 26.015074,
        longitude: -80.419614,
        latitudeDelta: 2,
        longitudeDelta: 2,
    });
    const [initlialRegion, setInitialRegion] = useState({
        latitude: 26.015074,
        longitude: -80.419614,
        latitudeDelta: 2,
        longitudeDelta: 2,
    })

    const onRegionChange = (region) => {
        setRegion(region);
    }

    useEffect(() => {
        //MUST change 'broward' to correct value from prop!
        const region = county;
        const onValueChange = fb.GetIncidentsRef(region)
            .orderByChild("county")
            .equalTo(region)
            .on('value', snapshot => {
                let items = [];
                let obj = snapshot.val();
                for (let key in obj) {
                    items.push(obj[key]);
                }

                setIncidents(items);
                if (items.length > 0) {
                    setInitialRegion({
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                        latitude: items[0].location.latitude,
                        longitude: items[0].location.longitude
                    });
                }
            });

        // Stop listening for updates when no longer required
        return () =>
            fb.GetIncidentsRef(region)
                .off('value', onValueChange);
    }, [incidents]);

    useEffect(() => {
        //MUST change 'broward' to correct value from prop!
        const region = county;
        const onValueChange = fb.GetResourcesRef(region)
            .orderByChild("county")
            .equalTo(region)
            .on('value', snapshot => {
                let items = [];
                let obj = snapshot.val();
                for (let key in obj) {
                    items.push(obj[key]);
                }

                setResources(items);
                if (items.length > 0) {
                    setInitialRegion({
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                        latitude: items[0].location.latitude,
                        longitude: items[0].location.longitude
                    });
                }
            });

        // Stop listening for updates when no longer required
        return () =>
            fb.GetResourcesRef(region)
                .off('value', onValueChange);
    }, [resources]);

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={initlialRegion}
                region={region}
                onRegionChange={() => onRegionChange()}

            >
                {incidents.map((item, index) => {
                    return (
                        <MapView.Marker
                            coordinate={{
                                latitude: item.location.latitude,
                                longitude: item.location.longitude
                            }}
                            title={item.type}
                            description={item.notes}
                            pinColor={'red'}
                        />
                    );
                })}
                {resources.map((item, index) => {
                    return (
                        <MapView.Marker
                            coordinate={{
                                latitude: item.location.latitude,
                                longitude: item.location.longitude
                            }}
                            title={item.type}
                            description={item.notes}
                            pinColor={'green'}
                        />
                    );
                })}
            </MapView>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ACCCBC',
        alignItems: 'center',
        justifyContent: 'center',
    },

    Tab: {
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