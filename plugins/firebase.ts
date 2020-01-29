import firebase from 'firebase/app'

/* eslint-disable no-process-env */
if (!firebase.apps.length) {
  const options: FirebaseOptions = {
    apiKey: process.env.apiKey!,
    authDomain: process.env.authDomain!,
    databaseURL: process.env.databaseURL!,
    projectId: process.env.projectId!,
    storageBucket: process.env.storageBucket!,
    messagingSenderId: process.env.messagingSenderId!,
    appId: process.env.appId!
  }
  firebase.initializeApp(options)
}
/* eslint-enable no-process-env */

export default firebase

type FirebaseOptions = {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}
