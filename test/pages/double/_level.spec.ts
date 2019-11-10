import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import DoubleLevelPage from '@/pages/double/_level.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('double/:level', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(DoubleLevelPage, { localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
