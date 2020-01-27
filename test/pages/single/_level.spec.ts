import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Buefy from 'buefy'
import { mocked } from 'ts-jest/utils'
import SingleLevelPage from '@/pages/single/_level.vue'
import * as repo from '@/plugins/chart-repository'

jest.mock('@/plugins/chart-repository')

const localVue = createLocalVue()
localVue.use(Buefy)

describe('single/:level', () => {
  let wrapper: Wrapper<SingleLevelPage>
  let vm: any
  beforeEach(() => {
    wrapper = shallowMount(SingleLevelPage, { localVue, stubs: ['chart-list'] })
    vm = wrapper.vm
  })
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('selected:null and isLoading:true default', () => {
    expect(vm.selected).toBeNull()
    expect(vm.isLoading).toBe(true)
  })
  describe('asyncData method', () => {
    const hasDataLevel = 1
    const noDataLevel = 2
    const throwErrorLevel = 3
    beforeAll(() => {
      mocked(repo).fetchChartsByLevel.mockImplementation((_style, level) => {
        if (level === hasDataLevel) {
          return Promise.resolve([
            {
              songId: "CAN'T STOP FALLIN' IN LOVE -super euro version-",
              songName: '',
              playStyle: 2,
              difficulty: 1,
              level: 1,
              notes: 87,
              freezeArrow: 0,
              shockArrow: 0,
              stream: 17,
              voltage: 19,
              air: 0,
              freeze: 0,
              chaos: 0
            }
          ])
        }
        if (level === noDataLevel) {
          return Promise.resolve([])
        }
        return Promise.reject(new Error('Mock test error'))
      })
    })
    test.each(['', 'hoge', '37', '-1', 'NaN'])(
      'selected is null if param is not 1-19',
      async (param) => {
        const data = await vm.$options.asyncData({
          params: { level: param }
        })
        wrapper.setData(data)
        expect(vm.selected).toBeNull()
        expect(vm.isLoading).toBe(false)
      }
    )
    test.each([hasDataLevel, noDataLevel, throwErrorLevel])(
      'selected equals param if param is 1-19',
      async (level) => {
        const data = await vm.$options.asyncData({
          params: { level }
        })
        wrapper.setData(data)
        expect(vm.selected).toBe(level)
        expect(vm.isLoading).toBe(false)
      }
    )
  })
  describe('pageTitle getter', () => {
    test('returns "SINGLEのレベルから探す" if series not selected', () => {
      expect(vm.pageTitle).toBe('SINGLEのレベルから探す')
    })
    // [...Array(19).keys()] returns [0, 1, ..., 18]
    test.each([...Array(19).keys()])('returns level if selected', (i) => {
      const level = i + 1
      wrapper.setData({ selected: level })
      expect(vm.pageTitle).toBe(`SINGLE ${level}`)
    })
  })
  describe('message getter', () => {
    test('returns "レベルを選択してください" if series not selected', () => {
      expect(vm.message).toBe('レベルを選択してください')
    })
    test('returns "Not Found" if charts is empty', () => {
      wrapper.setData({ selected: 1, charts: [] })
      expect(vm.message).toBe('Not Found')
    })
    test('returns "Found n charts" charts is not empty', () => {
      wrapper.setData({
        selected: 1,
        charts: [
          {
            songId: "CAN'T STOP FALLIN' IN LOVE -super euro version-",
            songName: '',
            playStyle: 1,
            difficulty: 1,
            level: 1,
            notes: 87,
            freezeArrow: 0,
            shockArrow: 0,
            stream: 17,
            voltage: 19,
            air: 0,
            freeze: 0,
            chaos: 0
          }
        ]
      })
      expect(vm.message).toBe('Found 1 charts')
      wrapper.setData({
        selected: 1,
        charts: [
          {
            songId: "CAN'T STOP FALLIN' IN LOVE -super euro version-",
            songName: '',
            playStyle: 1,
            difficulty: 1,
            level: 1,
            notes: 87,
            freezeArrow: 0,
            shockArrow: 0,
            stream: 17,
            voltage: 19,
            air: 0,
            freeze: 0,
            chaos: 0
          },
          {
            songId: 'sample2',
            songName: 'MOON',
            playStyle: 1,
            difficulty: 1,
            level: 1,
            notes: 104,
            freezeArrow: 8,
            shockArrow: 0,
            stream: 19,
            voltage: 21,
            air: 0,
            freeze: 28,
            chaos: 0
          }
        ]
      })
      expect(vm.message).toBe('Found 2 charts')
    })
  })
})
