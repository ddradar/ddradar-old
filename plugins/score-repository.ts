import 'firebase/firestore'

import firebase from '~/plugins/firebase'
import { hasNumberProperty, hasProperty, hasStringProperty } from '~/test/util'
import { isDifficulty } from '~/types/difficulty'
import { isPlayStyle } from '~/types/play-style'
import { StepChart } from '~/types/step-chart'

const db = firebase.firestore()

type ClearLamp =
  | 'NoPlay'
  | 'Failed'
  | 'Assisted'
  | 'Clear'
  | 'Life4'
  | 'GoodFC'
  | 'FC'
  | 'PFC'
  | 'MFC'

export const clearLampList: ClearLamp[] = [
  'NoPlay',
  'Failed',
  'Assisted',
  'Clear',
  'Life4',
  'GoodFC',
  'FC',
  'PFC',
  'MFC'
]

type DanceLevel =
  | '-'
  | 'E'
  | 'D'
  | 'D+'
  | 'C-'
  | 'C'
  | 'C+'
  | 'B-'
  | 'B'
  | 'B+'
  | 'A-'
  | 'A'
  | 'A+'
  | 'AA-'
  | 'AA'
  | 'AA+'
  | 'AAA'

export const rankList: DanceLevel[] = [
  '-',
  'E',
  'D',
  'D+',
  'C-',
  'C',
  'C+',
  'B-',
  'B',
  'B+',
  'A-',
  'A',
  'A+',
  'AA-',
  'AA',
  'AA+',
  'AAA'
]

export type Score = Pick<StepChart, 'songId' | 'playStyle' | 'difficulty'> & {
  score: number
  exScore: number
  clearlamp: ClearLamp
  rank: DanceLevel
  isPublic: boolean
}

export const getUserScore = async (uid: string, songId: string) => {
  const scores: Score[] = []
  const data = await db
    .collection(`version/1/users/${uid}/scores/`)
    .where('songId', '==', songId)
    .orderBy('playStyle')
    .orderBy('difficulty')
    .get()
  data.forEach((doc) => {
    const score = doc.data()
    if (isScore(score)) scores.push(score)
  })
  return scores
}

export const setUserScore = async (
  uid: string,
  isPublic: boolean,
  score: Score
) => {
  const doc = db.doc(
    `version/1/users/${uid}/scores/${score.songId}-${score.playStyle}-${score.difficulty}`
  )
  await db.runTransaction(async (tran) => {
    const prevDoc = await tran.get(doc)
    const prevScore = prevDoc.data()
    if (!isScore(prevScore)) {
      tran.set(doc, { ...score, createdAt: firebase.firestore.Timestamp.now() })
      return
    }
    const newScore = {
      ...prevScore,
      score: prevScore.score > score.score ? prevScore.score : score.score,
      exScore:
        prevScore.exScore > score.exScore ? prevScore.exScore : score.exScore,
      clearLamp: compareClearLamp(prevScore.clearlamp, score.clearlamp),
      rank: score.rank !== 'E' ? getDanceLevel(score.score) : score.rank,
      isPublic,
      updateAt: firebase.firestore.Timestamp.now()
    }
    tran.update(doc, newScore)
  })
}

const compareClearLamp = (left: ClearLamp, right: ClearLamp): ClearLamp => {
  const leftIndex = clearLampList.indexOf(left)
  const rightIndex = clearLampList.indexOf(right)
  return leftIndex > rightIndex ? left : right
}

export const isScore = (obj: unknown): obj is Score =>
  typeof obj === 'object' &&
  obj !== null &&
  hasStringProperty(obj, 'songId') &&
  hasProperty(obj, 'playStyle') &&
  isPlayStyle(obj.playStyle) &&
  hasProperty(obj, 'difficulty') &&
  isDifficulty(obj.difficulty) &&
  hasNumberProperty(obj, 'score') &&
  hasNumberProperty(obj, 'exScore') &&
  hasStringProperty(obj, 'clearLamp') &&
  (clearLampList as string[]).includes(obj.clearLamp) &&
  hasStringProperty(obj, 'rank') &&
  (rankList as string[]).includes(obj.rank) &&
  hasProperty(obj, 'isPublic') &&
  typeof obj.isPublic === 'boolean'

export const getDanceLevel = (score: number): DanceLevel => {
  if (!Number.isInteger(score) || score < 0 || score > 1000000)
    throw new Error('score is invalid')
  return score < 550000
    ? 'D'
    : score < 590000
    ? 'D+'
    : score < 600000
    ? 'C-'
    : score < 650000
    ? 'C'
    : score < 690000
    ? 'C+'
    : score < 700000
    ? 'B-'
    : score < 750000
    ? 'B'
    : score < 790000
    ? 'B+'
    : score < 800000
    ? 'A-'
    : score < 850000
    ? 'A'
    : score < 890000
    ? 'A+'
    : score < 900000
    ? 'AA-'
    : score < 950000
    ? 'AA'
    : score < 990000
    ? 'AA+'
    : 'AAA'
}
