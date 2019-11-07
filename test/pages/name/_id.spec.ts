import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import SongIndexPage from '@/pages/name/_id.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('/single/:id', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(SongIndexPage, { localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
