/* eslint-disable no-console */
/* eslint-disable no-process-env */
import * as firebase from 'firebase-admin'
import { Song } from './song'
import { StepChart, getChartDocumentId } from './step-chart'

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert({
      projectId: 'ddradar-7aeea',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
    }),
    databaseURL: 'https://ddradar-7aeea.firebaseio.com'
  })
}
const db = firebase.firestore()

export async function fetchDbVersion() {
  const docRef = db.doc('/version/1')
  return (await docRef.get()).data() as {
    chartVersion: number
    songVersion: number
  }
}

export async function setDbVersion(doc: {
  chartVersion: number
  songVersion: number
}) {
  await db.doc('/version/1').set(doc)
}

export async function addSong(song: Song) {
  if (song.id === undefined) {
    return
  }
  await db
    .collection('version/1/songs')
    .doc(song.id)
    .set(song, { merge: false })
  console.log(`Add Song: ${song.name}`)
}

export async function addStepChart(chart: StepChart) {
  const docId = getChartDocumentId(chart)
  await db
    .collection(`version/1/songs/${chart.songId}/charts`)
    .doc(docId)
    .set(chart, { merge: false })
  console.log(`Add Chart: ${chart.songName} ${docId}`)
}
