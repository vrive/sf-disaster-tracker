import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Button,TouchableOpacity } from 'react-native';

const data = [
    { key: 'Miami-Dade' }, { key: 'Palm Beach' }, { key: 'Broward' }, { key: 'St. Lucie' }, { key: 'Monroe' }, { key: 'Martin' }, { key: 'Indian River' }
];

const numColumns = 3;

class CountiesScreen extends React.Component {
    renderItem = ({ item, index }) => {
        return (
            <View
                style={styles.item}
            >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Report')}>
                <Text style={styles.text} > {item.key}</Text>
                </TouchableOpacity>
                
            </View>
        );
    };

    render() {
        return (
            <View>
                <FlatList
                    data={data}
                    //style={styles.container}
                    renderItem={this.renderItem}
                    numColumns={numColumns}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 20,
    },
    item: {
      backgroundColor: '#43a359',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    text: {
      color: '#fff',
    },
  });

export default CountiesScreen;

