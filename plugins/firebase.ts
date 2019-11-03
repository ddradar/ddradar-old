import firebase from 'firebase/app'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCqu2-qyqitH_5WuEl_IJkWsSwXvL8VucM',
    authDomain: 'ddradar-7aeea.firebaseapp.com',
    databaseURL: 'https://ddradar-7aeea.firebaseio.com',
    projectId: 'ddradar-7aeea',
    storageBucket: 'ddradar-7aeea.appspot.com',
    messagingSenderId: '763742444870',
    appId: '1:763742444870:web:cd30fb79246864ee'
  })
}

export default firebase
