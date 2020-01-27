import * as firebaseTest from '@firebase/testing'
import * as repo from '@/plugins/chart-repository'
import { StepChart } from '~/types/step-chart'
import { PlayStyle } from '~/types/play-style'
import { Difficulty } from '~/types/difficulty'

jest.mock('@/plugins/firebase', () => {
  return firebaseTest.initializeTestApp({ projectId: 'ddradar-chartrepo-test' })
})

describe('ChartRepository', () => {
  const db = firebaseTest
    .initializeAdminApp({ projectId: 'ddradar-chartrepo-test' })
    .firestore()
  beforeAll(async () => {
    const batch = db.batch()
    charts.forEach((chart) => {
      const ref = db
        .collection(`version/1/songs/${chart.songId}/charts`)
        .doc(repo.getChartDocumentId(chart))
      batch.set(ref, chart)
    })
    const invalidDataRef = db.collection('version/1/charts').doc('foo')
    batch.set(invalidDataRef, invalidData)
    await batch.commit()
  })
  describe('getChartDocumentId', () => {
    test.each([
      [1, 0, 'single-beginner'],
      [1, 1, 'single-basic'],
      [1, 2, 'single-difficult'],
      [1, 3, 'single-expert'],
      [1, 4, 'single-challenge'],
      [2, 1, 'double-basic'],
      [2, 2, 'double-difficult'],
      [2, 3, 'double-expert'],
      [2, 4, 'double-challenge']
    ])(
      'returns lowerCased playstyle-difficulty name',
      (playStyle, difficulty, expected) => {
        expect(
          repo.getChartDocumentId({
            playStyle: playStyle as PlayStyle,
            difficulty: difficulty as Difficulty
          })
        ).toBe(expected)
      }
    )
  })
  describe('fetchSongCharts', () => {
    test('returns StepChart[] if exists', async () => {
      const songId = charts[0].songId
      const fetchedCharts = await repo.fetchSongCharts(charts[0].songId)
      expect(fetchedCharts).toHaveLength(
        charts.filter((c) => c.songId === songId).length
      )
    })
    test('returns [] if not exists', async () => {
      const fetchedCharts = await repo.fetchSongCharts('foo')
      expect(fetchedCharts).toHaveLength(0)
    })
  })
  describe('fetchChartsByLevel', () => {
    test('returns StepChart[] if exists', async () => {
      const playStyle = 1
      const level = 10
      const fetchedCharts = await repo.fetchChartsByLevel(playStyle, level)
      expect(fetchedCharts).toHaveLength(
        charts.filter((c) => c.level === level && c.playStyle === playStyle)
          .length
      )
    })
    test('returns [] if not exists', async () => {
      const playStyle = 2
      const level = 20
      const fetchedCharts = await repo.fetchChartsByLevel(playStyle, level)
      expect(fetchedCharts).toHaveLength(0)
    })
  })
  afterAll(async () => {
    await Promise.all(firebaseTest.apps().map((app) => app.delete()))
  })
})

