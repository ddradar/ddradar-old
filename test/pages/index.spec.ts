import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'

describe('Card', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Index)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
