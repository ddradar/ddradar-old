import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils'
import Buefy from 'buefy'

import ChartList from '@/components/ChartList.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('ChartList', () => {
  let wrapper: Wrapper<ChartList>
  let vm: any
  beforeEach(() => {
    wrapper = shallowMount(ChartList, { localVue })
    vm = wrapper.vm
  })
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  describe('getPlayStyleName()', () => {
    test('returns "SP" if param is 1', () => {
      expect(vm.getPlayStyleName(1)).toBe('SP')
    })
    test('returns "DP" if param is 2', () => {
      expect(vm.getPlayStyleName(2)).toBe('DP')
    })
    test.each([-1, 0, 1.5, NaN, Infinity, -Infinity])(
      'returns "?" if param is other',
      (i) => {
        expect(vm.getPlayStyleName(i)).toBe('?')
      }
    )
  })
  describe('getDifficultyName()', () => {
    test('returns "BEGINNER" if param is 0', () => {
      expect(vm.getDifficultyName(0)).toBe('BEGINNER')
    })
    test('returns "BASIC" if param is 1', () => {
      expect(vm.getDifficultyName(1)).toBe('BASIC')
    })
    test('returns "DIFFICULT" if param is 2', () => {
      expect(vm.getDifficultyName(2)).toBe('DIFFICULT')
    })
    test('returns "EXPERT" if param is 3', () => {
      expect(vm.getDifficultyName(3)).toBe('EXPERT')
    })
    test('returns "CHALLENGE" if param is 4', () => {
      expect(vm.getDifficultyName(4)).toBe('CHALLENGE')
    })
    test.each([-1, 5, 1.5, NaN, Infinity, -Infinity])(
      'returns "Unknown" if param is other',
      (i) => {
        expect(vm.getDifficultyName(i)).toBe('Unknown')
      }
    )
  })
  describe('getDifficutyClassName()', () => {
    test('returns "is-beginner" if param is 0', () => {
      expect(vm.getDifficultyClassName(0)).toBe('is-beginner')
    })
    test('returns "is-basic" if param is 1', () => {
      expect(vm.getDifficultyClassName(1)).toBe('is-basic')
    })
    test('returns "is-difficult" if param is 2', () => {
      expect(vm.getDifficultyClassName(2)).toBe('is-difficult')
    })
    test('returns "is-expert" if param is 3', () => {
      expect(vm.getDifficultyClassName(3)).toBe('is-expert')
    })
    test('returns "is-challenge" if param is 4', () => {
      expect(vm.getDifficultyClassName(4)).toBe('is-challenge')
    })
    test.each([-1, 5, 1.5, NaN, Infinity, -Infinity])(
      'returns "is-unknown" if param is other',
      (i) => {
        expect(vm.getDifficultyClassName(i)).toBe('is-unknown')
      }
    )
  })
})
