import React from 'react';
import {StyleSheet} from 'react-native';
import { Container, Tab, Tabs } from 'native-base';
import IncidentPage from './IncidentsScreen'
import ResourceScreen from './ResourcesScreen'





class ReportPage extends React.Component {
    render(){
        return (
            <Container>
                    <Tabs >
                    <Tab style={styles.listItem} heading="Incidents">
                        <IncidentPage />
                    </Tab>
                    <Tab style={styles.listItem} heading="Resources">
                        <ResourceScreen />
                    </Tab>
                    </Tabs>
                </Container>

        );
    };
    }


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ACCCBC'
    },
    listItem :{
        backgroundColor: '#ACCCBC'
    },

    Tab: {
        padding: 10
    },
});


export default ReportPage;