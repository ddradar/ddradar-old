import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import SingleLevelPage from '@/pages/single/_level.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('single/:level', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(SingleLevelPage, { localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
