import { mount } from '@vue/test-utils'
import GrooveRadarComponent from '@/components/GrooveRadar.vue'

describe('GrooveRadar', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(GrooveRadarComponent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('is a Vue instance', () => {
    const wrapper = mount(GrooveRadarComponent, {
      propsData: {
        chart: {
          voltage: 100,
          stream: 220,
          chaos: 120,
          air: 20,
          freeze: 0
        }
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
