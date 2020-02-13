import { createLocalVue, shallowMount } from '@vue/test-utils'
import Buefy from 'buefy'

import Index from '@/pages/index.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('Card', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Index, { localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
