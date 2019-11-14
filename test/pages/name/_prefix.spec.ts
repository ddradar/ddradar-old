import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Buefy from 'buefy'
import { mocked } from 'ts-jest/utils'
import NameIndexPage from '@/pages/name/_prefix.vue'
import * as repo from '@/plugins/song-repository'
import { SongNameIndex } from '~/types/song'

jest.mock('@/plugins/song-repository')

const localVue = createLocalVue()
localVue.use(Buefy)

describe('/name/:prefix', () => {
  let wrapper: Wrapper<NameIndexPage>
  let vm: any
  beforeEach(() => {
    wrapper = shallowMount(NameIndexPage, { localVue, stubs: ['song-list'] })
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
    const hasDataIndex = 0
    const noDataIndex = 1
    const throwErrorIndex = 2
    beforeAll(() => {
      mocked(repo).fetchSongs.mockImplementation((_name, nameIndex) => {
        if (nameIndex === hasDataIndex) {
          return Promise.resolve([
            {
              name: 'PARANOiA',
              nameKana: 'PARANOIA',
              nameIndex: 25,
              artist: '180',
              series: '1st',
              minBPM: 180,
              maxBPM: 180
            }
          ])
        }
        if (nameIndex === noDataIndex) {
          return Promise.resolve([])
        }
        return Promise.reject(new Error('Mock test error'))
      })
    })
    test('selected is null if param is not SongIndex', async () => {
      for (const param of ['', 'hoge', '37', '-1', '1.5', 'NaN']) {
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
        params: { prefix: hasDataIndex.toString() }
      })
      wrapper.setData(data)
      expect(vm.selected).toBe(hasDataIndex)
      expect(vm.isLoading).toBe(false)
    })
    test('selected equals param if param is 0-16', async () => {
      const data = await vm.$options.asyncData({
        params: { prefix: noDataIndex.toString() }
      })
      wrapper.setData(data)
      expect(vm.selected).toBe(noDataIndex)
      expect(vm.isLoading).toBe(false)
    })
    test('selected equals param if param is 0-16', async () => {
      const data = await vm.$options.asyncData({
        params: { prefix: throwErrorIndex.toString() }
      })
      wrapper.setData(data)
      expect(vm.selected).toBe(throwErrorIndex)
      expect(vm.isLoading).toBe(false)
    })
  })
  describe('pageTitle getter', () => {
    test('returns "曲名から探す" if series not selected', () => {
      expect(vm.pageTitle).toBe('曲名から探す')
    })
    test('returns SongIndex title if selected', () => {
      for (let i = 0; i < SongNameIndex.length; i++) {
        wrapper.setData({ selected: i })
        expect(vm.pageTitle).toBe(SongNameIndex[i])
      }
    })
  })
  describe('message getter', () => {
    test('returns "曲名を選択してください" if series not selected', () => {
      expect(vm.message).toBe('曲名を選択してください')
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
