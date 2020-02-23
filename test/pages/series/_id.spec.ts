import {
  createLocalVue,
  mount,
  RouterLinkStub,
  shallowMount,
  Wrapper
} from '@vue/test-utils'
import Buefy from 'buefy'
import { mocked } from 'ts-jest/utils'

import SeriesPage from '@/pages/series/_id.vue'
import * as repo from '@/plugins/song-repository'
import { SeriesList } from '@/types/series'

jest.mock('~/plugins/firebase', () => {
  return {
    firestore: jest.fn()
  }
})
jest.mock('@/plugins/song-repository')

const localVue = createLocalVue()
localVue.use(Buefy)

describe('/series/:id', () => {
  let wrapper: Wrapper<SeriesPage>
  let vm: any
  beforeEach(() => {
    wrapper = shallowMount(SeriesPage, { localVue, stubs: ['song-list'] })
    vm = wrapper.vm
  })
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  describe('renders', () => {
    test('select SongIndex', () => {
      const wrapper = mount(SeriesPage, {
        localVue,
        stubs: { SongList: true, NuxtLink: RouterLinkStub }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
    test('correctly', () => {
      const wrapper = mount(SeriesPage, {
        localVue,
        data: () => {
          return { selected: 10, songs: [{}] }
        },
        stubs: { SongList: true, NuxtLink: RouterLinkStub }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
    test('not found', () => {
      const wrapper = mount(SeriesPage, {
        localVue,
        data: () => {
          return { selected: 10, songs: [] }
        },
        stubs: { SongList: true, NuxtLink: RouterLinkStub }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
  test('selected:null and isLoading:true default', () => {
    expect(vm.selected).toBeNull()
    expect(vm.isLoading).toBe(true)
  })
  describe('asyncData method', () => {
    const hasDataIndex = 0
    const noDataIndex = 1
    const throwErrorIndex = 2
    beforeAll(() => {
      mocked(repo).fetchSongs.mockImplementation((_name, series) => {
        if (series === SeriesList[hasDataIndex]) {
          return Promise.resolve([
            {
              id: '00000000000000000000000000000000',
              name: 'PARANOiA',
              nameKana: 'PARANOIA',
              nameIndex: 25,
              artist: '180',
              series: '1st',
              minBPM: 180,
              maxBPM: 180,
              version: 20200101
            }
          ])
        }
        if (series === SeriesList[noDataIndex]) {
          return Promise.resolve([])
        }
        return Promise.reject(new Error('Mock test error'))
      })
    })
    test('selected is null if param is not 0-16', async () => {
      for (const param of ['', 'hoge', '37', '-1', 'NaN']) {
        const data = await vm.$options.asyncData({
          params: { id: param }
        })
        wrapper.setData(data)
        expect(vm.selected).toBeNull()
        expect(vm.isLoading).toBe(false)
      }
    })
    test('selected equals param if param is 0-16', async () => {
      const data = await vm.$options.asyncData({
        params: { id: hasDataIndex.toString() }
      })
      wrapper.setData(data)
      expect(vm.selected).toBe(hasDataIndex)
      expect(vm.isLoading).toBe(false)
    })
    test('selected equals param if param is 0-16', async () => {
      const data = await vm.$options.asyncData({
        params: { id: noDataIndex.toString() }
      })
      wrapper.setData(data)
      expect(vm.selected).toBe(noDataIndex)
      expect(vm.isLoading).toBe(false)
    })
    test('selected equals param if param is 0-16', async () => {
      const data = await vm.$options.asyncData({
        params: { id: throwErrorIndex.toString() }
      })
      wrapper.setData(data)
      expect(vm.selected).toBe(throwErrorIndex)
      expect(vm.isLoading).toBe(false)
    })
  })
  describe('pageTitle getter', () => {
    test('returns "シリーズから探す" if series not selected', () => {
      expect(vm.pageTitle).toBe('シリーズから探す')
    })
    test('returns "シリーズから探す" if selected is out of range', () => {
      for (const i of [-1, 100, 1.5, NaN, Infinity]) {
        wrapper.setData({ selected: i })
        expect(vm.pageTitle).toBe('シリーズから探す')
      }
    })
    test('returns Series title if selected', () => {
      wrapper.setData({ selected: 0 })
      expect(vm.pageTitle).toBe(`DDR ${SeriesList[0]}`)
      wrapper.setData({ selected: SeriesList.length - 1 })
      expect(vm.pageTitle).toBe(`DDR ${SeriesList[SeriesList.length - 1]}`)
    })
  })
  describe('message getter', () => {
    test('returns "シリーズを選択してください" if series not selected', () => {
      expect(vm.message).toBe('シリーズを選択してください')
    })
    test('returns "Not Found" if songs is empty', () => {
      wrapper.setData({ selected: 0, songs: [] })
      expect(vm.message).toBe('Not Found')
    })
    test('returns "Found n songs" songs is not empty', () => {
      wrapper.setData({
        selected: 0,
        songs: [
          {
            name: 'PARANOiA',
            nameKana: 'PARANOIA',
            nameIndex: 25,
            artist: '180',
            series: '1st',
            minBPM: 180,
            maxBPM: 180
          }
        ]
      })
      expect(vm.message).toBe('Found 1 songs')
      wrapper.setData({
        selected: 0,
        songs: [
          {
            name: 'PARANOiA',
            nameKana: 'PARANOIA',
            nameIndex: 25,
            artist: '180',
            series: '1st',
            minBPM: 180,
            maxBPM: 180
          },
          {
            name: 'PARANOiA',
            nameKana: 'PARANOIA',
            nameIndex: 25,
            artist: '180',
            series: '1st',
            minBPM: 180,
            maxBPM: 180
          }
        ]
      })
      expect(vm.message).toBe('Found 2 songs')
    })
  })
})
