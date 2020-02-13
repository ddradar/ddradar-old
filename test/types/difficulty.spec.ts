import { getDifficultyName, isDifficulty } from '@/types/difficulty'

describe('types/difficulty.ts', () => {
  describe('getDifficulty()', () => {
    test.each([
      ['BEGINNER', 0],
      ['BASIC', 1],
      ['DIFFICULT', 2],
      ['EXPERT', 3],
      ['CHALLENGE', 4]
    ])('returns "%s" if param is %i', (expected, i) => {
      expect(getDifficultyName(i)).toBe(expected)
    })
    test.each([-1, 5, 2.1, NaN, Infinity, -Infinity])(
      'returns "Unknown" if param is %d',
      (num) => {
        expect(getDifficultyName(num)).toBe('Unknown')
      }
    )
  })
  describe('isDifficulty()', () => {
    test.each([0, 1, 2, 3, 4])('returns true if param is %i', (i) => {
      expect(isDifficulty(i)).toBe(true)
    })
    test.each([undefined, null, true, '', '1', {}, [1]])(
      'returns false if param is %p',
      (obj) => {
        expect(isDifficulty(obj)).toBe(false)
      }
    )
    test.each([-1, 6, 1.5, NaN, Infinity, -Infinity])(
      'returns false if param is %d',
      (num) => {
        expect(isDifficulty(num)).toBe(false)
      }
    )
  })
})
