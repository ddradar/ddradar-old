import { getDifficultyName, isDifficulty } from '@/types/difficulty'

describe('Difficulty', () => {
  test('getDifficulty returns their name if param is Difficulty.', () => {
    expect(getDifficultyName(0)).toBe('BEGINNER')
    expect(getDifficultyName(1)).toBe('BASIC')
    expect(getDifficultyName(2)).toBe('DIFFICULT')
    expect(getDifficultyName(3)).toBe('EXPERT')
    expect(getDifficultyName(4)).toBe('CHALLENGE')
  })
  test('getDifficulty returns "Unknown" if param is not Difficulty.', () => {
    const unknown = 'Unknown'
    expect(getDifficultyName(-1)).toBe(unknown)
    expect(getDifficultyName(5)).toBe(unknown)
    expect(getDifficultyName(2.1)).toBe(unknown)
    expect(getDifficultyName(NaN)).toBe(unknown)
    expect(getDifficultyName(Infinity)).toBe(unknown)
    expect(getDifficultyName(-Infinity)).toBe(unknown)
  })
  test('isDifficulty returns true if param is integer and range in 0 to 4.', () => {
    expect(isDifficulty(0)).toBe(true)
    expect(isDifficulty(1)).toBe(true)
    expect(isDifficulty(2)).toBe(true)
    expect(isDifficulty(3)).toBe(true)
    expect(isDifficulty(4)).toBe(true)
  })
  test('isDifficulty returns false if param is not integer or out of range in 0 to 4.', () => {
    expect(isDifficulty(undefined)).toBe(false)
    expect(isDifficulty(null)).toBe(false)
    expect(isDifficulty(true)).toBe(false)
    expect(isDifficulty('')).toBe(false)
    expect(isDifficulty('string')).toBe(false)
    expect(isDifficulty(-1)).toBe(false)
    expect(isDifficulty(6)).toBe(false)
    expect(isDifficulty(1.5)).toBe(false)
    expect(isDifficulty(NaN)).toBe(false)
    expect(isDifficulty(Infinity)).toBe(false)
    expect(isDifficulty(-Infinity)).toBe(false)
  })
})
