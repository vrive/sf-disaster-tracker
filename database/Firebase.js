import * as firebase from 'firebase';
import config from '../FirebaseConfig';

class Firebase {
    constructor() {
        this.init();
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
            console.log('success');
        } else {
            console.error('Firebase app was already initialized!')
        }
    }

    /**
     * Example of usage:
     * const fb = Firebase.shared;
     * <Button title='add' onPress={()=> {
        const item = new Incident(IncidentTypes.TREE, "Miami", null, "Some notes");
        fb.AddResource(item);
        }}/>
     */
    AddIncident = (incident) => {
        const { type, location, photo, notes, county } = incident;
        if (!type || !location) {
            //type and location required
            return;
        }
        firebase.database().ref('incidents').push(
            {
                type: type,
                location: location,
                photo: photo,
                notes: notes,
                county: county
            },
            (error) => {
                if (error) {
                    console.log(error);
                }
            }
        );
    }

    AddResource = (resource) => {
        const { type, location, photo, notes, county } = resource;
        if (!type || !location) {
            //type and location required
            return;
        }
        firebase.database().ref('resources').push(
            {
                type: type,
                location: location,
                photo: photo,
                notes: notes,
                county: county
            },
            (error) => {
                if (error) {
                    console.log(error);
                }
            }
        );
    }

    getResources = (county) => {
        // if(!county){
        //     return [];
        // }
        firebase.database().ref('resources')
            .orderByChild("county")
            .equalTo(county)
            .once('value', function (snapshot) {
                let arr = [];
                obj = snapshot.val();
                for(key in obj){
                    arr.push(obj[key]);
                }

                return arr;
            })
    }

    getIncidents = (county) => {
        if(!county){
            return [];
        }
        firebase.database().ref('incidents')
            .orderByChild("county")
            .equalTo(county)
            .once('value', function (snapshot) {
                let arr = [];
                console.log(snapshot.val());
                obj = snapshot.val();
                for(key in obj){
                    arr.push(obj[key]);
                }

                return arr;
            })
    }

}

Firebase.shared = new Firebase();
export default Firebase