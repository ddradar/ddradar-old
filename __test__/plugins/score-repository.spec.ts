import * as repo from '~/plugins/score-repository'

jest.mock('~/plugins/firebase', () => ({
  firestore: jest.fn()
}))

describe('ScoreRepository', () => {
  describe('isScore()', () => {
    const validScore: repo.Score = {
      songId: '00000000000000000000000000000000',
      playStyle: 1,
      difficulty: 2,
      score: 998000,
      clearLamp: 'FC',
      exScore: 1350,
      rank: 'AAA'
    }
    test.each([undefined, null, true, 1, 'score', {}])(
      'returns false if obj is %p',
      (obj) => {
        expect(repo.isScore(obj)).toBe(false)
      }
    )
    test.each([
      { ...validScore, songId: 0 },
      { ...validScore, playStyle: 3 },
      { ...validScore, score: -1 },
      { ...validScore, exScore: 0.5 },
      { ...validScore, clearLamp: 'Full Combo' },
      { ...validScore, rank: 'SSS' }
    ])('returns false if obj is %p', (obj) => {
      expect(repo.isScore(obj)).toBe(false)
    })
    test.each([{ ...validScore }, { ...validScore, playStyle: 2 }])(
      'returns true if obj is %p',
      (obj) => {
        expect(repo.isScore(obj)).toBe(true)
      }
    )
  })
  describe('getDanceLevel()', () => {
    test.each([
      ['D', 0],
      ['D+', 550000],
      ['C-', 590000],
      ['C', 600000],
      ['C+', 650000],
      ['B-', 690000],
      ['B', 700000],
      ['B+', 750000],
      ['A-', 790000],
      ['A', 800000],
      ['A+', 850000],
      ['AA-', 890000],
      ['AA', 900000],
      ['AA+', 950000],
      ['AAA', 990000],
      ['AAA', 1000000]
    ])('returns %s if score is %i', (expected, score) => {
      expect(repo.getDanceLevel(score)).toBe(expected)
    })
    test.each([-1, 10.5, NaN, Infinity, -Infinity])(
      'throws error if score is %d',
      (d) => {
        expect(() => repo.getDanceLevel(d)).toThrowError('score is invalid')
      }
    )
  })
  describe('calcScore()', () => {
    test.each([
      [
        1000000,
        { notes: 270, freezeArrow: 20, shockArrow: 10 },
        270,
        0,
        0,
        0,
        30
      ],
      [
        998000,
        { notes: 270, freezeArrow: 20, shockArrow: 10 },
        70,
        200,
        0,
        0,
        30
      ],
      [
        693890,
        { notes: 846, freezeArrow: 12, shockArrow: 0 },
        352,
        171,
        103,
        10,
        11
      ],
      [
        995500,
        { notes: 492, freezeArrow: 36, shockArrow: 0 },
        421,
        66,
        5,
        0,
        36
      ]
    ])(
      'returns %i chart is %p and score is {Mv:%i, Pf:%i, Gr:%i, Gd:%i, Ok:%i}',
      (expected, chart, mv, pf, gr, gd, ok) => {
        expect(repo.calcScore(chart, mv, pf, gr, gd, ok)).toBe(expected)
      }
    )
    test.each([
      [-1, 0, 0, 0, 0, /invalid marvelous:/],
      [0, 10.5, 0, 0, 0, /invalid perfect:/],
      [0, 0, Infinity, 0, 0, /invalid great:/],
      [0, 0, 0, -Infinity, 0, /invalid good:/],
      [0, 0, 0, 0, NaN, /invalid ok:/],
      [201, 0, 0, 0, 0, /judge count\(\d+\) is greater than notes\(200\)/],
      [200, 0, 0, 0, 21, /ok count\(\d+\) is greater than FA\+SA count\(20\)/]
    ])(
      'throws error if {Mv:%d, Pf:%d, Gr:%d, Gd:%d, Ok:%d}',
      (mv, pf, gr, gd, ok, err) => {
        expect(() =>
          repo.calcScore(
            { notes: 200, freezeArrow: 20, shockArrow: 0 },
            mv,
            pf,
            gr,
            gd,
            ok
          )
        ).toThrowError(err)
      }
    )
  })
  describe('calcExScore()', () => {
    test.each([
      [0, 0, 0, 0, 0],
      [865, 144, 99, 100, 45],
      [1559, 470, 37, 0, 25]
    ])(
      'returns %i if {Mv:%i, Pf:%i, Gr:%i, Ok:%i}',
      (expected, mv, pf, gr, ok) => {
        expect(repo.calcExScore(mv, pf, gr, ok)).toBe(expected)
      }
    )
    test.each([
      [-1, 0, 0, 0, /invalid marvelous:/],
      [0, 10.5, 0, 0, /invalid perfect:/],
      [0, 0, Infinity, 0, /invalid great:/],
      [0, 0, 0, -Infinity, /invalid ok:/],
      [NaN, NaN, NaN, NaN, /invalid marvelous:/]
    ])(
      'throws error if {Mv:%d, Pf:%d, Gr:%d, Ok:%d}',
      (mv, pf, gr, ok, err) => {
        expect(() => repo.calcExScore(mv, pf, gr, ok)).toThrowError(err)
      }
    )
  })
})
