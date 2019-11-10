import { isSong, isSongIndex, Song } from '@/types/song'

describe('Song', () => {
  const song: Song = {
    name: 'A',
    nameKana: 'A',
    nameIndex: 10,
    artist: '',
    series: 'A20',
    minBPM: 200,
    maxBPM: 200
  }
  test('isSong returns false if param is not Song.', () => {
    expect(isSong(undefined)).toBe(false)
    expect(isSong(null)).toBe(false)
    expect(isSong(1)).toBe(false)
    expect(isSong('string')).toBe(false)
    expect(isSong({})).toBe(false)
    expect(isSong({ ...song, id: 0 })).toBe(false)
    expect(isSong({ ...song, name: null })).toBe(false)
    expect(isSong({ ...song, series: '' })).toBe(false)
    expect(isSong({ ...song, nameIndex: '' })).toBe(false)
    expect(isSong({ ...song, minBPM: undefined })).toBe(false)
  })
  test('isSong returns true if param is Song.', () => {
    expect(isSong(song)).toBe(true)
    expect(isSong({ ...song, id: '' })).toBe(true)
    expect(isSong({ ...song, minBPM: null, maxBPM: null })).toBe(true)
  })
})

describe('SongIndex', () => {
  test('isSong returns true if param is integer and range in 0 to 36.', () => {
    expect(isSongIndex(0)).toBe(true)
    expect(isSongIndex(10)).toBe(true)
    expect(isSongIndex(36)).toBe(true)
  })
  test('isSongIndex returns false otherwise.', () => {
    expect(isSongIndex(undefined)).toBe(false)
    expect(isSongIndex(null)).toBe(false)
    expect(isSongIndex('10')).toBe(false)
    expect(isSongIndex(1.1)).toBe(false)
    expect(isSongIndex(NaN)).toBe(false)
    expect(isSongIndex(-1)).toBe(false)
    expect(isSongIndex({ 0: 0 })).toBe(false)
  })
})
