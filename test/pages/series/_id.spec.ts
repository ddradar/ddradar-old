import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import SeriesPage from '@/pages/series/_id.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('/single/:id', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(SeriesPage, { localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
