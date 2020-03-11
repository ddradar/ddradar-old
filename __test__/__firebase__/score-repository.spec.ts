import * as firebaseTest from '@firebase/testing'

import * as repo from '~/plugins/score-repository'

jest.mock('~/plugins/firebase', () =>
  firebaseTest.initializeTestApp({
    projectId: 'ddradar-score-test',
    auth: { uid: 'rinon' }
  })
)

describe('ScoreRepository', () => {
  const uid = 'rinon'
  const scores: repo.Score[] = [
    {
      songId: 'dq190Il9iO1bD698ll6ddObIlqdIQ1O9',
      playStyle: 1,
      difficulty: 0,
      clearLamp: 'MFC',
      score: 1000000,
      rank: 'AAA',
      exScore: 74 * 3
    },
    {
      songId: 'dq190Il9iO1bD698ll6ddObIlqdIQ1O9',
      playStyle: 1,
      difficulty: 1,
      clearLamp: 'PFC',
      score: 999800,
      rank: 'AAA',
      exScore: 164 * 3 - 20
    },
    {
      songId: 'DblIbDd6lQQQoO9bloOI9iIqO1IiQoID',
      playStyle: 1,
      difficulty: 2,
      clearLamp: 'MFC',
      score: 1000000,
      rank: 'AAA',
      exScore: 176 * 3
    },
    {
      songId: 'Iqo9PQiPbq8Q0I6io6lPIDi608lQqbbq',
      playStyle: 1,
      difficulty: 3,
      clearLamp: 'FC',
      score: 995300,
      rank: 'AAA',
      exScore: 1268
    }
  ]

  beforeAll(async () => {
    const db = firebaseTest
      .initializeAdminApp({
        projectId: 'ddradar-score-test'
      })
      .firestore()
    const batch = db.batch()
    scores.forEach((score) => {
      const docId = `version/1/users/${uid}/scores/${score.songId}-${score.playStyle}-${score.difficulty}`
      const ref = db.doc(docId)
      batch.set(ref, score)
    })
    const invalidScoreRef = db.doc(`version/1/users/${uid}/scores/foo`)
    batch.set(invalidScoreRef, { foo: 'bar' })
    await batch.commit()
  })
  afterAll(async () => {
    await Promise.all(firebaseTest.apps().map((app) => app.delete()))
  })

  describe('getUserScore()', () => {
    test.each([
      [[scores[0], scores[1]], scores[0].songId],
      [[scores[2]], scores[2].songId],
      [[scores[3]], scores[3].songId]
    ])('returns %p if songId is %s', async (expected, songId) => {
      expect(await repo.getUserScore(uid, songId)).toStrictEqual(expected)
    })
    test('returns [] if not found', async () => {
      expect(await repo.getUserScore(uid, 'bar')).toHaveLength(0)
    })
    test('returns [] if not auth', async () => {
      expect(await repo.getUserScore('afro', scores[0].songId)).toHaveLength(0)
    })
  })
  describe('setUserScore()', () => {})
})
