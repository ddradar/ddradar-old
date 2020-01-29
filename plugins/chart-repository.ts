import firebase from 'firebase/app'
import 'firebase/firestore'
import { StepChart, isStepChart } from '~/types/step-chart'
import { PlayStyle, PlayStyleList } from '~/types/play-style'
import { Level } from '~/types/level'
import { DifficultyList } from '~/types/difficulty'

const db = firebase.firestore()

export async function fetchSongCharts(songId: string) {
  const c = await db
    .collection(`version/1/songs/${songId}/charts`)
    .orderBy('playStyle')
    .orderBy('difficulty')
    .get()
  return c.docs
    .map((d) => d.data())
    .filter((d) => isStepChart(d)) as StepChart[]
}

export async function fetchChartsByLevel(playStyle: PlayStyle, level: Level) {
  const snapShot = await db
    .collectionGroup('charts')
    .where('playStyle', '==', playStyle)
    .where('level', '==', level)
    .orderBy('songName')
    .orderBy('difficulty')
    .get()
  return snapShot.docs
    .map((d) => d.data())
    .filter((d) => isStepChart(d)) as StepChart[]
}

export function getChartDocumentId({
  playStyle,
  difficulty
}: Pick<StepChart, 'playStyle' | 'difficulty'>) {
  return `${PlayStyleList[playStyle]}-${DifficultyList[difficulty]}`.toLowerCase()
}
