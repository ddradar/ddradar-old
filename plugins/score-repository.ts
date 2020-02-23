import 'firebase/firestore'

import firebase from '~/plugins/firebase'
import { isDifficulty } from '~/types/difficulty'
import { isPlayStyle } from '~/types/play-style'
import { StepChart } from '~/types/step-chart'
import {
  hasNumberProperty,
  hasProperty,
  hasStringProperty
} from '~/utils/type-assert'

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

const compareClearLamp = (left: ClearLamp, right: ClearLamp): ClearLamp =>
  clearLampList.indexOf(left) > clearLampList.indexOf(right) ? left : right

export const isScore = (obj: unknown): obj is Score =>
  typeof obj === 'object' &&
  obj !== null &&
  hasProperty(obj, 'playStyle', 'difficulty', 'isPublic') &&
  isPlayStyle(obj.playStyle) &&
  isDifficulty(obj.difficulty) &&
  typeof obj.isPublic === 'boolean' &&
  hasNumberProperty(obj, 'score', 'exScore') &&
  hasStringProperty(obj, 'songId', 'clearLamp', 'rank') &&
  (clearLampList as string[]).includes(obj.clearLamp) &&
  (rankList as string[]).includes(obj.rank)

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

const isPositiveInteger = (num: number) => Number.isInteger(num) && num >= 0

export const calcScore = (
  {
    notes,
    freezeArrow,
    shockArrow
  }: Pick<StepChart, 'notes' | 'freezeArrow' | 'shockArrow'>,
  marvelous: number,
  perfect: number,
  great: number,
  good: number,
  ok: number
) => {
  if (!isPositiveInteger(marvelous))
    throw new Error(`invalid marvelous: ${marvelous}`)
  if (!isPositiveInteger(perfect))
    throw new Error(`invalid perfect: ${perfect}`)
  if (!isPositiveInteger(great)) throw new Error(`invalid great: ${great}`)
  if (!isPositiveInteger(good)) throw new Error(`invalid good: ${good}`)
  if (!isPositiveInteger(ok)) throw new Error(`invalid ok: ${ok}`)

  const noteObjects = notes + freezeArrow + shockArrow
  const baseScore = 1000000 / noteObjects
  const rawScore =
    baseScore * (marvelous + ok) +
    (baseScore - 10) * perfect +
    (baseScore * 0.6 - 10) * great +
    (baseScore * 0.2 - 10) * good
  return Math.floor(rawScore / 10) * 10
}

export const calcExScore = (
  marvelous: number,
  perfect: number,
  great: number,
  ok: number
) => {
  if (!isPositiveInteger(marvelous))
    throw new Error(`invalid marvelous: ${marvelous}`)
  if (!isPositiveInteger(perfect))
    throw new Error(`invalid perfect: ${perfect}`)
  if (!isPositiveInteger(great)) throw new Error(`invalid great: ${great}`)
  if (!isPositiveInteger(ok)) throw new Error(`invalid ok: ${ok}`)

  return marvelous * 3 + ok * 3 + perfect * 2 + great * 1
}
