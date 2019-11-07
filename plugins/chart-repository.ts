import firebase from '@/plugins/firebase'
import 'firebase/firestore'
import { StepChart } from '~/types/step-chart'
import { PlayStyle } from '~/types/play-style'
import { Level } from '~/types/level'

const db = firebase.firestore()

export async function fetchSongCharts(songId: string) {
  const c = await db
    .collection(`version/1/songs/${songId}/charts`)
    .orderBy('playStyle')
    .orderBy('difficulty')
    .get()
  return c.docs.map(d => d.data() as StepChart)
}

export async function fetchChartsByLevel(playStyle: PlayStyle, level: Level) {
  const snapShot = await db
    .collectionGroup('charts')
    .where('playStyle', '==', playStyle)
    .where('level', '==', level)
    .orderBy('songName')
    .orderBy('difficulty')
    .get()
  return snapShot.docs.map(d => d.data() as StepChart)
}
