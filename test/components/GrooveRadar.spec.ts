import { shallowMount, Wrapper } from '@vue/test-utils'

import GrooveRadarComponent from '@/components/GrooveRadar.vue'

describe('GrooveRadar', () => {
  let wrapper: Wrapper<GrooveRadarComponent>
  let vm: any
  beforeEach(() => {
    wrapper = shallowMount(GrooveRadarComponent)
    vm = wrapper.vm
  })
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  describe('renderLabel', () => {
    test('returns label name if exists', () => {
      expect(vm.renderLabel({ index: 0 }, { labels: ['foo'] })).toBe('foo')
      expect(vm.renderLabel({ index: 0 }, { labels: [['foo']] })).toBe('foo')
      expect(vm.renderLabel({ index: 1 }, { labels: ['foo', 'bar'] })).toBe(
        'bar'
      )
      expect(
        vm.renderLabel({ index: 1 }, { labels: [['foo', 'bar'], ['baz']] })
      ).toBe('baz')
    })
    test('returns empty if not exists', () => {
      expect(vm.renderLabel({}, {})).toBe('')
      expect(vm.renderLabel({ index: 0 }, {})).toBe('')
      expect(vm.renderLabel({}, { labels: ['foo'] })).toBe('')
      expect(vm.renderLabel({}, { labels: [['foo']] })).toBe('')
    })
  })
})
