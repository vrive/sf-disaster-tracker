import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

class CountiesScreen extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>List of Counties goes here</Text>
                <Text>Miami-Dade</Text>
                <Text>Miami-Dade</Text>
                <Text>Miami-Dade</Text>
                <Text>etc</Text>
                <Button title="Go to Report page"
                        onPress={() => this.props.navigation.navigate('Report')}/>
            </View>
        );
    };
    }


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ACCCBC',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default CountiesScreen;

