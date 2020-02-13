import { getSeriesName, Series } from '@/types/series'

describe('types/series.ts', () => {
  describe('getSeriesName()', () => {
    test.each([
      ['DDR 1st', '1st'],
      ['DDR 2ndMIX', '2ndMIX'],
      ['DDR 2014', '2014']
    ])('returns "%s" if arg is "%s"', (expected, series) => {
      expect(getSeriesName(series as Series)).toBe(expected)
    })
    test.each(['DDRMAX', 'DDRMAX2'])(
      'returns same string if arg is "%s"',
      (series) => {
        expect(getSeriesName(series as Series)).toBe(series)
      }
    )
  })
})
