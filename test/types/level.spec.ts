import { isLevel } from '@/types/level'

describe('types/level.ts', () => {
  describe('isLevel()', () => {
    test.each([undefined, null, {}, true, '', '1', [1, 2, 3]])(
      'returns false if obj is not number.',
      (obj) => {
        expect(isLevel(obj)).toBe(false)
      }
    )
    test.each([0, 21, -1, 1.2, NaN, Infinity, -Infinity])(
      'returns false if obj is not integer or not from 1 to 20.',
      (num) => {
        expect(isLevel(num)).toBe(false)
      }
    )
    test.each([1, 10, 20])(
      'returns true if obj is integer from 1 to 20.',
      (i) => {
        expect(isLevel(i)).toBe(true)
      }
    )
  })
})
