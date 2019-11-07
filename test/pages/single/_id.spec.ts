import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import SingleLevelPage from '@/pages/single/_id.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('single/:id', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(SingleLevelPage, { localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
