import { mount } from '@vue/test-utils'
import CardComponent from '@/components/Card.vue'

describe('Card', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(CardComponent, {
      propsData: {
        title: 'Responsive',
        icon: 'cellphone-link'
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
