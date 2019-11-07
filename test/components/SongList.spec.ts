import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import SongList from '@/components/SongList.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('SongList', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(SongList, { localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
