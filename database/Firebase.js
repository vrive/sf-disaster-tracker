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

    getImageRemoteUri = (image) => {
        const photoPath = `photos/${Date.now()}.jpg`;
        return new Promise(async (res, rej) => {
            const response = await fetch(image);
            const file = await response.blob();
            let upload = firebase.storage().ref(photoPath).put(file);
            upload.on('state_changed', snapshot => {

            }, err => {
                rej(err);

            }, async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url);
            }
            )
        })
    }

    /**
     * Example of usage:
     * const fb = Firebase.shared;
     * <Button title='add' onPress={()=> {
        const item = new Incident(IncidentTypes.TREE, "Miami", null, "Some notes");
        fb.AddResource(item);
        }}/>
     */
    AddIncident = async (incident) => {
        const { type, location, photo, notes, county } = incident;
        if (!type || !location) {
            //type and location required
            return;
        }
        if (photo) {
            const remoteUri = await this.getImageRemoteUri(photo);
            return new Promise((res, rej) => {
                firebase.database().ref('incidents').push(
                    {
                        type: type,
                        location: location,
                        photo: remoteUri,
                        notes: notes,
                        county: county
                    },
                    (error) => {
                        if (error) {
                            console.log(error);
                            rej(error);
                        }
                        res();
                    }
                );
            })
        } else {
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

    }

    AddResource = async (resource) => {
        const { type, location, photo, notes, county } = resource;
        if (!type || !location) {
            //type and location required
            return;
        }
        if (photo) {
            const remoteUri = await this.getImageRemoteUri(photo);
            return new Promise((res, rej) => {
                firebase.database().ref('resources').push(
                    {
                        type: type,
                        location: location,
                        photo: remoteUri,
                        notes: notes,
                        county: county
                    },
                    (error) => {
                        if (error) {
                            console.log(error);
                            rej(error);
                        }
                        res();
                    }
                );
            })
        } else {
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
    }

    GetResourcesRef = (county) => {
        if (!county) {
            return null;
        }

        return firebase.database().ref('resources');
    }

    GetIncidentsRef = (county) => {
        if (!county) {
            return null;
        }

        return firebase.database().ref('incidents');
    }

}

Firebase.shared = new Firebase();
export default Firebase