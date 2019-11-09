import { isSong, Song } from '@/types/song'

describe('Song', () => {
  const song: Song = {
    name: 'A',
    nameKana: 'A',
    nameIndex: 'A',
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
    // expect(isSong({...song, nameIndex:''})).toBe(false)
    expect(isSong({ ...song, minBPM: undefined })).toBe(false)
  })
  test('isSong returns true if param is Song.', () => {
    expect(isSong(song)).toBe(true)
    expect(isSong({ ...song, id: '' })).toBe(true)
    expect(isSong({ ...song, minBPM: null, maxBPM: null })).toBe(true)
  })
})
