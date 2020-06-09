
import * as firebase from 'firebase';
import firebaseConfig from './firebase/firebase.js';
class Fire {
    constructor() {
        this.itemRef= firebaseConfig.database();
    }
 
    edit = async ({text, localUri,uid,key}) => {
        const remoteUri = await this.uploadPhotoAsync(localUri);
        return new Promise((res, rej) => {
            this.itemRef.ref().child('Posts').child(key).set({
                    text,
                    uid:uid,
                    timestamp: this.timestamp,
                    image: remoteUri
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                });
        });
    }
    addPost = async ({ text, localUri }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri);

        return new Promise((res, rej) => {
            this.itemRef.ref().child('Posts').push({
                    text,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    image: remoteUri
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                });
        });
    };

    uploadPhotoAsync = async uri => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`;

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebaseConfig
                .storage()
                .ref(path)
                .put(file);

            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };

    get firestore() {
        return firebaseConfig.firestore();
    }

    get uid() {
        return (firebaseConfig.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;
