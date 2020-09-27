import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import Firebase from '../database/Firebase';

const fb = Firebase.shared;

class MapScreen extends React.Component {
    constructor(props) {
        super();
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            region: {
                latitude: 25.7712,
                longitude: -80.1895,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            },
            incidents: [],
            resources: []
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    componentDidMount() {
        //county needs to be changed to prop
        fb.GetIncidents("Broward").then((snapshot) => {
            let incidents = [];
            let obj = snapshot.val();
            for (let key in obj) {
                incidents.push(obj[key]);
            }
            this.setState({incidents: incidents});
            if (incidents.length > 0) {
                this.setState({
                    region:
                    {
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                        latitude: incidents[0].location.latitude,
                        longitude: incidents[0].location.longitude
                    }
                })
            };
        });

        fb.GetResources("Broward").then((snapshot) => {
            let resources = [];
            let obj = snapshot.val();
            for (let key in obj) {
                resources.push(obj[key]);
            }
            this.setState({ resources: resources });
            if (resources.length > 0) {
                this.setState({
                    region:
                    {
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                        latitude: resources[0].location.latitude,
                        longitude: resources[0].location.longitude
                    }
                })
            };
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={this.state.region}
                    region={this.state.region}
                    onRegionChange={() => this.onRegionChange()}

                >
                    {this.state.incidents.map((item, index) => {
                        return (
                            <MapView.Marker
                                coordinate={{
                                    latitude: item.location.latitude,
                                    longitude: item.location.longitude
                                }}
                                title={item.type}
                                description={item.notes}
                            />
                        );
                    })}
                </MapView>

            </View>
        );

    }

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