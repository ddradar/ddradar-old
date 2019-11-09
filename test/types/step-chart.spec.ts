import { isStepChart, StepChart } from '@/types/step-chart'

describe('StepChart', () => {
  const chart: StepChart = {
    songId: '',
    songName: '',
    playStyle: 1,
    difficulty: 1,
    level: 1,
    notes: 90,
    freezeArrow: 0,
    shockArrow: 0,
    stream: 10,
    voltage: 10,
    air: 2,
    freeze: 0,
    chaos: 2
  }
  test('isStepChart returns false if param is not StepChart.', () => {
    expect(isStepChart(undefined)).toBe(false)
    expect(isStepChart(null)).toBe(false)
    expect(isStepChart(1)).toBe(false)
    expect(isStepChart('string')).toBe(false)
    expect(isStepChart({})).toBe(false)
    expect(isStepChart({ ...chart, songId: true })).toBe(false)
    expect(isStepChart({ ...chart, songName: null })).toBe(false)
    expect(isStepChart({ ...chart, playStyle: 3 })).toBe(false)
    expect(isStepChart({ ...chart, difficulty: 2.5 })).toBe(false)
    expect(isStepChart({ ...chart, level: -1 })).toBe(false)
    expect(isStepChart({ ...chart, stream: '10' })).toBe(false)
  })
  test('isStepChart returns true if param is StepChart.', () => {
    expect(isStepChart(chart)).toBe(true)
    expect(isStepChart({ ...chart, stream: 270 })).toBe(true)
  })
})
