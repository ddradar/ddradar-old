import firebase from 'firebase/app'
import { environments } from '~/plugins/environments'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: environments.FIREBASE_API_KEY,
    authDomain: environments.FIREBASE_AUTH_DOMAIN,
    databaseURL: environments.FIREBASE_DATABASE_URL,
    projectId: environments.FIREBASE_PROJECT_ID,
    storageBucket: environments.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: environments.FIREBASE_MESSAGING_SENDER_ID,
    appId: environments.FIREBASE_APP_ID
  })
}

export default firebase
