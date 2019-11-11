import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Buefy from 'buefy'
import { mocked } from 'ts-jest/utils'
import SeriesPage from '@/pages/series/_id.vue'
import { SeriesList } from '@/types/series'
import * as repo from '@/plugins/song-repository'

jest.mock('@/plugins/song-repository')

const localVue = createLocalVue()
localVue.use(Buefy)

describe('/series/:id', () => {
  let wrapper: Wrapper<SeriesPage>
  beforeEach(() => {
    wrapper = shallowMount(SeriesPage, { localVue, stubs: ['song-list'] })
  })
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
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
        if (series === SeriesList[noDataIndex]) {
          return Promise.resolve([])
        }
        return Promise.reject(new Error('Mock test error'))
      })
    })
    test('param is 0', async () => {
      const data = await (wrapper.vm.$options as any).asyncData({
        params: { id: 'hoge' }
      })
      wrapper.setData(data)
      expect((wrapper.vm as any).selected).toBeNull()
    })
    test('param is 0', async () => {
      const data = await (wrapper.vm.$options as any).asyncData({
        params: { id: hasDataIndex.toString() }
      })
      wrapper.setData(data)
      expect((wrapper.vm as any).selected).toBe(hasDataIndex)
    })
    test('param is 1', async () => {
      const data = await (wrapper.vm.$options as any).asyncData({
        params: { id: noDataIndex.toString() }
      })
      wrapper.setData(data)
      expect((wrapper.vm as any).selected).toBe(noDataIndex)
    })
    test('param is 2', async () => {
      const data = await (wrapper.vm.$options as any).asyncData({
        params: { id: throwErrorIndex.toString() }
      })
      wrapper.setData(data)
      expect((wrapper.vm as any).selected).toBeNull()
    })
  })
  describe('pageTitle getter', () => {
    test('returns "シリーズから探す" if series not selected', () => {
      expect((wrapper.vm as any).pageTitle).toBe('シリーズから探す')
    })
    test('returns "シリーズから探す" if selected is out of range', () => {
      for (const i of [-1, 100, 1.5, NaN, Infinity]) {
        wrapper.setData({ selected: i })
        expect((wrapper.vm as any).pageTitle).toBe('シリーズから探す')
      }
    })
    test('returns Series title if selected', () => {
      wrapper.setData({ selected: 0 })
      expect((wrapper.vm as any).pageTitle).toBe(`DDR ${SeriesList[0]}`)
      wrapper.setData({ selected: SeriesList.length - 1 })
      expect((wrapper.vm as any).pageTitle).toBe(
        `DDR ${SeriesList[SeriesList.length - 1]}`
      )
    })
  })
})
