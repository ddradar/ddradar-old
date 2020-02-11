/* eslint-disable no-undef */
import 'jest-fetch-mock'
import * as repo from '~/plugins/chart-repository'
import { StepChart } from '~/types/step-chart'

describe('ChartRepository', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResolvedValue({ json: () => charts } as any)
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
    test('throws error', () => {
      // Arrange
      fetchMock.resetMocks()
      fetchMock.mockResolvedValue({ json: () => invalidData } as any)

      // Act
      // Assert
      expect(repo.fetchSongCharts('foo')).rejects.toThrowError(
        'JSON file is not StepChart[]'
      )
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
    chaos: 0,
    version: 20200101
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
    chaos: 6,
    version: 20200101
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
    chaos: 14,
    version: 20200101
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
    chaos: 34,
    version: 20200101
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
    chaos: 7,
    version: 20200101
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
    chaos: 14,
    version: 20200101
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
    chaos: 26,
    version: 20200101
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
    chaos: 0,
    version: 20200101
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
    chaos: 2,
    version: 20200101
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
    chaos: 2,
    version: 20200101
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
    chaos: 20,
    version: 20200101
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
    chaos: 35,
    version: 20200101
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
    chaos: 2,
    version: 20200101
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
    chaos: 2,
    version: 20200101
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
    chaos: 14,
    version: 20200101
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
    chaos: 21,
    version: 20200101
  }
]
const invalidData = {
  songId: 'DblIbDd6lQQQoO9bloOI9iIqO1IiQoID',
  foo: 'bar',
  playStyle: 1,
  difficulty: 10
}
