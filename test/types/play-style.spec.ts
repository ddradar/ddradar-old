import { getPlayStyleName } from '@/types/play-style'

describe('PlayStyle', () => {
  test('getPlayStyleName returns "SP" if param is 1.', () => {
    expect(getPlayStyleName(1)).toBe('SP')
  })
  test('getPlayStyleName returns "DP" if param is 2.', () => {
    expect(getPlayStyleName(2)).toBe('DP')
  })
  test('isLevel returns false if object is not integer or not from 1 to 20.', () => {
    expect(getPlayStyleName(0)).toBe('?')
    expect(getPlayStyleName(-1)).toBe('?')
    expect(getPlayStyleName(3)).toBe('?')
    expect(getPlayStyleName(1.2)).toBe('?')
    expect(getPlayStyleName(NaN)).toBe('?')
    expect(getPlayStyleName(Infinity)).toBe('?')
    expect(getPlayStyleName(-Infinity)).toBe('?')
  })
})
