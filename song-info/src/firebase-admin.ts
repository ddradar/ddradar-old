import * as firebase from 'firebase-admin'

if (!firebase.apps.length) {
  /* eslint-disable no-process-env */
  firebase.initializeApp({
    credential: firebase.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  })
  /* eslint-enable no-process-env */
}
const db = firebase.firestore()
const versionDocId = '/version/1'
type Version = {
  chartVersion: number
  songVersion: number
}

export const setDbVersion = (doc: Version) => db.doc(versionDocId).set(doc)
