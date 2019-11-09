import { getSeriesName } from '@/types/series'

describe('Series', () => {
  test('getSeriesName returns series name with "DDR".', () => {
    expect(getSeriesName('1st')).toBe('DDR 1st')
  })
  test('getSeriesName returns same string if arg contains "DDR" first.', () => {
    expect(getSeriesName('DDRMAX')).toBe('DDRMAX')
    expect(getSeriesName('DDRMAX2')).toBe('DDRMAX2')
  })
})
