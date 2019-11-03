import { mount } from '@vue/test-utils'
import Inspire from '@/pages/inspire.vue';

describe('Card', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Inspire)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
