import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Buefy from 'buefy'
import { mocked } from 'ts-jest/utils'
import SongPage from '@/pages/song/_id/_chart.vue'
import * as chartRepo from '@/plugins/chart-repository'
import * as songRepo from '@/plugins/song-repository'
import { Song } from '@/types/song'
import { StepChart } from '@/types/step-chart'

jest.mock('firebase/app', () => {
  return {
    firestore: jest.fn()
  }
})
jest.mock('@/plugins/chart-repository')
jest.mock('@/plugins/song-repository')

const localVue = createLocalVue()
localVue.use(Buefy)

describe('song/:id/:chart', () => {
  let wrapper: Wrapper<SongPage>
  let vm: any
  beforeEach(() => {
    wrapper = shallowMount(SongPage, { localVue })
    vm = wrapper.vm
  })
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('initialized default', () => {
    expect(vm.charts).toHaveLength(0)
    expect(vm.selectedIndex).toBe(0)
    expect(vm.isLoading).toBe(true)
  })
  describe('seriesName getter', () => {
    test.each([
      '1st',
      '2ndMIX',
      '3rdMIX',
      '4thMIX',
      '5thMIX',
      'EXTREME',
      'SuperNOVA',
      'SuperNOVA2',
      'X',
      'X2',
      'X3 VS 2ndMIX',
      '2013',
      '2014',
      'A',
      'A20'
    ])(
      'returns "DDR {series}" if series is not "DDRMAX" or "DDRMAX2"',
      (series) => {
        wrapper.setData({ song: { ...song, series } })
        expect(vm.seriesName).toBe(`DDR ${series}`)
      }
    )
    test.each(['DDRMAX', 'DDRMAX2'])(
      'returns "DDR {series}" if series is not "DDRMAX" or "DDRMAX2"',
      (series) => {
        wrapper.setData({ song: { ...song, series } })
        expect(vm.seriesName).toBe(series)
      }
    )
  })
  describe('chartName getter', () => {
    test('returns "" default', () => {
      expect(vm.chartName).toBe('')
    })
    test('returns "" if selectedIndex is out of range', () => {
      wrapper.setData({ charts, selectedIndex: 10 })
      expect(vm.chartName).toBe('')
    })
    test.each([
      { playStyle: 1, difficulty: 0, expected: 'SINGLE/BEGINNER' },
      { playStyle: 1, difficulty: 1, expected: 'SINGLE/BASIC' },
      { playStyle: 1, difficulty: 2, expected: 'SINGLE/DIFFICULT' },
      { playStyle: 1, difficulty: 3, expected: 'SINGLE/EXPERT' },
      { playStyle: 1, difficulty: 4, expected: 'SINGLE/CHALLENGE' },
      { playStyle: 2, difficulty: 1, expected: 'DOUBLE/BASIC' },
      { playStyle: 2, difficulty: 2, expected: 'DOUBLE/DIFFICULT' },
      { playStyle: 2, difficulty: 3, expected: 'DOUBLE/EXPERT' },
      { playStyle: 2, difficulty: 4, expected: 'DOUBLE/CHALLENGE' }
    ])('returns "PLAYSTYLE/DIFFICULTY" if selected chart', (d) => {
      wrapper.setData({
        charts: [
          { ...charts[0], playStyle: d.playStyle, difficulty: d.difficulty }
        ],
        selectedIndex: 0
      })
      expect(vm.chartName).toBe(d.expected)
    })
  })
  describe('selected getter', () => {
    test('returns null default', () => {
      expect(vm.selected).toBeNull()
    })
    test('returns null if selectedIndex is out of range', () => {
      wrapper.setData({ charts, selectedIndex: 10 })
      expect(vm.selected).toBeNull()
    })
    // [...Array(9).keys()] returns [0, 1, ..., 8]
    test.each([...Array(9).keys()])('returns charts[selectedIndex]', (i) => {
      wrapper.setData({ charts, selectedIndex: i })
      expect(vm.selected).toBe(charts[i])
    })
  })
  describe('asyncData method', () => {
    beforeAll(() => {
      mocked(songRepo).fetchSongById.mockResolvedValue(song)
      mocked(chartRepo).fetchSongCharts.mockResolvedValue(charts)
    })
    test('returns song and charts asynchronous', async () => {
      const data = await vm.$options.asyncData({
        params: { id: song.id, chart: 10 }
      })
      expect(data.charts).toStrictEqual(charts)
      expect(data.song).toStrictEqual(song)
      expect(data.isLoading).toBe(false)
    })
    test('does not return song and charts if cause error', async () => {
      mocked(songRepo).fetchSongById.mockRejectedValueOnce(
        new Error('Mock Error')
      )
      const data = await vm.$options.asyncData({
        params: { id: song.id, chart: 10 }
      })
      expect(data.charts).toBeUndefined()
      expect(data.song).toBeUndefined()
      expect(data.isLoading).toBe(false)
    })
  })
  describe('getChartType method', () => {
    test.each([
      [0, -1],
      [NaN, -Infinity],
      [1.5, Infinity]
    ])('returns "?-Unknown"', (i, j) => {
      expect(vm.getChartType({ playStyle: i, difficulty: j })).toBe('?-Unknown')
    })
    test('returns "SP-DIFFICULTY"', () => {
      expect(vm.getChartType({ playStyle: 1, difficulty: 0 })).toBe(
        'SP-BEGINNER'
      )
      expect(vm.getChartType({ playStyle: 1, difficulty: 1 })).toBe('SP-BASIC')
      expect(vm.getChartType({ playStyle: 1, difficulty: 2 })).toBe(
        'SP-DIFFICULT'
      )
      expect(vm.getChartType({ playStyle: 1, difficulty: 3 })).toBe('SP-EXPERT')
      expect(vm.getChartType({ playStyle: 1, difficulty: 4 })).toBe(
        'SP-CHALLENGE'
      )
    })
    test('returns "DP-DIFFICULTY"', () => {
      expect(vm.getChartType({ playStyle: 2, difficulty: 1 })).toBe('DP-BASIC')
      expect(vm.getChartType({ playStyle: 2, difficulty: 2 })).toBe(
        'DP-DIFFICULT'
      )
      expect(vm.getChartType({ playStyle: 2, difficulty: 3 })).toBe('DP-EXPERT')
      expect(vm.getChartType({ playStyle: 2, difficulty: 4 })).toBe(
        'DP-CHALLENGE'
      )
    })
  })
  describe('getClassName method', () => {
    test.each([
      { param: 0, expected: 'is-beginner' },
      { param: 1, expected: 'is-basic' },
      { param: 2, expected: 'is-difficult' },
      { param: 3, expected: 'is-expert' },
      { param: 4, expected: 'is-challenge' }
    ])('returns "is-difficulty" if param is Difficulty', (d) => {
      expect(vm.getClassName({ difficulty: d.param })).toBe(d.expected)
    })
    test.each([-1, 5, 1.5, NaN, Infinity, -Infinity])(
      'returns "is-unknown" if param is other',
      (i) => {
        expect(vm.getClassName(i)).toBe('is-unknown')
      }
    )
  })
  describe('changeSelected method', () => {
    test.each([-1, 5, 1.5, NaN, Infinity, -Infinity])(
      'causes selectedIndex to param value',
      (i) => {
        vm.changeSelected(i)
        expect(vm.selectedIndex).toBe(i)
      }
    )
    test.each([-1, 5, 1.5, NaN, Infinity, -Infinity])(
      'returns "is-unknown" if param is other',
      (i) => {
        expect(vm.getClassName(i)).toBe('is-unknown')
      }
    )
  })
  describe('calcSelectedIndex static method', () => {
    test.each([
      { chartId: 10, expected: 0 },
      { chartId: 11, expected: 1 },
      { chartId: 12, expected: 2 },
      { chartId: 13, expected: 3 },
      { chartId: 14, expected: 4 },
      { chartId: 21, expected: 5 },
      { chartId: 22, expected: 6 },
      { chartId: 23, expected: 7 },
      { chartId: 24, expected: 8 }
    ])('returns 0-8 songIndex if length is 9', (d) => {
      expect((SongPage as any).calcSelectedIndex(d.chartId, 9)).toBe(d.expected)
    })
    test.each([
      { chartId: 10, expected: 0 },
      { chartId: 11, expected: 1 },
      { chartId: 12, expected: 2 },
      { chartId: 13, expected: 3 },
      { chartId: 21, expected: 4 },
      { chartId: 22, expected: 5 },
      { chartId: 23, expected: 6 }
    ])('returns 0-6 songIndex if length is 7', (d) => {
      expect((SongPage as any).calcSelectedIndex(d.chartId, 7)).toBe(d.expected)
    })
    test.each([
      { chartId: 10, expected: 0 },
      { chartId: 11, expected: 0 },
      { chartId: 12, expected: 0 },
      { chartId: 13, expected: 0 },
      { chartId: 14, expected: 0 },
      { chartId: 21, expected: 1 },
      { chartId: 22, expected: 1 },
      { chartId: 23, expected: 1 },
      { chartId: 24, expected: 1 }
    ])('returns 0-1 songIndex if length is 2', (d) => {
      expect((SongPage as any).calcSelectedIndex(d.chartId, 2)).toBe(d.expected)
    })
    test.each([10, 11, 12, 13, 14, 21, 22, 23, 24])(
      'returns 0 if length is 1',
      (i) => {
        expect((SongPage as any).calcSelectedIndex(i, 1)).toBe(0)
      }
    )
    test.each([-1, 0, 1, 10.5, NaN, Infinity, -Infinity])(
      'returns 0 if chartId is invalid',
      (i) => {
        expect((SongPage as any).calcSelectedIndex(i, 9)).toBe(0)
      }
    )
  })
})

