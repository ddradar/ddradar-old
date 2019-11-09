import { isLevel } from '@/types/level'

describe('Level', () => {
  test('isLevel returns false if object is not number.', () => {
    expect(isLevel(undefined)).toBe(false)
    expect(isLevel(null)).toBe(false)
    expect(isLevel({})).toBe(false)
    expect(isLevel(true)).toBe(false)
    expect(isLevel('')).toBe(false)
    expect(isLevel('1')).toBe(false)
    expect(isLevel([1, 2, 3])).toBe(false)
  })
  test('isLevel returns false if object is not integer or not from 1 to 20.', () => {
    expect(isLevel(0)).toBe(false)
    expect(isLevel(-1)).toBe(false)
    expect(isLevel(1.2)).toBe(false)
    expect(isLevel(NaN)).toBe(false)
    expect(isLevel(Infinity)).toBe(false)
    expect(isLevel(21)).toBe(false)
    expect(isLevel(-Infinity)).toBe(false)
  })
  test('isLevel returns true if object is integer from 1 to 20.', () => {
    for (let i = 1; i <= 20; i++) {
      expect(isLevel(i)).toBe(true)
    }
  })
})
