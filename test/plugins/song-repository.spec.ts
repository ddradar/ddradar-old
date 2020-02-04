/* eslint-disable no-undef */
import * as repo from '~/plugins/song-repository'
import { Song } from '~/types/song'

describe('SongRepository', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResolvedValue({ json: () => songs } as any)
  })
  describe('fetchSongs', () => {
    test.each([
      ['series', '2ndMIX'],
      ['nameIndex', 25],
      ['nameIndex', 1]
    ])('returns exist data', async (field, cond) => {
      const fetchedSongs = await repo.fetchSongs(field as keyof Song, cond)
      expect(fetchedSongs).toHaveLength(
        songs.filter((d) => d[field as keyof Song] === cond).length
      )
    })
  })
  describe('fetchSongById', () => {
    test('returns Song if exists', async () => {
      const song = await repo.fetchSongById(songs[0].id)
      expect(song).toStrictEqual(songs[0])
    })
    test('throw error if data is not Song', () => {
      fetchMock.resetMocks()
      fetchMock.mockResolvedValue({ json: () => invalidData } as any)
      expect(repo.fetchSongById('')).rejects.toThrowError(
        'JSON file is not Song[]'
      )
    })
    test('throw error if not exists', () => {
      expect(repo.fetchSongById('bar')).rejects.toThrowError(/Not Found/)
    })
    test('throw error if duplicated', () => {
      fetchMock.resetMocks()
      fetchMock.mockResolvedValue({ json: () => duplicatedData } as any)
      expect(repo.fetchSongById(duplicatedData[0].id)).rejects.toThrowError(
        /Duplicated songId/
      )
    })
  })
})

const songs: (Song & { id: string })[] = [
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
  },
  {
    id: 'Pl0dPid9lQDo6PDQDqPboPqO6iIDIqoo',
    name: 'PARANOiA MAX～DIRTY MIX～',
    nameKana: 'PARANOIA MAX DIRTY MIX',
    nameIndex: 25,
    artist: '190',
    series: '2ndMIX',
    minBPM: 190,
    maxBPM: 190
  }
]

const invalidData = { id: 'foo', nameIndex: 25, series: '1st' }

const duplicatedData: (Song & { id: string })[] = [
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
    id: '06loOQ0DQb0DqbOibl6qO81qlIdoP9DI',
    name: 'PARANOiA',
    nameKana: 'PARANOIA',
    nameIndex: 25,
    artist: '180',
    series: '1st',
    minBPM: 180,
    maxBPM: 180
  }
]
