import * as firebaseTest from '@firebase/testing'
import * as repo from '@/plugins/song-repository'
import { Song } from '~/types/song'

jest.mock('@/plugins/firebase', () => {
  return firebaseTest.initializeTestApp({ projectId: 'ddradar-songrepo-test' })
})

describe('SongRepository', () => {
  const db = firebaseTest
    .initializeAdminApp({ projectId: 'ddradar-songrepo-test' })
    .firestore()
  beforeAll(async () => {
    const batch = db.batch()
    songs.forEach(song => {
      const ref = db.collection('version/1/songs').doc(song.id)
      batch.set(ref, song)
    })
    const invalidDataRef = db.collection('version/1/songs').doc('foo')
    batch.set(invalidDataRef, invalidData)
    await batch.commit()
  })
  describe('fetchSongs', () => {
    test.each([['series', '2ndMIX'], ['nameIndex', 25], ['nameIndex', 1]])(
      'returns exist data',
      async (field, cond) => {
        const fetchedSongs = await repo.fetchSongs(field as string, cond)
        expect(fetchedSongs).toHaveLength(
          songs.filter(d => d[field as 'series' | 'nameIndex'] === cond).length
        )
      }
    )
  })
  describe('fetchSongById', () => {
    test('returns Song if exists', async () => {
      const song = await repo.fetchSongById(songs[0].id)
      expect(song).toStrictEqual(songs[0])
    })
    test('throw error if not exists', () => {
      expect(repo.fetchSongById('foo')).rejects.toThrowError()
    })
  })
  afterAll(async () => {
    await Promise.all(firebaseTest.apps().map(app => app.delete()))
  })
})

const songs: (Song & { id: string })[] = [
  {
    id: 'Pl0dPid9lQDo6PDQDqPboPqO6iIDIqoo',
    name: 'PARANOiA MAX～DIRTY MIX～',
    nameKana: 'PARANOIA MAX DIRTY MIX',
    nameIndex: 25,
    artist: '190',
    series: '2ndMIX',
    minBPM: 190,
    maxBPM: 190
  },
  {
    id: '06loOQ0DQb0DqbOibl6qO81qlIdoP9DI',
    name: 'PARANOiA',
    nameKana: 'PARANOIA',
    nameIndex: 25,
    artist: '180',
    series: '1st',
    minBPM: 180,
    maxBPM: 180
  },
  {
    id: 'Pb9II0oiI9ODQ8OP8IqIPQP9P68biqIi',
    name: 'TRIP MACHINE',
    nameKana: 'TRIP MACHINE',
    nameIndex: 29,
    artist: 'DE-SIRE',
    series: '1st',
    minBPM: 160,
    maxBPM: 160
  }
]

const invalidData = { nameIndex: 25, series: '1st' }
