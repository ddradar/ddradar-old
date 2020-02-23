import { getPlayStyleName } from '@/types/play-style'

describe('types/play-style.ts', () => {
  describe('getPlayStyleName()', () => {
    test.each([
      ['SP', 1],
      ['DP', 2]
    ])('returns "%s" if param is %i', (expected, i) => {
      expect(getPlayStyleName(i)).toBe(expected)
    })
    test.each([0, 3, -1, 1.2, NaN, Infinity, -Infinity])(
      'returns "?" if param is %d',
      (num) => {
        expect(getPlayStyleName(num)).toBe('?')
      }
    )
  })
})