const song: Song = {
  id: '9doPbId8qid9I9l6ooloPQD1lq1Plb6I',
  name: 'PARANOiA KCET ～clean mix～',
  nameKana: 'PARANOIA KCET CLEAN MIX',
  nameIndex: 25,
  artist: '2MB',
  series: '2ndMIX',
  minBPM: 180,
  maxBPM: 180
}

const charts: StepChart[] = [
  {
    songId: '9doPbId8qid9I9l6ooloPQD1lq1Plb6I',
    songName: 'PARANOiA KCET ～clean mix～',
    playStyle: 1,
    difficulty: 0,
    level: 4,
    notes: 124,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 26,
    voltage: 30,
    air: 0,
    freeze: 0,
    chaos: 0
  },
  {
    songId: '9doPbId8qid9I9l6ooloPQD1lq1Plb6I',
    songName: 'PARANOiA KCET ～clean mix～',
    playStyle: 1,
    difficulty: 1,
    level: 8,
    notes: 262,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 55,
    voltage: 44,
    air: 60,
    freeze: 0,
    chaos: 4
  },
  {
    songId: '9doPbId8qid9I9l6ooloPQD1lq1Plb6I',
    songName: 'PARANOiA KCET ～clean mix～',
    playStyle: 1,
    difficulty: 2,
    level: 9,
    notes: 278,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 58,
    voltage: 44,
    air: 69,
    freeze: 0,
    chaos: 6
  },
  {
    songId: '9doPbId8qid9I9l6ooloPQD1lq1Plb6I',
    songName: 'PARANOiA KCET ～clean mix～',
    playStyle: 1,
    difficulty: 3,
    level: 11,
    notes: 351,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 74,
    voltage: 52,
    air: 30,
    freeze: 0,
    chaos: 19
  },
  {
    songId: '9doPbId8qid9I9l6ooloPQD1lq1Plb6I',
    songName: 'PARANOiA KCET ～clean mix～',
    playStyle: 1,
    difficulty: 4,
    level: 15,
    notes: 499,
    freezeArrow: 12,
    shockArrow: 0,
    stream: 109,
    voltage: 82,
    air: 58,
    freeze: 16,
    chaos: 79
  },
  {
    songId: '9doPbId8qid9I9l6ooloPQD1lq1Plb6I',
    songName: 'PARANOiA KCET ～clean mix～',
    playStyle: 2,
    difficulty: 1,
    level: 8,
    notes: 261,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 55,
    voltage: 44,
    air: 74,
    freeze: 0,
    chaos: 3
  },
  {
    songId: '9doPbId8qid9I9l6ooloPQD1lq1Plb6I',
    songName: 'PARANOiA KCET ～clean mix～',
    playStyle: 2,
    difficulty: 2,
    level: 10,
    notes: 289,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 61,
    voltage: 52,
    air: 38,
    freeze: 0,
    chaos: 10
  },
  {
    songId: '9doPbId8qid9I9l6ooloPQD1lq1Plb6I',
    songName: 'PARANOiA KCET ～clean mix～',
    playStyle: 2,
    difficulty: 3,
    level: 10,
    notes: 351,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 74,
    voltage: 52,
    air: 30,
    freeze: 0,
    chaos: 19
  },
  {
    songId: '9doPbId8qid9I9l6ooloPQD1lq1Plb6I',
    songName: 'PARANOiA KCET ～clean mix～',
    playStyle: 2,
    difficulty: 4,
    level: 15,
    notes: 424,
    freezeArrow: 6,
    shockArrow: 0,
    stream: 89,
    voltage: 75,
    air: 74,
    freeze: 20,
    chaos: 53
  }
]
