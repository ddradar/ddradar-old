import { Cource, isCource } from '@/types/cource'

describe('Cource', () => {
  const validCource: Cource = {
    id: 'bPQDblO8Do0Oo9O0PP0b8PO1PblDioDP',
    name: '十段',
    playStyle: 2,
    difficulty: 4,
    level: 19,
    chartOrder: [
      {
        songId: '109P1iO9i6q1q0bdQobiodQDoD619dqd',
        songName: 'Healing-D-Vision',
        playStyle: 2,
        difficulty: 4,
        level: 18
      },
      {
        songId: 'io1d1Dq80Di08O1Pb9bQ8DoP9d9Ooi90',
        songName: 'PARANOiA ～HADES～',
        playStyle: 2,
        difficulty: 4,
        level: 18
      },
      {
        songId: 'id9oObq9P6Q6Pq6lQPqI88OP1DD8D0O1',
        songName: '888',
        playStyle: 2,
        difficulty: 4,
        level: 18
      },
      {
        songId: '606b9d6OiliId69bO9Odi6qq8o8Qd0dq',
        songName: 'PARANOiA Revolution',
        playStyle: 2,
        difficulty: 4,
        level: 19
      }
    ]
  }
  describe('isCource', () => {
    test('returns true if Cource', () => {
      expect(isCource(validCource)).toBe(true)
      expect(isCource({ ...validCource, name: 'foo' })).toBe(true)
      expect(isCource({ ...validCource, chartOrder: [] })).toBe(true)
    })
    test.each([
      undefined,
      null,
      true,
      'string',
      -1,
      1.5,
      NaN,
      Infinity,
      -Infinity,
      {}
    ])('returns false if not object', obj => {
      expect(isCource(obj)).toBe(false)
    })
    test('returns false if not Cource', () => {
      expect(isCource({ ...validCource, id: 10 })).toBe(false)
      expect(isCource({ ...validCource, name: true })).toBe(false)
      expect(isCource({ ...validCource, playStyle: 3 })).toBe(false)
      expect(isCource({ ...validCource, difficulty: 1.5 })).toBe(false)
      expect(isCource({ ...validCource, level: 0 })).toBe(false)
      expect(isCource({ ...validCource, chartOrder: {} })).toBe(false)
      expect(
        isCource({
          ...validCource,
          chartOrder: [...validCource.chartOrder, {}]
        })
      ).toBe(false)
    })
  })
})
