import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils'
import Buefy from 'buefy'

import UserPage from '@/pages/user.vue'

jest.mock('~/plugins/firebase', () => {
  return {
    firestore: jest.fn()
  }
})
const localVue = createLocalVue()
localVue.use(Buefy)

describe('/user/', () => {
  let wrapper: Wrapper<UserPage>
  let vm: any
  beforeEach(() => {
    wrapper = shallowMount(UserPage, { localVue })
    vm = wrapper.vm
  })
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('user is null default', () => {
    expect(vm.user).toBeNull()
  })
  describe.skip('asyncData Method', () => {})
  describe.skip('updateUserInfo Method', () => {})
})
