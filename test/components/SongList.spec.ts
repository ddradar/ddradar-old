import {
  createLocalVue,
  mount,
  RouterLinkStub,
  shallowMount
} from '@vue/test-utils'
import Buefy from 'buefy'

import SongList from '@/components/SongList.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('SongList', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(SongList, { localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('renders correctly', () => {
    const wrapper = mount(SongList, {
      localVue,
      propsData: { songs, loading: false },
      stubs: { NuxtLink: RouterLinkStub }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  test('renders loading', () => {
    const wrapper = mount(SongList, {
      localVue,
      propsData: { loading: true },
      stubs: { NuxtLink: RouterLinkStub }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

const songs = [
  {
    id: '06loOQ0DQb0DqbOibl6qO81qlIdoP9DI',
    name: 'PARANOiA',
    nameKana: 'PARANOIA',
    nameIndex: 25,
    artist: '180',
    series: '1st',
    minBPM: 180,
    maxBPM: 180,
    version: 20200101
  },
  {
    id: 'Pb9II0oiI9ODQ8OP8IqIPQP9P68biqIi',
    name: 'TRIP MACHINE',
    nameKana: 'TRIP MACHINE',
    nameIndex: 29,
    artist: 'DE-SIRE',
    series: '1st',
    minBPM: 160,
    maxBPM: 160,
    version: 20200101
  },
  {
    id: 'Pl0dPid9lQDo6PDQDqPboPqO6iIDIqoo',
    name: 'PARANOiA MAX～DIRTY MIX～',
    nameKana: 'PARANOIA MAX DIRTY MIX',
    nameIndex: 25,
    artist: '190',
    series: '2ndMIX',
    minBPM: 190,
    maxBPM: 190,
    version: 20200101
  }
]
