import { isSong, isSongIndex, Song } from '@/types/song'

describe('types/song.ts', () => {
  describe('isSong()', () => {
    const song: Song = {
      id: '00000000000000000000000000000000',
      name: 'A',
      nameKana: 'A',
      nameIndex: 10,
      artist: '',
      series: 'A20',
      minBPM: 200,
      maxBPM: 200,
      version: 20200101
    }
    test.each([
      undefined,
      null,
      1,
      'string',
      {},
      { ...song, id: undefined },
      { ...song, id: 0 },
      { ...song, name: null },
      { ...song, series: '' },
      { ...song, nameIndex: '' },
      { ...song, minBPM: undefined }
    ])('returns false if param is %p', (obj) => expect(isSong(obj)).toBe(false))
    test.each([
      song,
      { ...song, minBPM: null, maxBPM: null }
    ])('returns true if param is Song.', (obj) =>
      expect(isSong(obj)).toBe(true)
    )
  })
  describe('isSongIndex()', () => {
    test.each([0, 10, 36])('returns true if param is %i', (i) =>
      expect(isSongIndex(i)).toBe(true)
    )
    test.each([
      undefined,
      null,
      '10',
      1.1,
      NaN,
      -1,
      { 0: 0 }
    ])('returns false if param is %p', (obj) =>
      expect(isSongIndex(obj)).toBe(false)
    )
  })
})
