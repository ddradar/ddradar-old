import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import NameIndexPage from '@/pages/name/_prefix.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('/name/:prefix', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(NameIndexPage, { localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