const charts: StepChart[] = [
  {
    songId: 'dq190Il9iO1bD698ll6ddObIlqdIQ1O9',
    songName: 'AM-3P',
    playStyle: 1,
    difficulty: 0,
    level: 3,
    notes: 74,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 19,
    voltage: 16,
    air: 3,
    freeze: 0,
    chaos: 0
  },
  {
    songId: 'dq190Il9iO1bD698ll6ddObIlqdIQ1O9',
    songName: 'AM-3P',
    playStyle: 1,
    difficulty: 1,
    level: 7,
    notes: 164,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 43,
    voltage: 32,
    air: 34,
    freeze: 0,
    chaos: 6
  },
  {
    songId: 'dq190Il9iO1bD698ll6ddObIlqdIQ1O9',
    songName: 'AM-3P',
    playStyle: 1,
    difficulty: 2,
    level: 8,
    notes: 195,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 51,
    voltage: 32,
    air: 34,
    freeze: 0,
    chaos: 14
  },
  {
    songId: 'dq190Il9iO1bD698ll6ddObIlqdIQ1O9',
    songName: 'AM-3P',
    playStyle: 1,
    difficulty: 3,
    level: 11,
    notes: 244,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 64,
    voltage: 48,
    air: 41,
    freeze: 0,
    chaos: 34
  },
  {
    songId: 'dq190Il9iO1bD698ll6ddObIlqdIQ1O9',
    songName: 'AM-3P',
    playStyle: 2,
    difficulty: 1,
    level: 8,
    notes: 166,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 43,
    voltage: 32,
    air: 21,
    freeze: 0,
    chaos: 7
  },
  {
    songId: 'dq190Il9iO1bD698ll6ddObIlqdIQ1O9',
    songName: 'AM-3P',
    playStyle: 2,
    difficulty: 2,
    level: 9,
    notes: 194,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 50,
    voltage: 32,
    air: 21,
    freeze: 0,
    chaos: 14
  },
  {
    songId: 'dq190Il9iO1bD698ll6ddObIlqdIQ1O9',
    songName: 'AM-3P',
    playStyle: 2,
    difficulty: 3,
    level: 10,
    notes: 240,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 63,
    voltage: 43,
    air: 27,
    freeze: 0,
    chaos: 26
  },
  {
    songId: 'DblIbDd6lQQQoO9bloOI9iIqO1IiQoID',
    songName: 'BRILLIANT 2U',
    playStyle: 1,
    difficulty: 0,
    level: 3,
    notes: 95,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 25,
    voltage: 25,
    air: 9,
    freeze: 0,
    chaos: 0
  },
  {
    songId: 'DblIbDd6lQQQoO9bloOI9iIqO1IiQoID',
    songName: 'BRILLIANT 2U',
    playStyle: 1,
    difficulty: 1,
    level: 6,
    notes: 162,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 43,
    voltage: 43,
    air: 12,
    freeze: 0,
    chaos: 2
  },
  {
    songId: 'DblIbDd6lQQQoO9bloOI9iIqO1IiQoID',
    songName: 'BRILLIANT 2U',
    playStyle: 1,
    difficulty: 2,
    level: 6,
    notes: 176,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 46,
    voltage: 43,
    air: 63,
    freeze: 0,
    chaos: 2
  },
  {
    songId: 'DblIbDd6lQQQoO9bloOI9iIqO1IiQoID',
    songName: 'BRILLIANT 2U',
    playStyle: 1,
    difficulty: 3,
    level: 10,
    notes: 225,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 59,
    voltage: 50,
    air: 56,
    freeze: 0,
    chaos: 20
  },
  {
    songId: 'DblIbDd6lQQQoO9bloOI9iIqO1IiQoID',
    songName: 'BRILLIANT 2U',
    playStyle: 1,
    difficulty: 4,
    level: 10,
    notes: 264,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 69,
    voltage: 50,
    air: 45,
    freeze: 0,
    chaos: 35
  },
  {
    songId: 'DblIbDd6lQQQoO9bloOI9iIqO1IiQoID',
    songName: 'BRILLIANT 2U',
    playStyle: 2,
    difficulty: 1,
    level: 6,
    notes: 165,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 43,
    voltage: 43,
    air: 12,
    freeze: 0,
    chaos: 2
  },
  {
    songId: 'DblIbDd6lQQQoO9bloOI9iIqO1IiQoID',
    songName: 'BRILLIANT 2U',
    playStyle: 2,
    difficulty: 2,
    level: 7,
    notes: 180,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 47,
    voltage: 43,
    air: 102,
    freeze: 0,
    chaos: 2
  },
  {
    songId: 'DblIbDd6lQQQoO9bloOI9iIqO1IiQoID',
    songName: 'BRILLIANT 2U',
    playStyle: 2,
    difficulty: 3,
    level: 9,
    notes: 227,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 60,
    voltage: 50,
    air: 56,
    freeze: 0,
    chaos: 14
  },
  {
    songId: 'DblIbDd6lQQQoO9bloOI9iIqO1IiQoID',
    songName: 'BRILLIANT 2U',
    playStyle: 2,
    difficulty: 4,
    level: 10,
    notes: 229,
    freezeArrow: 8,
    shockArrow: 0,
    stream: 60,
    voltage: 43,
    air: 27,
    freeze: 35,
    chaos: 21
  }
]
const invalidData = {
  songId: 'DblIbDd6lQQQoO9bloOI9iIqO1IiQoID',
  foo: 'bar',
  playStyle: 1,
  difficulty: 10
}
