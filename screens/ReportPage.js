import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Tab, Tabs } from 'native-base';
import IncidentPage from './IncidentsScreen'
import ResourceScreen from './ResourcesScreen'





const ReportPage = props => {
    const { route, navigation } = props;
    console.log(props);
    const {county} = route.params;
    return (
        <Container>
            <Tabs >
                <Tab style={styles.listItem} heading="Incidents">
                    <IncidentPage county={county} />
                </Tab>
                <Tab style={styles.listItem} heading="Resources">
                    <ResourceScreen county={county} />
                </Tab>
            </Tabs>
        </Container>

    );

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ACCCBC'
    },
    listItem: {
        backgroundColor: '#ACCCBC'
    },

    Tab: {
        padding: 10
    },
});


export default ReportPage;