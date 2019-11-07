import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import ChartList from '@/components/ChartList.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('ChartList', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(ChartList, { localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
