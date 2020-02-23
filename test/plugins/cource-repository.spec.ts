import * as repo from '~/plugins/cource-repository'
import courceJson from '~/static/cource.json'
import { Cource } from '~/types/cource'

describe('CourceRepository', () => {
  test('version equals latest cource version', () => {
    // Arrange
    const latestCourceVersion = courceJson
      .map((c) => c.version)
      .sort((l, r) => r - l)[0]
    // Act - Assert
    expect(repo.version).toBe(latestCourceVersion)
  })
  describe('fetchCource()', () => {
    test.each(['', '0000'])('throws error if cource id is %s', (s) => {
      expect(() => repo.fetchCource(s, 1, 0)).toThrowError(
        /Not Found Cource Id: /
      )
    })
    test.each<[string, 1 | 2, 0 | 4]>([
      ['qbbOOO1QibO1861bqQII9lqlPiIoqb98', 1, 4], // FIRST(SP/CHALLENGE)
      ['I90bQ81P1blOPIdd9PPl6I9D8DQ1dIob', 2, 0], // TWENTY(DP/BEGINNER)
      ['ol8oiPo8iod9bDPPD1qdlbPd1ddqP6oP', 2, 4], // 九段(SP), but playStyle is DP
      ['dib16I1b0o9OdOd1O90dO1Q6iIO9PQo9', 1, 4] // 三段(SP), but playStyle is DP
    ])('throws error if order is invalid', (id, playStyle, difficulty) => {
      expect(() => repo.fetchCource(id, playStyle, difficulty)).toThrowError(
        /Not Found (SP|DP)\/.+ order/
      )
    })
    test('returns Cource', () => {
      // Arrange
      const validCource: Cource = {
        id: '19id1DO6q9Pb1681db61D8D8oQi9dlb6',
        name: '初段',
        playStyle: 1,
        difficulty: 4,
        level: 10,
        chartOrder: [
          {
            songId: 'O1blDPOQ8IQb00o0D89QIDIlo8b06liD',
            songName: 'HIGHER',
            playStyle: 1,
            difficulty: 3,
            level: 9
          },
          {
            songId: 'q1o901oPqbbI1Q61qo688bDd0Pqlb08l',
            songName: 'Shine',
            playStyle: 1,
            difficulty: 3,
            level: 9
          },
          {
            songId: '8o6ibb0b1i66Q0D8699boob69b80Qb1i',
            songName: 'IN THE ZONE',
            playStyle: 1,
            difficulty: 3,
            level: 9
          },
          {
            songId: '6Qq1q91q8iIPlI89qDq96bO8QDD0qOql',
            songName: 'B4U',
            playStyle: 1,
            difficulty: 3,
            level: 10
          }
        ]
      }

      // Act
      const cource = repo.fetchCource(
        validCource.id,
        validCource.playStyle,
        validCource.difficulty
      )

      // Assert
      expect(cource).toStrictEqual(validCource)
    })
  })
  describe('fetchAllCourceList()', () => {
    test('returns Cource[]', () => {
      const cources = repo.fetchAllCourceList()
      expect(cources).toBeTruthy()
    })
  })
})
